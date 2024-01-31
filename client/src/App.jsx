import { useState,useEffect } from 'react'
import { BrowserRouter as Router, Route, Link ,Routes} from 'react-router-dom';
import abi from "./contractJson/chai.json"
import {ethers} from "ethers"
import Student_Homepage from './components/Student_Homepage'
import Teacher_Homepage from './components/Teacher_Homepage'
import Teacher_Signup from './components/Teacher_Signup'
import Student_Signup from './components/Student_Signup'
import Teacher_Login from './components/Teacher_Login'
import Student_Login from './components/Student_Login'
import Create_Classroom from './components/Create_Classroom'
import Join_Classroom from './components/Join_Classroom'
import View_Students from './components/View_Students'
import HomePage from './components/HomePage'
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
   
      const contractAddres="0x94C659b6c1247198C45c9E9bE59bCb747ADF9642";
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
    <Route path="/"  element={<HomePage state={state} account={account}/>} />
    <Route path="/teacher_signup"  element={<Teacher_Signup state={state} account={account}/>} />
    <Route path="/student_signup"  element={<Student_Signup state={state} account={account}/>} />
    <Route path="/teacher_login" element={<Teacher_Login state={state}/>} />
    <Route path="/student_login" element={<Student_Login state={state}/>} />
    <Route path="/homepage_teacher/:name" element={<Teacher_Homepage state={state}/>} />
    <Route path="/homepage_student/:name" element={<Student_Homepage state={state}/>} />
    <Route path="/create_classroom/:name" element={<Create_Classroom state={state}/>} />
    <Route path="/join_classroom/:name" element={<Join_Classroom state={state}/>} />
    <Route path="/view_students/:name/:data" element={<View_Students state={state}/>} />
  </Routes>
</Router> 

</>
  )
}

export default App
