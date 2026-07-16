import {BookOpenCheck,StickyNotes} from 'lucide-react'
import {Outlet,Link,useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import api from '../api.js'

function StudentLMS(){
    const [sem,setSem]=useState([])
    const [sub,SetSub]=useState("")
    const [semdisplay,setSemDisplay]=useState("")
    const [semt,setSemT]=useState("")
    const navigate=useNavigate()
    useEffect(()=>{
        const fetchSemester=async()=>{
            try{
                const response=await api.get("/lms/sem",{params:{course_name:localStorage.getItem("course")}})
                setSem(response.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchSemester()
    },[])
    
    const callSubject=(e)=>{
        const sem_name=e.target.value
        if(sem_name=='select semester'){
            navigate("SubjectInitial")
            setSemDisplay("")
        }
        else{
            setSemDisplay("Semester "+sem_name+"-> ")
        
            setSemT(sem_name)

            navigate("Subjects")
        }
    }
    return(
        <div className="flex flex-col h-208 w-360 overflow-hidden bg-white p-10 rounded-lg">
            <label className='text-2xl'>{localStorage.getItem("course")+"->"+semdisplay+sub}</label>
            <label className='text-purple-500 pt-3 pb-3'>Select Semester or Subject</label>
            <div className='pb-3 border-b border-gray-400 '>
                <select className='w-35 border border-gray-200 rounded-lg ' onChange={callSubject}>
                    <option value='select semester'>Select Semester</option>
                    {
                        sem.map((semName)=>(
                            <option value={semName}>Semester {semName}</option>
                        ))
                    }
                </select>
            </div>
            <div className='h-4'>

            </div>
            <div className="border border-gray-200 h-full rounded-lg overflow-hidden shadow-lg">
                <Outlet context={{semName:semt,SetSub,sub}}/>
            </div>             
        </div>
    )

}
export default StudentLMS