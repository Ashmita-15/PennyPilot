import React, { useContext, useState } from "react";
import './auth.css';
import { ItemsContext } from "../../ItemsContextProvider.js";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [userData, setuserData] = useState({
        username : '',
        email : '',
        password : ''
    });

    const {SignUp, SignIn} = useContext(ItemsContext);

    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setuserData((prevUserData) => ({
            ...prevUserData,
            [name] : value
        }));
    };

    // async function addData(){
    //     await supabase.from('users').insert({})
    // }

    function sign_up(e){
        e.preventDefault();
        SignUp(userData);
        navigate("/")
    }

    function sign_in(e){
        e.preventDefault();
        SignIn(userData);
        navigate("/")
    }

    return (
        <div className="auth">
            <div className="hheader">
                <h1>Welcome to Penny Pilot</h1>
            </div>
            <div className="form-container">
                <div className="form-toggle">
                    <button 
                        className={isLogin ? "active" : ""} 
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button 
                        className={!isLogin ? "active" : ""} 
                        onClick={() => setIsLogin(false)}
                    >
                        Signup
                    </button>
                </div>
                
                {isLogin ? (
                    <form id="loginForm" className="form" onSubmit={sign_in}>
                        <h2>Login Form</h2>
                        <input type="email" name="email" placeholder="Email Address" required onChange={handleChange}/>
                        <input type="password" name="password" placeholder="Password" required onChange={handleChange}/>
                        <Link to="/reset-password"><a href="#" id="forgotPassword">Forgot password?</a></Link>
                        <button type="submit">Login</button>
                        <p>Not a member? <a href="#" onClick={toggleForm}>Signup now</a></p>
                    </form>
                ) : (
                    <form id="signupForm" className="form" onSubmit={sign_up}>
                        <h2>Signup Form</h2>
                        <input type="name" name="username" placeholder="Username" required onChange={handleChange}/>
                        <input type="email" name="email" placeholder="Email Address" required onChange={handleChange}/>
                        <input type="password" name="password" placeholder="Password" required onChange={handleChange}/>
                        <button type="submit">Signup</button>
                        <p>Already a member? <a href="#" onClick={toggleForm}>Login now</a></p>
                    </form>
                )}
            </div>
        </div>
    )
};

export default SignIn;
