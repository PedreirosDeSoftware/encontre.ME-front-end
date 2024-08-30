import { Navigate } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext"

const ProtectedRoute = ({children}) =>{
  const {account} = UseAuth();

  if(!account)
    return <Navigate to={"/login"} replace/>
  
  return children;

}

export default ProtectedRoute;