import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./Teacher_Homepage.css"
const Teacher_Homepage=({state})=>{
    const [memos,setMemos]=useState([]);
    const {contract}=state;
    const { name } = useParams();
    useEffect(()=>{
        const memosMessage = async()=>{
          const teacher={name}
          console.log(teacher.name,"hii")
          const memos = await contract.getClasses_teachers_wise(teacher.name);
          setMemos(memos)
          console.log(memos)
        }
        contract && memosMessage()
    },[contract])
    const create_classroom = async(event)=>{
      event.preventDefault();
      const newPageUrl = `/create_classroom/${name}`;
            window.location.href = newPageUrl;   
    }
    const view_students = async(data)=>{
      // event.preventDefault();
      console.log(data.data,name)
      const newPageUrl = `/view_students/${name}/${data.data}`;
            window.location.href = newPageUrl;   
    }
    
  
    return (
  
        <div className="container-fluid">
          {/* <h3 style={{ textAlign: "center", marginTop: "20px" }}>HII {name}</h3>            */}
           <button onClick={create_classroom}>Create</button>   
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
              <button onClick={() => view_students({"data":memo.classname})}>VIEW STUDENTS</button>
          </div>
            );
          })}
          </div>
               
               

        </div>
      );
}
export default Teacher_Homepage;