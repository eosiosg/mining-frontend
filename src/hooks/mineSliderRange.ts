import {useState, useEffect} from 'react'
import {AccountInfo} from "typings/api"
const digitMatch = /([0-9.]+)/g;
export function useMineSlider(
    poolInfoPrice: string, 
    accountInfo: AccountInfo, 
    availableMiner: number
  ) {
  const [maxMiner, setMaxMiner] = useState(0)
  const [price, setPrice] = useState<number[]>(null)
  useEffect(()=> {
    if (poolInfoPrice) {
      setPrice(poolInfoPrice.match(digitMatch).map(str => parseFloat(str)))
    }
  },[poolInfoPrice])

  const [balance, setBalance] = useState<number[]>(null)
  useEffect(() => {
    if (!accountInfo.bosBalance || !accountInfo.eosBalance) {
      setBalance([0,0])
      return
    }
    setBalance([
      parseFloat(accountInfo.bosBalance.split(" ")[0]),
      parseFloat(accountInfo.eosBalance.split(" ")[0])
    ])
  },[accountInfo.bosBalance, accountInfo.eosBalance])
  useEffect(() => {
    if (availableMiner < 1 || !price) {
      setMaxMiner(availableMiner)
      return
    } 
    let canBuy = availableMiner;
    balance.forEach((bal, index) => {
      if (bal/price[index] < canBuy ) {
        canBuy = bal/price[index]
      }
    })
    setMaxMiner(canBuy)
  },[price, balance,availableMiner])
  return {
    maxMiner,
    price,
    balance
  };
}