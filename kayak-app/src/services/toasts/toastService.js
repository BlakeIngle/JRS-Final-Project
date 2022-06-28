import React, { createContext, useContext, useState } from 'react'
import Toast from './Toast'
import './Toast.css'

const ToastContext = createContext();
var id = 0;

export function ToastProvider({ children }) {

    const [toasts, setToasts] = useState([]);

    function removeToast(id) {
        //removes toast from array
        setToasts(toasts => {
            return toasts.filter(t => t.id !== id);
        })
    };

    return (
        <ToastContext.Provider value={{ toasts, setToasts }}>
            <ToastMessenger
                removeToast={removeToast}
                toasts={toasts}
            />
            {children}
        </ToastContext.Provider>
    )
}

export function useToasts() {

    const { toasts, setToasts } = useContext(ToastContext);

    function addToast(details, summary, severity, isLingering) {
        //add a toast to 'the array';
        let newToast = {
            id: id++,
            details,
            summary,
            severity,
            isLingering,
        }

        setToasts((toasts) => {
            return [...toasts, newToast]
        })

    }

    return {
        success: (detail, summary) => {
            let severity = 'Success'
            addToast(detail, summary, severity);
        },
        error: (detail, summary) => {
            let severity = 'Error'
            addToast(detail, summary, severity);
        },
        warning: (detail, summary) => {
            let severity = 'Warning'
            addToast(detail, summary, severity);
        },
        info: (detail, summary) => {
            let severity = 'Info'
            addToast(detail, summary, severity);
        },
        add: (detail, summary, severity, isLingering) => {
            addToast(detail, summary, severity || 'Success', !!isLingering)
        },
        clear: () => {
            setToasts([]);
        }
    };
}

function ToastMessenger({ toasts, removeToast }) {
    return (
        <div className='toasts-container'>
            {toasts?.map((toast, i) => (
                <Toast
                    key={toast.id}
                    {...toast}
                    removeToast={removeToast}
                />
            ))}
        </div>
    )
}

export default ToastMessenger;