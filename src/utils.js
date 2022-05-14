import Web3 from 'web3'
import Wallet from './contracts/Wallet.json'
var Eth = require('web3-eth');
var eth = new Eth('ws://127.0.0.1:9545');

const getWeb3 = () => {
  return new Promise((resolve,reject) => {
    window.addEventListener('load', async ()=> {
    if(window.ethereum){
      const web3 = new Web3(eth)
      try {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
        resolve({web3,accounts})
      } catch(error) {
        reject(error)
      } 
    } else reject('Must install Metamask')
  })
  })
}
const getWallet = async web3 => {
  const networkId = await web3.eth;
  console.log(networkId)
  const deployedNetwork = Wallet.networks[networkId]
  return new web3.eth.Contract(
    Wallet.abi,
    deployedNetwork && deployedNetwork.address
  )
}
export { getWeb3, getWallet } 