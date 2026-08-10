import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext.jsx"
import api from "../api/axios.js";
import Toast from "../components/Toast.jsx";
import DocsItem from "../components/DocsItem.jsx";

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

    // getting the username to show it on display
    const {username} = useContext(AuthContext);

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

    // handling the logout button
    const logout = async () => {
        try{
            await api.post("/auth/logout");
            window.location.reload();
        }
        catch(err){
            showToast(err.message);
        }
    }

    // handling operations buttons states
    const [addItem,setAddItem] = useState(false);
    const [editItem,setEditItem] = useState(false);
    const [deleteItem,setDeleteItem] = useState(false);
    const [filterItem,setFilterItem] = useState(false);

    // functions for handling modify buttons
    const handleModifyButtons = (modifyItem,setModifyItem,modifyState) => {
        if(modifyItem == false){
            setAddItem(false);
            setDeleteItem(false);
            setEditItem(false);
            setFilterItem(false);
            setModifyItem(true);
            setModifyState(modifyState)

        }else{
            setModifyItem(false);
        }
    }

    // modify state like "edit item" will help us to what input fields to show when user clicks modify buttons
    const [modifyState,setModifyState] = useState(null);

    // handle submit button
    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const payload = formData;

            const response = await api.post(`${import.meta.env.VITE_API_URL}/item/${modifyState}`, payload);

            if(response.data){
                setFormData({
                    item_name: "",
                    item_quantity: "",
                    item_category: "",
                    item_unit: "Pieces",
                    item_desc: "",
                    item_filter_field: "",
                    item_filter_param: "",
                    item_status: "In Stock",
                    item_supplier: "",
                    item_costprice: ""
                })

                // reload the window when api is successful but if we reload the page when data for filter arrives then it vanishes so we don't reload

                if(response.data.success && modifyState != 'filter'){
                    window.location.reload()
                }
                
                if(modifyState == 'filter'){
                    setLoadedDocs(response.data.payload)
                }

                showToast(response.data.message);
            }
        }

        catch(err){
            // shows the error message in toast
            showToast(err.message);
        }
    }

    // inital form data
    const [formData, setFormData] = useState({
        item_name: "",
        item_quantity: "",
        item_category: "",
        item_unit: "Pieces",
        item_desc: "",
        item_filter_field: "",
        item_filter_param: "",
        item_status: "In Stock",
        item_supplier: "",
        item_costprice: ""
    })

    // controlled imput
    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    return(
        <div className="bg-black min-h-screen relative overflow-hidden">
            {/* info bar */}
            <div className="py-8 px-8 flex-col flex items-center text-slate-100 gap-y-8 font-mono">
                <p className=" text-2xl">Veltro - Dashboard
                </p>
                <div className="flex justify-between w-full px-8">
                    <p className="text-xl">user:{username}</p>
                    <button className=" border-2 border-slate-100 px-2 py-1 cursor-pointer" onClick={logout}>
                        logout
                    </button>
                </div>
            </div>

            <Toast
            toastBlock={toast.visible}
            toastMessage={toast.message}
            />

            {/* area for item list and modify */}
            <div className=" h-auto w-screen font-mono px-16 flex gap-x-4">

                {/* modify items component */}
                <div className="flex flex-col gap-y-6">

                    {/* modify items button component */}
                    <div className="h-fit bg-slate-400/10 border border-stone-100/20 rounded-2xl px-4 py-4 text-nowrap">
                        <div className="text-center">
                            <p className="text-stone-200 text-lg whitespace-nowrap underline-offset-8 underline">Modify item
                            </p>
                        </div>
                        <div className="text-center text-stone-200 mt-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-2">
                            <button className="cursor-pointer mb-2 px-2 border-2" onClick={() => {
                                handleModifyButtons(addItem,setAddItem,"add");
                            }}>
                            {`Add item >`}
                            </button>
                            <button className="cursor-pointer mb-2 px-2 border-2" onClick={() => {
                                handleModifyButtons(editItem,setEditItem,"edit");
                            }}>
                            {`Edit item >`}
                            </button>
                            <button className="cursor-pointer mb-2 px-2 border-2" onClick={() => {
                                handleModifyButtons(filterItem,setFilterItem,"filter");
                            }}>
                            {`Filter item >`}
                            </button>
                            <button className="cursor-pointer mb-2 px-2 border-2" onClick={() => {
                                handleModifyButtons(deleteItem,setDeleteItem,"delete");
                            }}>
                            {`Delete item >`}
                            </button>
                        </div>
                    </div>

                    {/* modify items content area */}

                    <div className={`bg-slate-400/10 border border-stone-100/20 rounded-2xl py-2 pb-4 px-2 gap-y-4 flex-col ${addItem || deleteItem || filterItem || editItem ? "flex" : "hidden"}`}>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <p className="text-center text-stone-200">{modifyState} item</p>
                                </div>
                                <div className="px-4 flex flex-col gap-y-2">
                                    <input type="text" name="item_name" placeholder="enter item name." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == "filter" ? "hidden" : "block"}`} value={formData.item_name} onChange={handleChange}/>

                                    <input type="number" name="item_quantity" placeholder="enter quantity." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == "add" || modifyState == "edit" ? "block" : "hidden"}`} value={formData.item_quantity} onChange={handleChange}/>

                                    <input type="text" name="item_category" placeholder="enter category." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == "add" || modifyState == "edit" ? "block" : "hidden"}`} value={formData.item_category} onChange={handleChange}/>

                                    <input type="text" name="item_supplier" placeholder="enter supplier." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == "add" || modifyState == "edit" ? "block" : "hidden"}`} value={formData.item_supplier} onChange={handleChange}/>

                                    <input type="text" name="item_costprice" placeholder="enter costprice." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == "add" || modifyState == "edit" ? "block" : "hidden"}`} value={formData.item_costprice} onChange={handleChange}/>

                                    <input type="text" name="item_desc" placeholder="enter desc." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == "add" || modifyState == "edit" ? "block" : "hidden"}`} value={formData.item_desc} onChange={handleChange}/>

                                    <input name="item_status" placeholder="enter status." id="item_status" className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == "add" || modifyState == "edit" ? "block" : "hidden"}`} value={formData.item_status} onChange={handleChange}/>

                                    <input type="text" name="item_unit" placeholder="enter unit." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == "add" || modifyState == "edit" ? "block" : "hidden"}`} value={formData.item_unit} onChange={handleChange}/>

                                    <input type="text" name="item_filter_field" placeholder="enter field." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == "filter" ? "block" : "hidden"}`} value={formData.item_filter_field} onChange={handleChange}/>

                                    <input type="text" name="item_filter_param" placeholder="enter parameter." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == "filter" ? "block" : "hidden"}`} value={formData.item_filter_param} onChange={handleChange}/>
                                </div>

                               <div className="min-w-max flex justify-center mt-4">
                                    <button type ="submit" className=" border-2 border-slate-100 px-8 py-1 cursor-pointer text-stone-200 w-fit self-center">
                                        Done
                                    </button>
                               </div>
                            </form>
                    </div>
                </div>

                {/* items content */}
                <div className="bg-slate-400/10 w-3/4 rounded-2xl border border-stone-100/20 h-fit py-2 px-4"> 
                    <div>
                        <p className="text-stone-200  underline-offset-8 underline text-center text-lg">Items</p>
                        <div className="py-4 overflow-x-auto">
                            {loadedDocs && loadedDocs.length > 0 ? (
                                <table className="w-full text-stone-200 font-mono">
                                    <thead>
                                        <tr className="border-b border-stone-500">
                                            <th className="text-left py-2 px-3">Name</th>
                                            <th className="text-left py-2 px-3">Category</th>
                                            <th className="text-left py-2 px-3">Quantity</th>
                                            <th className="text-left py-2 px-3">Unit</th>
                                            <th className="text-left py-2 px-3">Supplier</th>
                                            <th className="text-left py-2 px-3">Status</th>
                                            <th className="text-left py-2 px-3">Cost Price</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {loadedDocs.map((item) => (
                                            <DocsItem key={item._id} item={item} />
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-stone-300 text-center">
                                    No docs available.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard