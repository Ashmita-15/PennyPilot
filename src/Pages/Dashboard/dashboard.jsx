import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../../client";
import { ItemsContext } from "../../ItemsContextProvider";
import noti  from '../../res/noti.svg';
import './dashboard.css';

const Dashboard = () => {
    const { getUserId, getUserName, fetchExpensesData, addExpense } = useContext(ItemsContext);
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState({ username: '', expenses: [] });

    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        description: '',
        category: '',
    });

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserId();
            setUserId(id);
        };

        fetchUserId();
    }, [getUserId]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId !== null) {
                const uname = await getUserName(userId);
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    username: uname,
                }));
            }
        };

        fetchUserData();
    }, [getUserId, getUserName, userId]);

    useEffect(() => {
        const fetchUserExpenses = async () => {
            if (userId !== null) {
                const da = await fetchExpensesData(userId);
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    expenses: da || [],
                }));
            }
        };

        fetchUserExpenses();
    }, [userId, fetchExpensesData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    async function submit(e) {
        e.preventDefault();
        const success = await addExpense(userId, formData);
        if (success) {
            alert('Data added successfully');
            setUserData((prevUserData) => ({
                ...prevUserData,
                expenses: {
                    ...prevUserData.expenses,
                    data: [...(prevUserData.expenses?.data || []), formData]
                },
            }));
            setFormData({ name: '', amount: '', description: '', category: '' });
        } else {
            alert('Failed to add data');
        }
    }
    




    return(
        <div className="db">
           <header>
                <ul className="navbar">
                    <li>
                        <div className="profile-container">
                            <img className="profile" src="https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png" alt="Profile"/>
                            <div id="content">
                                <h2>Hello {userData.username}</h2>
                                <p>~Welcome Back~</p>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item">Login/Sign Up Page</li>
                    <li className="nav-item">Expense Tracker</li>
                    <li className="nav-item">Budget Goals</li>
                    <li className="nav-item">Dashboard</li>
                    <li>
                        <img className="bell" src={noti} alt="Notifications"/>
                    </li>
                </ul>
            </header>

            <div class="card">
        <div id="h22"><p id="balance">Total balance:</p>
        <p id="tot">$2000.00</p></div>
       <ul class="un"><li class="list"><span><img id="down" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpfNRmbe1yrZ-ZbWqv2TWLhjIJoUbih8lf2A&s"/></span></li> 
       
       <li><span id="inc">Income</span></li>
        <li>
            <img id="up" src="https://static-00.iconduck.com/assets.00/upwards-black-arrow-emoji-512x512-ddul96be.png"/></li>
       <li><p class="exp">Expenses</p></li></ul>
       <div class="income">$180.00</div>
       <div id="expense">$100.00</div>
       <div class="dot">...</div>
    </div>
            
    <div className="categor">
    <div className="category-header">
        <span>Categories</span>
    </div>
    <div className="category-wrapper">
        <ul className="category-list">
            <li className="images" data-category="Shopping">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJaojVoiDoVG9RwIURkmcco5mwFH6US-BHVw&s" alt="Category 1"/>
            </li>
            <li className="images" data-category="Food">
                <img src="https://toppng.com/uploads/preview/foodservice-appetizers-are-included-and-will-be-served-food-icon-png-red-11563041881pb0s3nwsgn.png" alt="Category 2"/>
            </li>   
            <li className="images" data-category="Clothing">
                <img src="https://cdn-icons-png.freepik.com/512/8488/8488204.png" alt="Category 3"/>
            </li> 
            <li className="images" data-category="Utility">
                <img src="https://static.vecteezy.com/system/resources/previews/022/039/834/non_2x/grocery-icon-style-vector.jpg" alt="Category 4"/>
            </li> 
            <li className="images" data-category="Others">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDd85q5gonmv1IKcJVDDrj7RXcAU0geVMaCQ&s" alt="Category 5"/>
            </li> 
        </ul>
    </div>
</div>


        <div className="expenses">
            <span>Add Expense</span>
        </div>
        <div className="container">
            <form id="expense-form" onSubmit={submit}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" required onChange={handleChange} value={formData.name} />
                <label htmlFor="amount">Amount:</label>
                <input type="number" name="amount" required onChange={handleChange} value={formData.amount} />
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" required onChange={handleChange} value={formData.description} />
                <label htmlFor="category">Category:</label>
                <select name="category" required onChange={handleChange} value={formData.category}>
                    <option value="" disabled>Select category</option>
                    <option value="Shopping">Food</option>
                    <option value="Food">Travel</option>
                    <option value="Clothing">Entertainment</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Other">Other</option>
                </select>
                <button className="add" type="submit">Add Expense</button>
            </form>
            <ul id="expense-list">
            {userData.expenses && userData.expenses.data && userData.expenses.data.length > 0 ? (
                userData.expenses.data.map((expense, index) => (
                    <li className="expense-item" key={index}>
                        <div className="icon">
                            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJaojVoiDoVG9RwIURkmcco5mwFH6US-BHVw&s" || 'default-icon.png'} alt="Icon" />
                        </div>
                        <div className="details">
                            <p className="name">{expense.name}</p>
                            <p className="description">{expense.description}</p>
                            <p className="category">{expense.category}</p>
                        </div>
                        <div className="amount">${expense.amount}</div>
                    </li>
                ))
            ) : (
                <h1>No expenses :(</h1>
            )}
        </ul>



        </div>

        </div>
    )
}

export default Dashboard;