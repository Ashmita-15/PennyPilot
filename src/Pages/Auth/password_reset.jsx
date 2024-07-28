import React, { useContext, useState } from "react";
import './auth.css';
import { ItemsContext } from "../../ItemsContextProvider.js";


const PasswordReset = () => {
    const {sendPasswordResetLink} = useContext(ItemsContext);
    const [email, setEmail] = useState("");
    
    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    function sendLink(e){
        console.log(email);
        e.preventDefault();
        sendPasswordResetLink(email)
    }

 
    return (
        <div className="auth">
            <div className="form-container">
                <form id="loginForm" className="form" onSubmit={sendLink}>
                    <h2>Reset Password</h2>
                    <input type="email" name="email" placeholder="Email Address" required onChange={handleChange}/>
                    <button type="submit">Send Password Reset Link</button>
                </form>
            </div>
        </div>
    )
};

export default PasswordReset;
