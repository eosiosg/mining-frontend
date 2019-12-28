import {useState, useEffect} from 'react'
import scatterEos from '../transaction/ScatterService'

export function useScatter() {
  const [isLoading, setIsLoading] = useState(true)
  const [connected, setConnected] = useState(false);
  const [accountName, setAccountName] = useState();
  const [error, setError] = useState(null)
  useEffect(() => {
    const connection = async () => {
      const isconnected : unknown= await scatterEos.isConnected()
      setConnected(isconnected as boolean);
    }
    connection()
  },[])
  useEffect(() => {
    if (connected) {
      scatterEos.login().then((account) => {
        setAccountName(account.account)
        setError(null)
        setIsLoading(false)
      }).catch(err => {
        setError(err)
        setIsLoading(false)
      })
    }
  }, [connected])
  return {connected, accountName, error, isLoading};
}