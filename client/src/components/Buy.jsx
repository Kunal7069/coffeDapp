import { useState,useEffect } from "react";
import {ethers} from "ethers"
import "./Buy.css";
import "./Memos.css"
const Buy=({state,account})=>{
    
    const buyChai = async(event)=>{
      event.preventDefault();
      const {contract}=state;
      const name = document.querySelector("#name").value;
      const password = document.querySelector("#password").value;
      const amount = {value:ethers.utils.parseEther("0.00001")}
      const transaction = await contract.teacher_signup(name,password,amount)
      await transaction.wait();
      alert("Transaction is successul");
      const newPageUrl = '/login';
      window.location.href = newPageUrl;
    }
    return  (
      <>
      <h3>Connected Account - {account}</h3>
      <div className="center">
       <h1>Thanks</h1>
        <form onSubmit={buyChai}>
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
        </div>
        </>
        
      );
}
export default Buy;