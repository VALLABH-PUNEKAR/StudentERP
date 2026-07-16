import { useOutletContext } from "react-router-dom"

function Syllabus(){
    const {sub}=useOutletContext()
    return(
        <div className="flex flex-col p-5">
            <label className="text-xl">Syllabus of {sub}</label>
        </div>
    )
}
export default Syllabus