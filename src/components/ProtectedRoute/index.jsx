import { Navigate } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext"

const ProtectedRoute = ({children}) =>{
  const {user} = UseAuth();

  if(!user)
    return <Navigate to={"/login"} replace/>
  
  return children;

}

export default ProtectedRoute;