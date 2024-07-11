import { useState } from "react";
import "./styles/Login.css";
import axios from "axios";

export default function ResetPassword() {
  let email=""
  const [errors,setErrors]=useState({})
  const [requestedToReset, setRequestedToReset] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const getEmail =(event)=>{
     email=event.target.value
  }
  const resetPassword = async (e) => {
    if (email === '') {
  
        setErrors({
            ...errors,
            emailError: "please enter your email to reset your password"
        })
    }
  
    e.preventDefault()
    var emailToSend ={ "email": email } 
    try {
        //"http://127.0.0.1:8000/api/admin/employees/forgot-password"
        const response = await axios.post("http://127.0.0.1:8000/api/admin/employees/forgot-password", emailToSend)
        setRequestedToReset(true)
        console.log(response.data)
  
    }
    catch(error) {
  console.error(error)
    }
  
  } 
  return (
    <div className="formUser">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card my-5">
              <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label for="email">email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    onChange={getEmail}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-color px-5 mb-2 w-100"
                    onClick={resetPassword}
                  >
                    send code verify
                  </button>
                      <span className={"text-danger ml-5 " + (requestedToReset ? "visible" : "invisible")}>Check your email</span>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}