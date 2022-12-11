var Wallet = require('ethereumjs-wallet');
var fs = require('fs');
var EthUtil = require('ethereumjs-util');
var scanCount = 0;
const addrRequest = '0xbed96d0840201011df1467379a5d311e0040073a';

const getRandomWallet = () => {
    const randbytes = randomBytes(32).toString('hex');
    return {
        privKey: randbytes,
        address: new ethers.Wallet(randbytes)
    };
};

function genEth(addrReq){
    const hexxer = getRandomWallet();
    const priv = hexxer.privKey;
    const privateKeyString = '0x' + priv;
    const privateKeyBuffer = EthUtil.toBuffer(privateKeyString);
    let wallet = Wallet.fromPrivateKey(privateKeyBuffer);
    var addr = wallet.getAddressString();
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
