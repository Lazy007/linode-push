var Wallet = require('ethereumjs-wallet');
var fs = require('fs');
var scanCount = 0;
const addrRequest = '';

const getRandomWallet = () => {
    const randbytes = randomBytes(32).toString('hex');
    return {
        privKey: randbytes,
        address: new ethers.Wallet(randbytes)
    };
};

function genEth(addrReq){
    let wallet = Wallet.default.generate();
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