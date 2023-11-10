import { useState,useEffect } from 'react'
import { BrowserRouter as Router, Route, Link ,Routes} from 'react-router-dom';
import abi from "./contractJson/chai.json"
import {ethers} from "ethers"
import Memos from './components/Memos'
import Buy from './components/Buy'
import Login from './components/Login'
import chai from "./chai.png";
import './App.css'

function App() {
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })
  const [account,setAccount]=useState('Not connected');
  useEffect(()=>{
    const template=async()=>{
   
      const contractAddres="0x03D970A75638b83aAd549c882D514D979d12a57f";
      const contractABI=abi.abi;
      //Metamask part
      //1. In order do transactions on goerli testnet
      //2. Metmask consists of infura api which actually help in connectig to the blockhain
      try{

        const {ethereum}=window;
        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })
 
        window.ethereum.on("accountsChanged",()=>{
         window.location.reload()
        })
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum);//read the Blockchain
        const signer =  provider.getSigner(); //write the blockchain
        
        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        )
        console.log(contract)
      setState({provider,signer,contract});
       
      }catch(error){
        console.log(error)
      }
    }
    template();
  },[])
  return (
    <>
   
<Router>
  <Routes>
    <Route path="/"  element={<Buy state={state} account={account}/>} />
    <Route path="/login" element={<Login state={state}/>} />
    <Route path="/homepage" element={<Memos state={state}/>} />
    </Routes>
</Router> 

</>
  )
}

export default App
