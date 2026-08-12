import Auth from "../components/Auth.jsx"
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    // fetch the required vars from context
    const {user, loading} = useContext(AuthContext);

    // if loading show loading
    if(loading){
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <p className="font-mono text-stone-200 text-2xl">loading...</p>
            </div>
        )
    }
    // if user is already present i.e. user already has a token on it machine then redirect it to '/dashboard'
    if(user.id != null){
        return <Navigate to="/dashboard" />
    }

    return(
        <div className="bg-black h-screen">
            <Auth/>
        </div>
    )
}

export default Login