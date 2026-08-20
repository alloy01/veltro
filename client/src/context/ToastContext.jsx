import { createContext, useState, useRef, useEffect } from "react";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {

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

    return(
        <ToastContext.Provider
            value={{
                toast,
                setToast,
                showToast
            }}
        >
            { children }
        </ToastContext.Provider>
    );
}