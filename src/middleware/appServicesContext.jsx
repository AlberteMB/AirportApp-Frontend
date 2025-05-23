import React, { createContext, useContext } from "react";
import Services from "./services";

// Create a context for the app services
const AppServicesContext = createContext(Services);

// Custom hook to use the app services context
export const useAppServices = () => {
    return useContext(AppServicesContext);
};

// Provider for the app services context
export const AppServicesProvider = ({ children }) => {
    return(
        <AppServicesContext.Provider value={Services}>
            {children}
        </AppServicesContext.Provider>  
    );
};

export default AppServicesContext;