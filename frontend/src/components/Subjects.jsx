import { useEffect ,useState} from 'react'
import {BookOpen,StickyNote,ListTodo} from 'lucide-react'
import { useOutletContext,Link } from 'react-router-dom'
import api from '../api.js'

function Subjects(){
    const {semName,SetSub}=useOutletContext()
    const [subs,setSubs]=useState([])
    const [sublen,setSublen]=useState(0)
    useEffect(()=>{
        
        const fetchSubject=async()=>{
            try{
                const response=await api.get("/lms/sem/sub",{params:{courseName:localStorage.getItem("course"),semester:semName}})
                setSubs(response.data)
                setSublen(response.data.length)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchSubject()
        SetSub("")
    

    },[semName])
    const getInitials=(subject)=>{
        const splitted_name=subject.split(' ')
        if(splitted_name.length>2){
            return splitted_name[0].charAt(0).toUpperCase()+splitted_name[1].charAt(0).toUpperCase() 
        }
        if(splitted_name.length==2){
            return splitted_name[0].charAt(0).toUpperCase()
        }
    }
    const handleSub=(e)=>{
        const change=e
        SetSub(change)
      
    }
    return(
        <div className='flex flex-col p-5'>
            <div className='flex flex-col h-18 border-b border-gray-300 '>
                <div>
                    <label className='text-xl'>Subjects Overview</label>
                </div>
                <div className='pt-2'>
                    <label className='text-gray-500 '>subjects:{sublen} </label>
                </div>
            </div>
            <div className='flex flex-col gap-5 p-3'>
                { 
                subs.map((subject)=>{
                    const name=getInitials(subject.subject_name)
                    return(
                        <div className='flex p-5 border border-gray-200 rounded-lg items-center w-full'>
                            <div className='flex flex-shrink-0 items-center justify-center bg-purple-600 text-white text-xl font-bold w-13 h-13 rounded-lg tracking-wider'>
                                {name}
                            </div>
                            <div className='pl-3 flex-1 min-w-0'>
                                Id:{subject.subject_id} {subject.subject_name}
                            </div>
                            <div className='flex flex-row ml-auto gap-10'>
                                
                                <Link to="/StudentDashboard/StudentLMS/StudentSyllabus" className='flex flex-col items-center justify-center ' onClick={()=>handleSub(subject.subject_name)}>
                                    <BookOpen className='bg-emerald-500 text-white rounded-lg w-10 h-10 p-2 hover:bg-green-400'/>
                                    <label className='text-sm'>Syllabus</label>
                                </Link>
                               
                               <Link to="/StudentDashboard/StudentLMS/Notes"className='flex flex-col items-center justify-center' onClick={()=>handleSub(subject.subject_name)}>
                                    <StickyNote className='bg-emerald-500 text-white rounded-lg w-10 h-10 p-2  hover:bg-green-400'/>
                                    <label className='text-sm'>Notes</label>
                               </Link>
                                <Link to="/StudentDashboard/StudentLMS/Assignment" className='flex flex-col items-center justify-center' onClick={()=>handleSub(subject.subject_name)}>
                                    <ListTodo className='bg-emerald-500 text-white rounded-lg w-10 h-10 p-2 hover:bg-green-400'/>
                                    <label className='text-sm'>Assignment</label>
                                </Link>
                                
                            </div>
                        </div>
                    )
                })
            }

            </div>
            
            
            
            
        </div>
    )
}
export default Subjects