import { useEffect,useState } from "react"
import { useAuth } from "../store/auth";
import {Link} from "react-router-dom";




export const AdminUsers = () => {
   const [users, setUsers] = useState([])
   const {authorizationToken} = useAuth();
     
    const getAllUsersData = async () => {   //connect to backend data in frontend
        try {
          const response = await fetch("http://localhost:5000/api/admin/users",{
            method: "GET",
            headers:{
                Authorization: authorizationToken,
            },
          });
          const data = await response.json();
          console.log("users data", data.users);  
          if(response.ok){
           setUsers(data.users);
            // console.log(response);
          }
 } catch (error) {
            console.log(error);
        }
    };
// delete the users on delete button
const deleteUser =async (id) =>{
    try {
    const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`,{
        method: "DELETE",
        headers:{
            Authorization: authorizationToken,
        },
      });
    
      const data = await response.json();
      console.log("users data after delete", data.users); 

      if(response.ok){
        getAllUsersData();
      }


    }catch (error) {
        console.log(error);
    }
};


    useEffect(() =>{
        getAllUsersData();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);

  return (
     <>
     <section className="admin-users-section">
        <div className="container">
        <h1 >Admin User Data</h1>
        </div>
        <div className="container admin-users">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {users.map((curUser, index) =>{
     return <tr key={index}>
        <td>{curUser.username}</td>
        <td>{curUser.email}</td>
        <td>{curUser.phone}</td>
        <td><Link className= "updateLink" to={`/admin/users/${curUser._id}/edit`}>Edit</Link></td>
        <td><button onClick={() => deleteUser(curUser._id)}>Delete</button></td>
     </tr>
    })}
            </tbody>
        </table>
   
    </div>
    </section>  
   </>
  );
}



// export const AdminUsers = () => {
//    const {users} = useAuth();
//     return (
//         <>
//         <section className="admin-users-section">
//            <div className="container">
//            <h1 >Admin User Data</h1>
//            </div>
//            <div className="container admin-users">
//            <table>
//                <thead>
//                    <tr>
//                        <th>Name</th>
//                        <th>Email</th>
//                        <th>Phone</th>
//                        <th>Update</th>
//                        <th>Delete</th>
//                    </tr>
//                </thead>
//                {/* <tbody> */}
//                {users && users.map((curUser, index) =>{

//         return ( <tr key = {index}>
//            <td>{curUser.username}</td>
//            <td>{curUser.email}</td>
//            <td>{curUser.phone}</td>
//            <td>edit</td>
//            <td>delete</td>
//         </tr>
//         )
//                })}
//           {/* </tbody> */}
//            </table>
      
//        </div>
//        </section>
//       </>
//      );
//    }
