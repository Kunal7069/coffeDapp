import { useState,useEffect } from "react";
import {ethers} from "ethers"
import "./Teacher_Homepage.css"
const Student_Signup=({state,account})=>{
    
    const student_signup = async(event)=>{
      event.preventDefault();
      const {contract}=state;
      const name = document.querySelector("#name").value;
      const password = document.querySelector("#password").value;
      const amount = {value:ethers.utils.parseEther("0.00001")}
      const transaction = await contract.student_signup(name,password,amount)
      await transaction.wait();
      alert("Transaction is successul");
      const newPageUrl = '/student_login';
      window.location.href = newPageUrl;
    }
    const student_login = async(event)=>{
      event.preventDefault();
      const newPageUrl = '/student_login';
      window.location.href = newPageUrl;
    }
    return  (
      <>
      <div className="center">
       <h1>SIGNUP</h1>
        <form onSubmit={student_signup }>
          <div className="inputbox">
            <input type="text" required="required" id="name" />
            <span>Name</span>
          </div>
          <div className="inputbox">
            <input type="text" required="required" id="password" />
            <span>Password</span>
          </div>
          <div className="inputbox">
            <input type="submit" value="Signup"  disabled={!state.contract}/>
          </div>
        </form>
        <h6>Already have an account <button onClick={student_login} >login</button></h6>
        </div>
        </>
        
      );
}
export default Student_Signup;