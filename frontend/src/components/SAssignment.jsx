import { useOutletContext } from "react-router-dom"

function Assignment(){
    const {sub}=useOutletContext()
    return(
        <div className="flex flex-col p-10">
            <div className="border-b border-gray-300 h-18">
                <label className="text-xl">Assignment of {sub}</label>
                

            </div>
        </div>
    )
}
export default Assignment