import { useContext, useState, useRef, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import api from "../api/axios";

const DashHeader = () => {

    // to display username on dashboard
    const {user} = useContext(AuthContext);

    // intial toast setup
    const [toast, setToast] = useState({
        visible: false,
        message: ""
    })

    const toastTimer = useRef(null);

    const showToast = (toastMessage) => {
        setToast({
            visible: true,
            message: toastMessage
        });

        if(toastTimer.current){
            clearTimeout(toastTimer.current);
        }

        toastTimer.current = setTimeout(() => {
            setToast({
                visible: false,
                message: ""
            });

            toastTimer.current = null;
        }, 3000);
    }

    // cleanup toast so we don't leave any stale component
    useEffect(() => {
        return () => {
            if(toastTimer.current){
                clearTimeout(toastTimer.current);
            }
        }
    }, [])

    // handling the logout button
    const logout = async () => {
        try{
            const resp = await api.post("/auth/logout");
            window.location.reload();
        }
        catch(err){
            showToast(err.message);
        }
    }

    return(
        <div>
            {/* info bar */}
            <div className="py-8 px-8 flex-col flex items-center text-slate-100 gap-y-8 font-mono">
                <p className=" text-2xl">Veltro - Dashboard
                </p>
                <div className="flex justify-between w-full px-8">
                    <p className="text-xl">admin: {user.name}</p>
                    <button className=" border-2 border-stone-100 px-2 py-1 cursor-pointer" onClick={logout}>
                        logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DashHeader;