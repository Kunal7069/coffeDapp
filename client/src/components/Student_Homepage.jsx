import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./Teacher_Homepage.css"
const Student_Homepage=({state})=>{
    const [memos,setMemos]=useState([]);
    const {contract}=state;
    const { name } = useParams();
    useEffect(()=>{
        const memosMessage = async()=>{
          const student={name}
          console.log(student.name,"hii")
          const memos = await contract.getClasses_Student_Wise(student.name);
          setMemos(memos)
          console.log(memos)
        }
        contract && memosMessage()
    },[contract])
    const join_classroom = async(event)=>{
      event.preventDefault();
      const newPageUrl = `/join_classroom/${name}`;
            window.location.href = newPageUrl;   
    }
    return (
  
        <div className="container-fluid">
          {/* <h3 style={{ textAlign: "center", marginTop: "20px" }}>HII {name}</h3>            */}
           <button onClick={join_classroom}>JOIN NEW CLASS</button>   
           <br></br>
           <br></br>
           <br></br>
           <div className="mainDiv">
          {memos.map((memo) => {
            return (
              <div class="card" style={{  marginTop:"2rem" , boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
              <div class="card-content">
                  <h3 class="card-title">{memo.classname}</h3>
                  <p class="card-description">{memo.classcode}</p>
              </div>
          </div>
            );
          })}
          </div>
               
               

        </div>
      );
}
export default Student_Homepage;