/*
* EOS JS init
* */

Eos = require('eosjs')

let bostestnet_chainid = '33cc2426f1b258ef8c798c34c0360b31732ea27a2d7e35a65797850a86d1ba85'
let bostestnet_endpoint = 'http://3.0.56.177:8883'

let contract = 'mytest111111'
let alice = 'mytestalice1'
let bob = 'mytestbob111'


function EOSCreator () {
  let config = {
    chainId: bostestnet_chainid, // 32 byte (64 char) hex string
    keyProvider: ['5HvLnfhxxFeXeZwPNfif3xD8Vb4w1wopmUPgBuWpFUN2gMyAajZ'], // WIF string or array of keys..
    httpEndpoint: bostestnet_endpoint,
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true,
  }
  eos = Eos(config)
  return eos
}


eos = EOSCreator()

const buyminer = (buyer, count, channel) => {
  eos.transaction({
    actions: [
      {
        account: contract,
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
}

const sellminer = (seller, miners) => {
  eos.transaction({
    actions: [
      {
        account: contract,
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
}

const meltbos = (user, quantity) => {
  eos.transaction({
    actions: [
      {
        account: contract,
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
}

const delegatech = (from, channel, quantity) => {
  eos.transaction({
    actions: [
      {
        account: contract,
        name: 'delegatech',
        authorization: [{
          actor: from,
          permission: 'active',
        }],
        data: {
          from: from,
          channel: channel,
          quantity: quantity
        },
      },
    ],
  })
}

const undelegatech = (from, channel, quantity) => {
  eos.transaction({
    actions: [
      {
        account: contract,
        name: 'undelegatech',
        authorization: [{
          actor: from,
          permission: 'active',
        }],
        data: {
          from: from,
          channel: channel,
          quantity: quantity
        },
      },
    ],
  })
}

// buyminer(alice, 10, bob);
// sellminer(alice, [500])
// meltbos(alice, "100.0000 BOS")
// delegatech(alice, bob, "200.0000 BOS")
undelegatech(alice, bob, "200.0000 BOS")
