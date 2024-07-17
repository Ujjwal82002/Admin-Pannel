// context Api
import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext();


// eslint-disable-next-line react/prop-types
export const  AuthProvider = ({children}) =>{
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const[services, setServices] = useState([]);
    const authorizationToken = `Bearer ${token}`;

     

     const storeTokenInLS = (serverToken) =>{
      setToken(serverToken);
        return localStorage.setItem('token' , serverToken);
     };

     let isLoggedIn = !!token;
     console.log('isLoggedIn',isLoggedIn);

       // tackeling the logout functionaity
       const LogoutUser = () =>{
      setToken("");
      return localStorage.removeItem("token")
};

//  JWT  AUTHENTICATION - to get the currently loggedIn user data
   
     const userAuthentication = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/auth/user",{
            method:"GET",
            headers:{
            Authorization:authorizationToken,
            },
        });
        if(response.ok){
            const data = await response.json();
            console.log("user data ", data.userData)
         setUser(data.userData);
         setIsLoading(false);
        }else{
          console.log("Error Fetching user data")
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data");
      }
     };
    //  to fetch the services data from the database
     const getServices = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/data/service",{
             method:"GET",
            });
            if(response.ok){
                const data = await response.json();
                console.log(data.message);
                setServices(data.message);
              }
        } catch (error) {
            console.log(`services frontend error: ${error}`);
          }
         
     }
     // to get all users data on admin pannel
    //  const getAllUsersData = async () => {   //connect to backend data in frontend
  //     try {
  //       const response = await fetch("http://localhost:5000/api/admin/users",{
  //         method: "GET",
  //         headers:{
  //             Authorization: authorizationToken,
  //         },
  //       });
      
  //       const data = await response.json();
  //       console.log(`users ${data}`);  
  //       setUsers(data);
        
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };

     useEffect(() =>{
        getServices();
        userAuthentication();
        // getAllUsersData();
    
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[]);

    return (
    <AuthContext.Provider value={{ isLoggedIn,storeTokenInLS,LogoutUser, user , services , authorizationToken, isLoading, }}>
        {children}
    </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () =>{
    const  authContextValue =  useContext (AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};