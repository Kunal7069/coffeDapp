import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import {ethers} from "ethers"
import "./Teacher_Homepage.css"
const Memos=({state})=>{
    const [memos,setMemos]=useState([]);
    const {contract}=state;
    const { name } = useParams();
    // useEffect(()=>{
    //     const memosMessage = async()=>{
    //       const memos = await contract.getTeachers();
    //       setMemos(memos)
    //       console.log(memos)
    //     }
    //     contract && memosMessage()
    // },[contract])
    const create_classroom = async(event)=>{
      event.preventDefault();
      const teacher={name}
      const classname = document.querySelector("#classname").value;
      const password = document.querySelector("#password").value;
      console.log(teacher.name,classname,password)
      const amount = {value:ethers.utils.parseEther("0.00001")}
      const transaction = await contract.create_classroom(teacher.name,classname,password,amount)
      await transaction.wait();
      alert("Transaction is successul");
      const newPageUrl = `/homepage_teacher/${name}`;
            window.location.href = newPageUrl;   
    }
    return (
        <div className="container-fluid">
          <h1>CREATE CLASSROOM</h1>
          <form onSubmit={create_classroom}>
            <div className="inputbox">
              <input type="text" required="required" id="classname" />
              <span>Classname</span>
            </div>
            <div className="inputbox">
              <input type="text" required="required" id="password" />
              <span>Password</span>
            </div>
            <div className="inputbox">
              <input type="submit" value="Create"/>
            </div>
          </form>
        </div>
      );
}
export default Memos;