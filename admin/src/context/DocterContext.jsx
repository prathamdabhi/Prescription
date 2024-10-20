import { createContext } from "react";


export const DocterContext = createContext()

const DoctorProvider = (props)=>{

    const value = {

    }

    return(
        <DocterContext.Provider value={value}>
            {props.children}
        </DocterContext.Provider>
    )
}

export default DoctorProvider