'use Client';
import React, {createContext, useState, useContext, useEffect} from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
 const context = useContext(AuthContext);
 if (!context){
    throw new Error("useAuth must be used within an AuthProvider");
 }
 return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined' ){
        try{
            const userData = localStorage.getItem("user");
            if (userData && userData !== "undefined"){
                return JSON.parse(userData);
            }
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            if(typeof window !== 'undefined'){
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }   
        }
        return null;
    }});
    const [loading, setLoading] = useState(false);
    

    const register = async (name, email, password) => {
        try {
            console.log("Sending registration request for:", email);
            const response = await authAPI.register(name, email, password);
            console.log("Registration response:", response.data);
            
            const { token, user } = response.data;
            
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            
            return { success: true };
        } catch (error) {
            
            // Extract the actual error message
            let errorMessage = "Registration failed";
            
            if (error.response) {
                // Server responded with error status
                console.log("Error response data:", error.response.data);
                errorMessage = error.response.data?.message || "Registration failed";
            } else if (error.request) {
                // Request was made but no response
                errorMessage = "Cannot connect to server. Please check if backend is running.";
            } else {
                // Something else happened
                errorMessage = error.message || "Registration failed";
            }
        
            return { 
                success: false, 
                message: errorMessage 
            };
        }
    };

    const login = async (email, password) => {
        try {
            console.log("Sending login request for:", email);
            const response = await authAPI.login(email, password);
            console.log("Login response:", response.data);
            
            const { token, user } = response.data;
            
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            
            return { success: true };
        } catch (error) {
                        
            let errorMessage = "Login failed";
            
            if (error.response) {
                errorMessage = error.response.data?.message || "Login failed";
            } else if (error.request) {
                errorMessage = "Cannot connect to server. Please check if backend is running.";
            } else {
                errorMessage = error.message || "Login failed";
            }
            
            return { 
                success: false, 
                message: errorMessage 
            };
        }
    };

    const logout = () => {
        // Clear token and user from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Clear user state
        setUser(null);
     };

     const value = {
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user
     };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};