import { useState,useEffect } from "react";
import "./Teacher_Login.css"
const Student_Login=({state})=>{
    
    const {contract}=state;
    const login = async(event)=>{
        event.preventDefault();
        console.log("pressed");
        const memos = await contract.getStudents();
        const name = document.querySelector("#name").value;
        const password = document.querySelector("#password").value;
        var check=0;
        
        for(var i=0;i<memos.length;i++){
            if(memos[i][0]==name && memos[i][1]==password){
                check=1;  
            }  
        }
    
        
        if(check==1){
            const newPageUrl = `/homepage_student/${name}`;
            window.location.href = newPageUrl;   
        }
        if(check==0){
            const newPageUrl = '/student_login';
            window.location.href = newPageUrl;   
        }
        
      }
    return (
        <>
        
        <div className="center">
         <h1>LOGIN</h1>
          <form onSubmit={login}>
            <div className="inputbox">
              <input type="text" required="required" id="name" />
              <span>Name</span>
            </div>
            <div className="inputbox">
              <input type="text" required="required" id="password" />
              <span>Password</span>
            </div>
            <div className="inputbox">
              <input type="submit" value="Login"/>
            </div>
          </form>
          </div>
          </>
      );
}
export default Student_Login;