import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./Teacher_Homepage.css"
const View_Students=({state})=>{
    const [memos,setMemos]=useState([]);
    const {contract}=state;
    const { name,data } = useParams();
    useEffect(()=>{
        const memosMessage = async()=>{
          console.log(name,data)
          const memos = await contract.getStudents_Class_Wise(name,data);
          setMemos(memos)
          console.log(memos)
        }
        contract && memosMessage()
    },[contract])
    
  
    return (
  
        <div className="container-fluid">
          <h1>VIEW STUDENTS</h1>
              {memos} 

        </div>
      );
}
export default View_Students;