import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
const URL ="http://localhost:5000/api/auth/login"

export const Login = () => {
    const [user, setUser] = useState({
        
        email:"",
        password:"",
    });

    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

// handling the input values
const handleInput = (e) =>{
  console.log(e);
  let name = e.target.name;
  let value = e.target.value;


  setUser({
    ...user,
    [name]:value,

  });
};
// handling the form submission
const handleSubmit= async(e)=>{
    e.preventDefault();
    // alert(user);
    try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        console.log("login form : ", response);
        const responseData = await response.json();
      
        if (response.ok) {
         
          // alert("Login successful");
            // stored the token in localhost 
          storeTokenInLS(responseData.token);
          console.log(responseData.message);
          localStorage.setItem('token', responseData.token);
          setUser({  email: "", password: "" });
          toast.success("Login Successful");
          navigate("/")
       
        } else {
          toast.error(responseData.extraDetails ? responseData.extraDetails:responseData.message);
          console.log("invalid credential");
        }
      } catch (error) {
        console.log(error);
      }
    };
    
return (
    <>
          <section>
<main>
      <div className="section-registration">
        <div className="container grid grid-two-cols">
            <div className="registration-image">
                <img src="/images/login.jpg" alt="lets fill the login form"
                    width="350" height="350"
                />
            </div>
            {/* let tackle registration form */}
            <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1><br/>
                <form onSubmit={handleSubmit}>
                   
                    <div>
                        <label htmlFor="email">email</label>
                        <input type="text" 
                        name="email"
                         placeholder="enter your email" 
                          id="email"
                            required 
                            autoComplete="off"
                            value={user.email}
                            onChange={handleInput}

                          />
                    </div>
                    <div>
                        <label htmlFor="password">password</label>
                        <input type="text" 
                        name="password" 
                         placeholder="password" 
                          id="password"
                            required 
                            autoComplete="off"
                            value={user.password}
                            onChange={handleInput}
                          />
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-submit">Login Now</button>
                </form>
            </div>

        </div>
      </div>
</main>
        </section>
    </>
)
};