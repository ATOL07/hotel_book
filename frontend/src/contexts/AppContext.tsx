import React, { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { loadStripe, Stripe } from "@stripe/stripe-js";

// Environment variable for Stripe public key
const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

// Define the types for toast messages
type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
};

// Define the AppContext type
type AppContextType = {
    showToast: (message: ToastMessage) => void;
    isLoggedIn: boolean;
    isAdmin: boolean;
    stripePromise: Promise<Stripe | null>;
};

// Create the AppContext
const AppContext = createContext<AppContextType | undefined>(undefined);

// Initialize the Stripe promise
const stripePromise = loadStripe(STRIPE_PUB_KEY);

// AppContextProvider Component
export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    const [isAdmin, setIsAdmin] = useState(false);

    // Use the validateToken API to determine login and role status
    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
        onSuccess: (data) => {
            // Assuming the API returns user details including the role
            setIsAdmin(data.role === "admin");
        },
    });

    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => setToast(toastMessage),
                isLoggedIn: !isError,
                isAdmin, // Pass admin status
                stripePromise,
            }}
        >
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(undefined)}
                />
            )}
            {children}
        </AppContext.Provider>
    );
};

// Hook to use AppContext
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
};
