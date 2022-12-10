var Wallet = require('ethereumjs-wallet');
var fs = require('fs');
var data = fs.readFileSync('address.json');
var myObject = JSON.parse(data);
var scanCount = 0;
const addrRequest = '';

const getRandomWallet = () => {
    const randbytes = randomBytes(32).toString('hex');
    return {
        privKey: randbytes,
        address: new ethers.Wallet(randbytes)
    };
};

function genEth(addrReq) {
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
        let newData = {
            "address": addr,
            "private key": priv
        }
        myObject.push(newData);
        var newData = JSON.stringify(myObject);
        fs.writeFile('address.json', newData, err => {
            if (err) throw err;
        });
        console.log(scanCount + ' ' + addrPriv);
    }
};
for (;;) {
    genEth(addrRequest);
};