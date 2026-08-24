import { useState, useRef, useEffect, useContext } from "react";
import api from "../api/axios";
import Toast from "./Toast";
import { ToastContext } from "../context/ToastContext";

const DashField = ({ setLoadedDocs }) => {

    const {toast, setToast, showToast} = useContext(ToastContext);

    // modify state like "edit item" will help us to what input fields to show when user clicks modify buttons
    const [modifyState,setModifyState] = useState(null);
    
    // modes to avoid typos
    const modifyMode ={
        ADD: "add",
        EDIT: "edit",
        FILTER: "filter",
        DELETE: "delete"
    }

    // handle submit button
    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const payload = formData;

            const response = await api.post(`/item/${modifyState}`, payload);

            if(response.data){
                setFormData({
                    item_name: "",
                    item_quantity: "",
                    item_category: "",
                    item_unit: "Pieces",
                    item_desc: "",
                    item_filter_field: "",
                    item_filter_param: "",
                    item_status: "",
                    item_supplier: "",
                    item_costprice: ""
                })

                // reload the window when api is successful but if we reload the page when data for filter arrives then it vanishes so we don't reload

                if(response.data.success && modifyState != modifyMode.FILTER){
                    window.location.reload()
                }
                
                if(modifyState == modifyMode.FILTER){
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
        item_status: "",
        item_supplier: "",
        item_costprice: ""
    })

    // controlled imput
    const handleChange = (e) => {
        const {name, value} = e.target;

        // to use numbers as number in backend not as string
        const numericFields = ["item_quantity", "item_costprice"];

        setFormData((prevData) => ({
            ...prevData,
            [name]: numericFields.includes(name)
                ? value === "" ? "" : Number(value)
                : value
        }));
    }

    return(

        <div className="flex w-full flex-col gap-y-6 items-center lg:max-w-fit">

            <Toast toastBlock = { toast.visible } toastMessage={ toast.message }/> 

            {/* modify buttons */}
            <div className="h-fit bg-slate-400/10 border border-stone-100/20 rounded-2xl px-4 py-4 text-nowrap sm:w-md">
                <div className="text-center">
                    <p className="text-stone-200 text-lg whitespace-nowrap underline-offset-8 underline">Modify item
                    </p>
                </div>
                <div className="text-center text-stone-200 mt-4 grid justify-items-center grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-y-3">
                    <button className="cursor-pointer py-0.5 px-2 border md:border-2 w-48" onClick={() => {
                        if(modifyState === modifyMode.ADD){
                            setModifyState(null);
                        }
                        else{
                            setModifyState(modifyMode.ADD);  
                        }
                    }}>
                    {`Add item >`}
                    </button>
                    <button className="cursor-pointer py-0.5 px-2 border md:border-2 w-48" onClick={() => {
                        if(modifyState === modifyMode.EDIT){
                            setModifyState(null);
                        }
                        else{
                            setModifyState(modifyMode.EDIT);  
                        }
                    }}>
                    {`Edit item >`}
                    </button>
                    <button className="cursor-pointer py-0.5 px-2 border md:border-2 w-48" onClick={() => {
                        if(modifyState === modifyMode.FILTER){
                            setModifyState(null);
                        }
                        else{
                            setModifyState(modifyMode.FILTER);  
                        }
                    }}>
                    {`Filter item >`}
                    </button>
                    <button className="cursor-pointer py-0.5 px-2 border md:border-2 w-48" onClick={() => {
                        if(modifyState === modifyMode.DELETE){
                            setModifyState(null);
                        }
                        else{
                            setModifyState(modifyMode.DELETE);  
                        }
                    }}>
                    {`Delete item >`}
                    </button>
                </div>
            </div>

            {/* modify items content area */}
            <div className={`bg-slate-400/10 border border-stone-100/20 rounded-2xl w-full max-w-lg py-2 pb-4 gap-y-4 flex-col ${modifyState !== null ? "flex" : "hidden"}`}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <p className="text-center text-stone-200">{modifyState} item</p>
                        </div>
                        <div className="px-4 flex flex-col gap-y-2">
                            <input type="text" name="item_name" placeholder="enter item name." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == modifyMode.FILTER ? "hidden" : "block"}`} value={formData.item_name} onChange={handleChange}/>

                            <input type="number" name="item_quantity" placeholder="enter quantity." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == modifyMode.ADD || modifyState == modifyMode.EDIT ? "block" : "hidden"}`} value={formData.item_quantity} onChange={handleChange}/>

                            <input type="text" name="item_category" placeholder="enter category." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == modifyMode.ADD || modifyState == modifyMode.EDIT ? "block" : "hidden"}`} value={formData.item_category} onChange={handleChange}/>

                            <input type="text" name="item_supplier" placeholder="enter supplier." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == modifyMode.ADD || modifyState == modifyMode.EDIT ? "block" : "hidden"}`} value={formData.item_supplier} onChange={handleChange}/>

                            <input type="text" name="item_costprice" placeholder="enter costprice." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == modifyMode.ADD || modifyState == modifyMode.EDIT ? "block" : "hidden"}`} value={formData.item_costprice} onChange={handleChange}/>

                            <input type="text" name="item_desc" placeholder="enter desc." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == modifyMode.ADD || modifyState == modifyMode.EDIT ? "block" : "hidden"}`} value={formData.item_desc} onChange={handleChange}/>

                            <input name="item_status" placeholder="enter status." id="item_status" className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == modifyMode.ADD || modifyState == modifyMode.EDIT ? "block" : "hidden"}`} value={formData.item_status} onChange={handleChange}/>

                            <input type="text" name="item_unit" placeholder="enter unit." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == modifyMode.ADD || modifyState == modifyMode.EDIT ? "block" : "hidden"}`} value={formData.item_unit} onChange={handleChange}/>

                            <input type="text" name="item_filter_field" placeholder="enter field." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == modifyMode.FILTER ? "block" : "hidden"}`} value={formData.item_filter_field} onChange={handleChange}/>

                            <input type="text" name="item_filter_param" placeholder="enter parameter." className={`outline-0 py-1 text-slate-300 font-mono w-max ${modifyState == modifyMode.FILTER ? "block" : "hidden"}`} value={formData.item_filter_param} onChange={handleChange}/>
                        </div>

                        <div className="min-w-max flex justify-center mt-4">
                            <button type ="submit" className=" border md:border-2 border-slate-100 px-8 py-1 cursor-pointer text-stone-200 w-fit self-center">
                                Done
                            </button>
                        </div>
                    </form>
            </div>
        </div>
    )
}

export default DashField;