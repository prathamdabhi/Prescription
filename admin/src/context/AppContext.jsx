import { createContext } from "react";

export const AppContext = createContext()

const AppProvider = (props) =>{

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        return age
    }
    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const slotDateFormate = (slotDate) => {
      const dateArreay = slotDate.split('_');
      return dateArreay[0] + ' ' + months[Number(dateArreay[1] - 1)] + " " + dateArreay[2]   
    }
    const value = {
        calculateAge,
        slotDateFormate,
        currencySymbol,
        backendUrl
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider