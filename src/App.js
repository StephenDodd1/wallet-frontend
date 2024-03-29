import React, {useState, useEffect} from 'react'
import { getWeb3, getWallet } from './utils';
import './App.css';
import Header from './Header';

function App() {
  const [web3, setWeb3] = useState(undefined)
  const [accounts, setAccounts] = useState(undefined)
  const [wallet, setWallet] = useState(undefined)
  const [approvers, setApprovers] = useState([])
  const [quorum, setQuorum] = useState(undefined)

  useEffect(() => {
    const init = async () =>{
      const {web3, accounts} = await getWeb3();
      console.log(accounts)
      const wallet = await getWallet(web3)
      const approvers = await wallet.methods.getApprovers().call()
      const quorum = await wallet.methods.quorum().call()
      setWeb3(web3)
      setAccounts(accounts)
      setWallet(wallet)
      setApprovers(approvers)
      setQuorum(quorum)
    }
    init();
  }, [])
  if(typeof web3 === undefined
    || typeof accounts === undefined
    || typeof wallet === undefined
    || approvers.length === 0
    || typeof quorum === undefined){
    return(<div>Loading...</div>)
  }
  return (
    <div className="App">
      <Header approvers={approvers} quorum={quorum} />
    </div>
  );
}

export default App;
