import { useContext, useState, useRef, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import api from "../api/axios";
import { ToastContext } from "../context/ToastContext";

const DashHeader = () => {

    // to display username on dashboard
    const {user} = useContext(AuthContext);

    const {toast, setToast, showToast} = useContext(ToastContext);

    // handling the logout button
    const logout = async () => {
        try{
            const resp = await api.post("/auth/logout");
            window.location.reload();
        }
        catch(err){
            showToast(err.response?.data?.message || 'Something went wrong.');
        }
    }

    return(
        <div>
            {/* info bar */}
            <div className="py-8 px-6 md:px-10 lg:px-16 flex-col flex items-center text-slate-100 gap-y-8 font-mono">
                <p className=" text-xl md:text-2xl">Veltro📦 - Dashboard
                </p>
                <div className="flex justify-between w-full items-center">
                    <p className="text-lg md:text-xl">admin: {user.name}</p>
                    <button className=" border md:border-2 text-base md:text-xl border-stone-100 px-2 py-1 cursor-pointer" onClick={logout}>
                        logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DashHeader;