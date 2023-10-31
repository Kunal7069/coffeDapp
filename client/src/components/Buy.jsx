import {ethers} from "ethers"
import "./Buy.css";
const Buy=({state})=>{

    const buyChai = async(event)=>{
      event.preventDefault();
      const {contract}=state;
      const name = document.querySelector("#name").value;
      const password = document.querySelector("#password").value;
      //const amount = document.querySelector("#amount").value;
      const amount = {value:ethers.utils.parseEther("0.00001")}
      const transaction = await contract.teacher_signup(name,password,amount)
      await transaction.wait();
      alert("Transaction is successul");
      window.location.reload();
    }
    return  (
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
            <input type="submit" value="Pay"  disabled={!state.contract}/>
          </div>
        </form>
          
        </div>
      );
}
export default Buy;