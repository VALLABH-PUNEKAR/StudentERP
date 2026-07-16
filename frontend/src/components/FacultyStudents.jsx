import {useNavigate} from 'react-router-dom'
import { useEffect,useState } from "react"
import api from '../api.js'
import {Plus} from 'lucide-react'

function FacultyStudents(){
    const [course,setCourse]=useState([])
    const role=localStorage.getItem("role")
    const navigate=useNavigate()
    const fetch_courses=async ()=>{
        try{
            const response=await api.get("faculty/courses")
            if(response.data){
                setCourse(response.data)
            }
            else{
                setCourse(["Default"])
            }

        }
        catch(err){
            console.log("Error:",err)
        }
    }
    useEffect(()=>{
        fetch_courses()
    },[])
    
    return(
        <div className="flex flex-col bg-white h-full rounded-xl items-center gap-7 p-5">
            <label className="p-5 text-2xl ">Students Details</label>
            <div className={`grid grid-cols-1 ${role=="Hod"?'md:grid-cols-3 gap-15':'md:grid-cols-2 gap-70'}`}>
                <div className="flex gap-5 w-100 h-20 bg-gray-100 items-center justify-center shadow-sm rounded-3xl">
                    <label className="text-xl ">Select Course</label>
                    <select className="border border-purple-300 rounded-lg w-40 ">
                        
                            {
                                course.map((course)=>(
                                    <option>{course}</option>
                                ))
                            }

                      

                    </select>
                </div>
                

                <div className="flex gap-5 w-100  h-20 bg-gray-100 items-center justify-center shadow-sm rounded-3xl">
                    <label className="text-xl ">Select Batch</label>
                    <select className="border border-purple-300 rounded-lg w-40 ">
                        <option>Default</option>

                    </select>
                </div>
                {
                    role=="Hod"&&
                    <div className="flex  gap-5 w-100  h-20 bg-gray-100 items-center justify-center shadow-sm rounded-3xl">
                        <button className="flex justify-center items-center hover:bg-purple-500 hover:text-white rounded-lg w-60 h-10" onClick={()=>navigate("/FacultyDashboard/AddStudents")}>
                            Add Student <Plus></Plus>
                           
                        </button>
                        
                        
                    </div>
                }


            </div>
            <div className="border h-full w-full rounded-2xl ">

            </div>
        </div>

    )
}
export default FacultyStudents