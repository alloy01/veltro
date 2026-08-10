import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import api from "../api/axios";

const DashHeader = () => {

    // to display username on dashboard
    const {username} = useContext(AuthContext);

    // intial toast setup
    const [toast, setToast] = useState({
        visible: false,
        message: ""
    })

    const showToast = (toastMessage) => {
        setToast({
            visible: true,
            message: toastMessage
        });

        setTimeout(() => {
            setToast({
                visible: false,
                message: ""
            })
        }, 3000);
    }

    // handling the logout button
    const logout = async () => {
        try{
            const resp = await api.post("/auth/logout");
            console.log(resp)
            window.location.reload();
        }
        catch(err){
            showToast(err.message);
            console.log(err)
        }
    }

    return(
        <div>
            {/* info bar */}
            <div className="py-8 px-8 flex-col flex items-center text-slate-100 gap-y-8 font-mono">
                <p className=" text-2xl">Veltro - Dashboard
                </p>
                <div className="flex justify-between w-full px-8">
                    <p className="text-xl">admin: {username}</p>
                    <button className=" border-2 border-stone-100 px-2 py-1 cursor-pointer" onClick={logout}>
                        logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DashHeader;