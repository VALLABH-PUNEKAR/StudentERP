import { useOutletContext } from "react-router-dom"

function SNotes(){
    const {sub}=useOutletContext()
    return(
        <div className="flex flex-col p-10">
            <label className="text-xl ">Notes of {sub}</label>
        </div>
    )

}
export default SNotes