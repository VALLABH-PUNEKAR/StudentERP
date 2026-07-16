import { useOutletContext } from "react-router-dom"

function FmainDashboard(){
    const {name}=useOutletContext()
    return(
        <div>
            <h1>Hello {name}</h1>
        </div>
    )
}
export default FmainDashboard