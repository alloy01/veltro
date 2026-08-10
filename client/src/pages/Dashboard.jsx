import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext.jsx"
import api from "../api/axios.js";
import Toast from "../components/Toast.jsx";
import DashHeader from "../components/DashHeader.jsx";
import DashTable from "../components/DashTable.jsx";
import DashField from "../components/DashField.jsx";

const Dashboard = () => {
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

    // loaded docs state
    const [loadedDocs, setLoadedDocs] = useState(null);

    // fetching the latest 50 documents on login
    const fetchDocs = async () => {
        try{
            const response = await api.get("/item/fetch-docs");
            
            // showing message in the toast
            showToast(response.data.message);
            setLoadedDocs(response.data.payload);

        }
        catch(err){
            // showing error in the toast
            showToast(err.message);
        }
    }

    // react hook to fetch whenever dashboard mounts
    useEffect(() => {
        fetchDocs();
    }, []);

    return(
        <div className="bg-black min-h-screen relative overflow-hidden">
            
            <DashHeader />

            <Toast
            toastBlock={toast.visible}
            toastMessage={toast.message}
            />

            {/* area for item list and modify */}
            <div className=" h-auto w-screen font-mono px-16 flex gap-x-4">

                {/* modify items component */}
                <DashField setLoadedDocs = { setLoadedDocs }/>

                {/* items content */}
                <DashTable loadedDocs={ loadedDocs }/>

            </div>
        </div>
    )
}

export default Dashboard