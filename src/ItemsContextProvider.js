import React, { createContext, useState } from "react";
import { supabase } from "./client.js";

// Initializing context
export const ItemsContext = createContext();

export function ItemsContextProvider({ children }) {

  const SignIn = async (userData) => {

    try {
  
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      })

      if(error){
        alert(error);
        throw error;
      }

      

    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  const SignUp = async (userData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
          options : {
              data : {
                  username : userData.username
              }
          }
      })
      if (error) {
        console.error("Error during sign-up:", error.message);
        throw error;
      }
      
      await addUserDataToDatabase(data.user.id, userData.username, userData.email, userData.password);
      alert('please check email')
    } catch (error) {
    
      alert(error)
    }

  }

  const addUserDataToDatabase = async (user_id, user_name, email_add, password_) => {
    try {
      const {error} = await supabase
      .from("users")
      .insert([{userid : user_id, username : user_name, email : email_add, password : password_}]);

      if (!error){
        alert("data Added")
      }
      else{
        console.log(error);
      }
    } catch (error) {
      alert(error)
    }
  }

  const sendPasswordResetLink = async (email_add) => {
    try {
      const { data, error } = await supabase.auth
        .resetPasswordForEmail(email_add, {
          redirectTo : "http://localhost:3000/",
        })
      
        if(error){
          alert(error);
          throw error;
        }

        alert("reset link sent");

    } catch (error) {
      alert(error);
    }
  }

  const getUserId = async () => {
    try {
      const {data : {session}, error} = await supabase.auth.getSession();
      
      if(error){
        console.log(error);
        return;
      }

      return session ? session.user.id : null;
    } catch (error) {
      console.log(error);
    }
  }

  const getUserName = async (user_id) =>{
    const {data, error} = await supabase.from('users')
    .select('username')
    .eq('userid', user_id)
    .single()
    
    if(!error){
      return data.username;
    }
  }

  async function fetchExpensesData(userId) {
    const { data, error } = await supabase
      .from('expenses')
      .select('data')
      .eq('userid', userId)
      .single(); 
  
    if (error) {
      console.error('Error fetching expenses data:', error);
      return null;
    } else {
      console.log('Expenses data:', data);
      return data;
    }
  }

  async function addExpense(userId, formData) {
    const newExpense = {
        name: formData.name,
        amount: formData.amount,
        description: formData.description,
        category: formData.category,
    };

    // Fetch existing data for the user
    const { data: existingRecord, error: fetchError } = await supabase
        .from('expenses')
        .select('data')
        .eq('userid', userId)
        .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching existing data:', fetchError);
        return false;
    }

    // If there's existing data, ensure 'data' is an array
    let updatedData;
    if (existingRecord && existingRecord.data) {
        updatedData = [...existingRecord.data, newExpense];
    } else {
        updatedData = [newExpense];
    }

    // Save the updated data back to the database
    const { error: saveError } = existingRecord
        ? await supabase
              .from('expenses')
              .update({ data: updatedData })
              .eq('userid', userId)
        : await supabase
              .from('expenses')
              .insert([{ userid: userId, data: updatedData }]);

    if (saveError) {
        console.error('Error saving data:', saveError);
        return false;
    } else {
        return true;
    }
}


  return (
    <ItemsContext.Provider
      value={{
        SignUp,
        SignIn,
        sendPasswordResetLink,
        getUserId,
        getUserName,
        fetchExpensesData,
        addExpense
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}