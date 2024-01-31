import { useState,useEffect } from "react";
import {ethers} from "ethers"
// import "./Teacher_Signup.css";
import "./Teacher_Homepage.css"
const Teacher_Signup=({state,account})=>{
    
    const teacher_signup = async(event)=>{
      event.preventDefault();
      const {contract}=state;
      const name = document.querySelector("#name").value;
      const password = document.querySelector("#password").value;
      const amount = {value:ethers.utils.parseEther("0.00001")}
      const transaction = await contract.teacher_signup(name,password,amount)
      await transaction.wait();
      alert("Transaction is successul");
      const newPageUrl = '/teacher_login';
      window.location.href = newPageUrl;
    }
    const teacher_login = async(event)=>{
      event.preventDefault();
      const newPageUrl = '/teacher_login';
      window.location.href = newPageUrl;
    }
    return  (
      <>
      <div className="center">
       <h1>SIGNUP</h1>
        <form onSubmit={teacher_signup}>
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
        <h6>Already have an account <button onClick={teacher_login} >login</button></h6>
        </div>
        </>
        
      );
}
export default Teacher_Signup;