import { useState,useEffect } from "react";
import "./Memos.css"
const Memos=({state})=>{
    const [memos,setMemos]=useState([]);
    const {contract}=state;
    useEffect(()=>{
        const memosMessage = async()=>{
          const memos = await contract.getTeachers();
          setMemos(memos)
          //console.log(memos)
        }
        contract && memosMessage()
    },[contract])
    return (
        <div className="container-fluid">
          <h3 style={{ textAlign: "center", marginTop: "20px" }}>Messages</h3>           
                <table>
                <tbody >
          {memos.map((memo) => {
            return (
                    <tr >
                      <td 
                        style={{
                          backgroundColor: "dodgerblue",
                          border: "1px solid white",
                          borderCollapse: "collapse",
                          padding: "7px",
                          width: "100px",
                          color:"white",
                         
                        }}
                      >
                        {memo.name}
                      </td>
                     
                      <td  
                        style={{
                          backgroundColor: "dodgerblue",
                          border: "1px solid white",
                          borderCollapse: "collapse",
                          padding: "7px",
                          width: "300px",
                          color:"white"
                        }}
                      >
                        {memo.password}
                      </td>
                      
                    </tr>
             
            );
          })}
               </tbody>
                </table>
        </div>
      );
}
export default Memos;