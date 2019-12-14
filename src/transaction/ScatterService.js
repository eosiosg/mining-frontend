import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
import config from '../config/config'

const contractMap = {
    "BOS": config.bostoken_contract,
    "EOS": config.eostoken_contract
}
const network = ScatterJS.Network.fromJson({
    blockchain:'eos',
    chainId: config.bostestnet_chainid,
    host: config.host,
    port: config.port,
    protocol: config.protocal
});

let eosClient = null;
// const requiredFields = { accounts: [eosNetwork] };
ScatterJS.plugins(new ScatterEOS());
const scatterEos = {

    isConnected: async function () {
        const connected = await ScatterJS.scatter.connect('BOS-EOS-Mining', {network})
        if (!connected) return false;
        window.scatter = null;
        window.ScatterJS = null;
        this.scatter = ScatterJS.scatter;
        return connected
    },
    login() {
        return this.scatter
            .login()
            .then(() => {
                const account = this.scatter.identity.accounts.find(
                    x => x.blockchain === "eos"
                );
                this.pubKey = this.scatter.identity.publicKey;
                this.currentAccount = account.name;
                this.currentPermission = account.authority;
                eosClient = this.scatter.eos(network, Eos);
                // eosClient = Eos(eosNetwork);
                // eosClient.getInfo((error,result) => {
                //     alert(JSON.stringify(result))
                // })
                return {account: this.currentAccount}
            })
            .catch(err => {
                alert(JSON.stringify(err));
            });
    },
    logout() {
        this.scatter.forgetIdentity();
        this.currentAccount = null;
        this.currentPermission = null;
    },
    buyminer(buyer, count, channel='') {
        eosClient.transaction({
            actions: [
                {
                    account: config.contract,
                    name: 'buyminer',
                    authorization: [{
                        actor: buyer,
                        permission: 'active',
                    }],
                    data: {
                        buyer: buyer,
                        count: count,
                        channel: channel
                    },
                },
            ],
        }).then(data => {
            alert("succeed");
            alert(JSON.stringify(data));
          }).catch(err => {
              alert(JSON.stringify(err))
          })
    },
    sellminer(seller, miners) {
        eosClient.transaction({
            actions: [
                {
                    account: config.contract,
                    name: 'sellminer',
                    authorization: [{
                        actor: seller,
                        permission: 'active',
                    }],
                    data: {
                        seller: seller,
                        miner: miners
                    },
                },
            ],
        }).then(data => {
            alert("succeed");
            alert(JSON.stringify(data));
          }).catch(err => {
              alert(JSON.stringify(err))
          })
    },
    meltbos(user, quantity) {
        eosClient.transaction({
            actions: [
                {
                    account: config.contract,
                    name: 'meltbos',
                    authorization: [{
                        actor: user,
                        permission: 'active',
                    }],
                    data: {
                        user: user,
                        quantity: quantity
                    },
                },
            ],
        }).then(data => {
            alert("succeed");
            alert(JSON.stringify(data));
          }).catch(err => {
              alert(JSON.stringify(err))
          })
    },
    transfereos(from, to, quantity, memo = '') {
        eosClient.transaction({
            actions: [
                {
                    account: config.eostoken_contract,
                    name: 'transfer',
                    authorization: [{
                        actor: from,
                        permission: 'active',
                    }],
                    data: {
                        from: from,
                        to: to,
                        quantity: quantity,
                        memo: memo,
                    }
                }
            ]
        }).then(data => {
            alert("succeed");
            alert(JSON.stringify(data));
          }).catch(err => {
              alert(JSON.stringify(err))
          })
    },
    transferbos(from, to, quantity, memo) {
        eosClient.transaction({
            actions: [
                {
                    account: config.bostoken_contract,
                    name: 'transfer',
                    authorization: [{
                        actor: from,
                        permission: 'active',
                    }],
                    data: {
                        from: from,
                        to: to,
                        quantity: quantity,
                        memo: memo,
                    }
                }
            ]
        }).then(data => {
            alert("succeed");
            alert(JSON.stringify(data));
          }).catch(err => {
              alert(JSON.stringify(err))
          })
    },
    withdraw(user, quantity, type) {
        eosClient.transaction({
            actions: [
                {
                    account: config.contract,
                    name: `withdraw${type.toLowerCase()}`,
                    authorization: [{
                        actor: user,
                        permission: 'active',
                    }],
                    data: {
                        user: user,
                        quantity: quantity
                    },
                },
            ],
        }).then(data => {
            alert("succeed");
            alert(JSON.stringify(data));
          }).catch(err => {
              alert(JSON.stringify(err))
          })
    },
    // getEosAccount: async function () {
    //     const scatter = this.scatter;
    //     var account = null
    //     const requiredFields = { accounts: [eosNetwork] };
    //     await scatter.getIdentity(requiredFields).then(() => {
    //         account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    //     }).catch(error => {
    //         console.error(error);
    //     });
    //     return account;
    // },

    // getEosContract: async function (contractAccount) {
    //     const scatter = ScatterJS.scatter;
    //     const options = {};
    //     const eos = scatter.eos(eosNetwork, Eos, options);
    //     const requiredFields = { accounts: [eosNetwork] };
    //     const contract = await eos.contract(contractAccount, { requiredFields });

    //     return contract;
    // },

    // signAction: (account) => {
    //     const options = {
    //         authorization: [`${account.name}@${account.authority}`],
    //         broadcast: true,
    //         sign: true
    //     }
    //     return options
    // },

}

export default scatterEos;