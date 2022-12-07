/* eslint-env worker */
const secp256k1 = require('secp256k1');
const keccak = require('keccak');
const randomBytes = require('randombytes');

let scanCount = 0;

const privateToAddress = (privateKey) => {
    const pub = secp256k1.publicKeyCreate(privateKey, false).slice(1);
    return keccak('keccak256').update(pub).digest().slice(-20).toString('hex');
};

const getRandomWallet = () => {
    const randbytes = randomBytes(32);
    return {
        address: privateToAddress(randbytes).toString('hex'),
        privKey: randbytes.toString('hex')
    };
};

function genEth(addr){
    let wallet = getRandomWallet();
    scanCount ++;
    if (wallet.address === addr) {
        console.log(scanCount + ' address: ' + '0x' + wallet.address + ' priv key: ' + wallet.privKey);
    } else {
        console.log(scanCount + ' address: ' + '0x' + wallet.address + ' priv key: ' + wallet.privKey);
        genEth(addr)
    }
};
