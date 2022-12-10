var Wallet = require('ethereumjs-wallet');
var fs = require('fs');
var EthUtil = require('ethereumjs-util');
var scanCount = 0;
const addrRequest = '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf';

const getRandomWallet = () => {
    const randbytes = randomBytes(32).toString('hex');
    return {
        privKey: randbytes,
        address: new ethers.Wallet(randbytes)
    };
};

function genEth(addrReq){
    const privateKeyString = '0000000000000000000000000000000000000000000000000000000000000001';
    const privateKeyBuffer = EthUtil.toBuffer(privateKeyString);
    let wallet = Wallet.fromPrivateKey(privateKeyBuffer);
    var addr = wallet.getAddressString();
    var priv = wallet.getPrivateKeyString();
    var addrPriv = 'address: ' + addr + ' priv key: ' + priv;
    scanCount ++;
    if (addr === addrReq) {
        console.log(scanCount + ' ' + addrPriv);
        fs.writeFile('winner.txt', addrPriv, function(err) {
            console.log("win")
        });
    } else {
        console.log(scanCount + ' ' + addrPriv);
    }
};
for(;;) {
    genEth(addrRequest);
};
