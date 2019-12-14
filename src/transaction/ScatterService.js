import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
import config from './config'

let bostestnet_chainid = '33cc2426f1b258ef8c798c34c0360b31732ea27a2d7e35a65797850a86d1ba85'
let bostestnet_endpoint = 'http://3.0.56.177:8883'

let contract = 'mytest111111'
let alice = 'mytestalice1'
let bob = 'mytestbob111'
let bostoken_contract = 'mytestcoin12'
let eostoken_contract = 'mytestcoin11'

const eosNetwork = {
    blockchain: 'test',
    chainId: config.bostestnet_chainid, // 32 byte (64 char) hex string
    // keyProvider: [config.keyProvider], // WIF string or array of keys..
    httpEndpoint: config.bostestnet_endpoint,
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true,
}

let eosClient = null;
const requiredFields = { accounts: [eosNetwork] };
ScatterJS.plugins(new ScatterEOS());
const scatterEos = {

    isConnected: async function () {
        const connected = await ScatterJS.scatter.connect('BOS-EOS-Mining')
        if (!connected) return false;
        window.scatter = null;
        window.ScatterJS = null;
        this.scatter = ScatterJS.scatter;
        return connected
    },
    login() {
        this.scatter
            .getIdentity(requiredFields)
            .then(() => {
                const account = this.scatter.identity.accounts.find(
                    x => x.blockchain === "test"
                );
                this.pubKey = this.scatter.identity.publicKey;
                this.currentAccount = account.name;
                this.currentPermission = account.authority;
                eosClient = this.scatter.eos(eosNetwork, Eos, {}, 'http');
                // eosClient = Eos(eosNetwork);
                eosClient.getInfo({}).then(result => alert(JSON.stringify(result)))
                alert(JSON.stringify(account))
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
    buyminer(buyer, count, channel) {
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
        })
    },
    getEosAccount: async function () {
        const scatter = this.scatter;
        var account = null
        const requiredFields = { accounts: [eosNetwork] };
        await scatter.getIdentity(requiredFields).then(() => {
            account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
        }).catch(error => {
            console.error(error);
        });
        return account;
    },

    getEosContract: async function (contractAccount) {
        const scatter = ScatterJS.scatter;
        const options = {};
        const eos = scatter.eos(eosNetwork, Eos, options);
        const requiredFields = { accounts: [eosNetwork] };
        const contract = await eos.contract(contractAccount, { requiredFields });

        return contract;
    },

    signAction: (account) => {
        const options = {
            authorization: [`${account.name}@${account.authority}`],
            broadcast: true,
            sign: true
        }
        return options
    },

}

export default scatterEos;