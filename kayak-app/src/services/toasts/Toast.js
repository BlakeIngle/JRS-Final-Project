import React, { useEffect } from 'react'
import './Toast.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheck,
    faTimes,
    faInfoCircle,
    faExclamationTriangle,
    faCircleXmark,
    faCircleCheck
} from "@fortawesome/free-solid-svg-icons";



export default function Toast({ id, severity, summary, details, isLingering, removeToast }) {

    let icon;
    if (severity == "Success") {
        icon = faCircleCheck;
    } else if (severity == "Error") {
        icon = faCircleXmark;
    } else if (severity == "Warning") {
        icon = faExclamationTriangle;
    } else if (severity == "Info") {
        icon = faInfoCircle;
    }

    useEffect(() => {
        if (!isLingering) {
            setTimeout(() => {
                removeToast(id);
            }, 3000)
        }
    }, []);



    return (
        <div className={`
                toast-root 
                ${severity} 
                ${isLingering && "lingering"}
            `}>
            <div className="icon">
                <FontAwesomeIcon size="2x" icon={icon} />
            </div>
            <div className='message'>
                <h4 className="summary">{summary || severity}</h4>
                <span className="details">{details}</span>
            </div>
            <div className="x-button"
                onClick={() => {
                    removeToast(id);
                }}
            >
                <FontAwesomeIcon icon={faTimes} />

            </div>
        </div>
    );
}
