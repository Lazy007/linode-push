import Worker from './js/vanity.js';

export default {
    components: {
        Headline,
        Description,
        Err,
        UserInput,
        Statistics,
        Result,
        Save,
        Corner,
        Foot
    },
    data: function () {
        return {
            running: false,
            status: 'Waiting',
            workers: [],
            threads: 4,
            cores: 0,
            result: {
                address: '',
                privateKey: ''
            },
            input: {
                hex: '',
                checksum: true,
                suffix: false
            },
            firstTick: null,
            error: null,
        };
    },
    watch: {
        threads: function () {
            if (!this.running) {
                this.initWorkers();
            }
        },
    },
    methods: {
        setInput: function (inputType, value) {
            // eslint-disable-next-line default-case
            switch (inputType) {
            case 'hex':
                this.input.hex = value;
                break;
            case 'checksum':
                this.input.checksum = value;
                break;
            case 'suffix':
                this.input.suffix = value;
                break;
            case 'threads':
                this.threads = value;
            }
        },
        displayResult: function (result) {
            this.$emit('increment-counter', result.attempts);
            this.result.address = result.address;
            this.result.privateKey = result.privKey;
            this.status = 'Address found';
        },
        clearResult: function () {
            this.result.address = '';
            this.result.privateKey = '';
            this.$emit('increment-counter', -1);
        },
        /**
        * Create missing workers, remove the unwanted ones.
        */
        initWorkers: function () {
            const self = this;
            if (this.workers.length === this.threads) {
                return;
            }
            // Remove unwanted workers
            if (this.workers.length > this.threads) {
                for (let w = this.threads; w < this.workers.length; w++) {
                    this.workers[w].terminate();
                }
                this.workers = this.workers.slice(0, this.threads);
                return;
            }
            // Create workers
            for (let w = this.workers.length; w < this.threads; w++) {
                try {
                    this.workers[w] = new Worker();
                    this.workers[w].onmessage = (event) => self.parseWorkerMessage(event.data);
                } catch (err) {
                    this.error = err;
                    this.status = 'Error';
                    console.error(this.error);
                    break;
                }
            }
        },
        parseWorkerMessage: function (wallet) {
            if (wallet.error) {
                this.stopGen();
                this.error = wallet.error;
                this.status = 'Error';
                console.error(this.error);
                return;
            }
            if (wallet.address) {
                this.stopGen();
                return this.displayResult(wallet);
            }
            this.$emit('increment-counter', wallet.attempts);
        },
        startGen: function () {
            if (!window.Worker) {
                this.error = 'workers_unsupported';
                return;
            }
            this.clearResult();
            this.running = true;
            for (let w = 0; w < this.workers.length; w++) {
                this.workers[w].postMessage(this.input);
            }
            this.status = 'Running';
            this.firstTick = performance.now();
        },
        stopGen: function () {
            this.running = false;
            this.status = 'Stopped';
            for (let i = 0; i < this.workers.length; i++) {
                this.workers[i].terminate();
            }
            this.workers = [];
            this.initWorkers();
        },
        countCores: function () {
            // Estimate number of cores on machine
            let cores = 0;
            try {
                cores = parseInt(navigator.hardwareConcurrency, 10);
            } catch (err) {
                console.error(err);
            }
            if (cores) {
                this.cores = cores;
                this.threads = this.cores;
            }
        },
        checkLocation() {
            try {
                this.error = window.self !== window.top ? 'insecure_location': this.error;
            } catch (e) {
                this.error = 'insecure_location';
            }
            const hostname = window.location.hostname;
            if (hostname && ['localhost', '127.0.0.1', 'vanity-eth.tk'].indexOf(hostname) === -1) {
                this.error = 'insecure_location';
            }
        },
        benchmark(max) {
            max = max || 10000;
            const step = 500;
            const worker = new Worker();
            let attempts = 0;
            const times = [];
            const durations = [];
            const timeTaken = (a, d) => Math.round((1000 * a) / d);
            worker.onmessage = () => {
                times.push(performance.now());
                if (times.length === 1) {
                    return;
                }
                durations.push(times[times.length - 1] - times[times.length - 2]);
                attempts += step;
                console.info(
                    attempts + '/' + max + '...' + timeTaken(step, durations[durations.length - 1]) + ' addr/s'
                );
                if (attempts >= max) {
                    console.info(
                        '\nSpeed range: ' +
                        timeTaken(step, Math.max(...durations)) +
                        ' - ' +
                        timeTaken(step, Math.min(...durations)) +
                        ' addr/s'
                    );
                    console.info('Average: ' + timeTaken(attempts, times[times.length - 1] - times[0]) + ' addr/s');
                    worker.terminate();
                }
            };
            const input = {
                checksum: true,
                hex: 'f'.repeat(5),
                suffix: false
            };
            console.info('Starting benchmark with 1 core...');
            worker.postMessage(input);
        },
    },
    created: function () {
        this.checkLocation();
        this.countCores();
        this.initWorkers();
        window['benchmark'] = this.benchmark;
    },
};