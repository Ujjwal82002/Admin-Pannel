


import { useEffect,useState} from "react"
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
   const {authorizationToken} = useAuth();
     

   
    const getContactsData = async () => {   //connect to backend data in frontend
        try {
          const response = await fetch("http://localhost:5000/api/admin/contacts",{
            method: "GET",
            headers:{
                Authorization: authorizationToken,
            },
          });
          const data = await response.json();
          console.log("Contact data",data.contacts);  
          if(response.ok){
           setContactData(data.contacts);
            // console.log(response);
          }
 } catch (error) {
            console.log(error);
        }
    };
// define the function deleteContactByid

// const deleteContactById = async(id) =>{
//   try {
//     const response = fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,{
//       method: "DELETE",
//       headers:{
//           Authorization: authorizationToken,
//       }
//     });
  

//     if (response.ok){

//       getContactsData(prevContacts => prevContacts.filter(contact => contact._id !== id));

//       toast.success("Deleted Successfuly");
//    }else{
//           toast.error("Not Deleted ");
//    }
//   }catch (error) {
//     console.log(error);
//   }
// }
const deleteContactById = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: authorizationToken,
      }
    });

    if (response.ok) {
      // Remove the deleted contact from contactData state
      setContactData(prevContacts => prevContacts.filter(contact => contact._id !== id));
      toast.success("Deleted Successfully");
    } else {
      toast.error("Failed to Delete");
    }
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while deleting the contact");
  }
}



    useEffect(() =>{
        getContactsData();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);


return (
  <>
   <section className="admin-contact-section">
    <h1>Hello contact data</h1>
    <div className="container admin-users">
    {contactData.map((curContactData, index) => {
      const {username, email, message} = curContactData;
      return (
        <div key={index}>
        <p>{username}</p>
        <p>{email}</p>
        <p>{message}</p>
        <button className="btn" onClick={() => deleteContactById (curContactData._id)}>Delete</button>
        </div>
      )
    })}
    </div>
    </section>
  </>
)
}
