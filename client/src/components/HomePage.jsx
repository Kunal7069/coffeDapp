import { useState,useEffect } from "react";
const HomePage=({state})=>{
    
    const {contract}=state;
    const teacher = async(event)=>{
        event.preventDefault();
        const newPageUrl = '/teacher_signup';
              window.location.href = newPageUrl;   
      }
      const student = async(event)=>{
        event.preventDefault();
        const newPageUrl = '/student_signup';
              window.location.href = newPageUrl;   
      }
    return (
        <>
         <div>
         <button onClick={teacher}>TEACHER</button>
        <button onClick={student}>STUDENT</button>
          </div>
        
        </>
      );
}
export default HomePage;