import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import {ethers} from "ethers"
import "./Teacher_Homepage.css"
const Join_Classroom=({state})=>{
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
    const join_classroom = async(event)=>{
      event.preventDefault();
      const student={name}
      const teacher_name = document.querySelector("#teacher_name").value;
      const class_name = document.querySelector("#class_name").value;
      const student_password = document.querySelector("#student_password").value;
      const classcode = document.querySelector("#classcode").value;
      const amount = {value:ethers.utils.parseEther("0.00001")}
      const transaction = await contract.add_in_classroom(teacher_name,class_name,student.name,student_password,classcode,amount)
      await transaction.wait();
      alert("Transaction is successul");
      const newPageUrl = `/homepage_student/${name}`;
            window.location.href = newPageUrl;   
    }
    return (
        <div className="container-fluid">
          <h1>JOIN CLASSROOM</h1>
          <form onSubmit={join_classroom}>
          <div className="inputbox">
              <input type="text" required="required" id="teacher_name" />
              <span>Teacher name</span>
            </div>
            <div className="inputbox">
              <input type="text" required="required" id="class_name" />
              <span>Class name</span>
            </div>
            <div className="inputbox">
              <input type="text" required="required" id="student_password" />
              <span>Student Password</span>
            </div>
            <div className="inputbox">
              <input type="text" required="required" id="classcode" />
              <span>Classcode</span>
            </div>
            <div className="inputbox">
              <input type="submit" value="Join"/>
            </div>
          </form>
        </div>
      );
}
export default Join_Classroom;