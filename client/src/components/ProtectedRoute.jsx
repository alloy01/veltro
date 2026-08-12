import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export default function ProtectedRoute({children}){

    // fetching the value from the context to display the required things
    const {user,loading} = useContext(AuthContext);
    
    // if things are loading then show this
    if(loading){
        return(
            <div className="min-h-screen bg-black flex items-center justify-center">
                <p className="font-mono text-stone-200 text-2xl">loading...</p>
            </div>
        )
    }
    // if user is not present redirect them to auth page
    if(!user.id){
        return <Navigate to="/" replace />;
    }

    return children;
}