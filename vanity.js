var ethers = require('ethers');  
var randomBytes = require('randombytes');
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
    let wallet = getRandomWallet();
    var addr = wallet.address.address
    var addrPriv = 'address: ' + addr + ' priv key: ' + wallet.privKey;
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