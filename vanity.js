/* eslint-env worker */
const secp256k1 = require('secp256k1');
const keccak = require('keccak');
const randomBytes = require('randombytes');

let scanCount = 0;

function privateToAddress(privateKey) {
    const pub = secp256k1.publicKeyCreate(privateKey, false).slice(1);
    return keccak('keccak256').update(pub).digest().slice(-20).toString('hex');
};

function getRandomWallet() {
    const randbytes = randomBytes(32);
    return {
        address: privateToAddress(randbytes).toString('hex'),
        privKey: randbytes.toString('hex')
    };
};

function genEth(addrReq){
    let wallet = getRandomWallet();
    var addr = wallet.address
    scanCount ++;
    if (addr === addrReq) {
        console.log(scanCount + ' address: ' + addr + ' priv key: ' + wallet.privKey);
    } else {
        console.log(scanCount + ' address: ' + addr + ' priv key: ' + wallet.privKey);
        genEth(addrReq)
    }
};
genEth()