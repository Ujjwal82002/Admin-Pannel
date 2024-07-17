// edit part of frontend

import { useEffect, useState } from "react"
import {useParams} from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";


export const AdminUpdate = () => {
   
    const [data, setdata] = useState({
        username: "",
        email: "",
        phone: "",
    })
    const navigate = useNavigate();
    const  params = useParams();
    console.log("params single users:", params)
    const {authorizationToken} = useAuth();
// get single user data
    const getSingleUserData =async () =>{
        try {
        const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`,{
            method: "GET",
            headers:{
                Authorization: authorizationToken,
            },
          });
        
          const data = await response.json();
          console.log("users single data", data); 
          setdata(data);
    
        //   if(response.ok){
        //     getAllUsersData();
        //   }
    
    
        }catch (error) {
            console.log(error);
        }
    };


useEffect(() =>{
    getSingleUserData();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])


// lets tackle our handleInput
const handleInput = (e) => {
  let name = e.target.name;
  let value = e.target.value;

  setdata({
    ...data,
    [name]:value,
  });
}

// to update the data dynamically
 
const handleSubmit = async(e) => {
  e.preventDefault();
  try {
    const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
          Authorization: authorizationToken,
      },
      body: JSON.stringify(data),
    });
    if(response.ok){
      toast.success("Updated Successfuly");
      navigate("/admin/users")
         }

         else{
          toast.success("Not Updated ");
         }
 
  } catch (error) {
    console.log(error);
  }
}


  return (
    <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Update Users Data</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={data.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={data.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="Phone">Mobile</label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={data.phone}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <button type="submit">Update</button>
              </div>
            </form>
          </section>
        </div>
      </section>
  )
}
