import {Link,Outlet,useLocation,useNavigate} from 'react-router-dom'
import { LogOut,LayoutDashboard,User,BookOpen,CalendarCheck,ClipboardList,FileText,CreditCard,Library,Clock,MessageSquare,Bell,Briefcase,Star,Settings,GraduationCap } from 'lucide-react'
import {useEffect, useState} from 'react'
import api from '../api.js'
function Dashboard(){
    const navigate=useNavigate()
    const loc=useLocation()
    const [Page,setPage]=useState("Dashboard")
    const [name,setName]=useState("")
    const menuItems = [
        { name: 'Dashboard', path: '/StudentDashboard/MainDashboard', icon: LayoutDashboard },
        { name: 'Profile', path: '/StudentDashboard/Profile', icon: User },
        { name: 'Timetable', path: '/StudentDashboard/Timetable', icon: Clock },
        { name: 'Attendance', path: '/StudentDashboard/StudentAttendance', icon: CalendarCheck },
        { name: 'Exams', path: '/StudentDashboard/Exams', icon: ClipboardList },
        { name: 'LMS', path: '/StudentDashboard/StudentLMS', icon: FileText },
        { name: 'Fees', path: '/StudentDashboard/Fees', icon: CreditCard },
        { name: 'Library', path: '/StudentDashboard/Library', icon: Library },
        { name: 'Messages', path: '/StudentDashboard/Messages', icon: MessageSquare, badge: 3 },
        { name: 'Notices', path: '/StudentDashboard/Notices', icon: Bell },
        { name: 'Placement', path: '/StudentDashboard/Placement', icon: Briefcase },
        { name: 'Feedback', path: '/StudentDashboard/Feedback', icon: Star },
        { name: 'Settings', path: '/StudentDashboard/Settings', icon: Settings },
    ];
    const handleLogout=()=>{
        localStorage.clear()
        navigate('/',{replace:true})
    }
    useEffect(()=>{
        
        const fetchName=async()=>{
        try{
            const response=await api.get('student/profile/name')
            if (loc.pathname === "/StudentDashboard/Profile") {
                return; 
            }
            if(response.data=="Profile Incomplete"){
                alert("Your Profile is Incomplete Complete Profile")
                navigate("/StudentDashboard/Profile")
            }
            else{
                let Sname=response.data.split(" ")
                Sname=Sname[0]
                
                setName(Sname)
            }
        }
        catch(err){
                console.error("Some Error Occured:-",err)
        }
    }
    const fetchSemester=async()=>{
            try{
                const response=await api.get("/student/course/name")
                localStorage.setItem("course",response.data)
            }
            catch(err){
                console.log(err)
            }
    }
        fetchSemester()
    fetchName();
    
    },[navigate])


    return(
        <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
            {/*Side Bar */}
            <aside className="w-60 flex h-full border-r border-gray-200 shadow-sm select-none ">{/*aside for sidebar */}
                <div className="w-20 bg-purple-500 text-white flex flex-col h-full items-center">
                    <div className='h-20 bg-purple-300 justify-center items-center pt-9'>
                        <GraduationCap className="w-20 h-7"/>
                    </div>
                    <div className="flex-1 w-full pt-4 pl-2 space-y-1">
                        {
                            menuItems.map((item)=>{
                                const Icon=item.icon
                                const isActive = loc.pathname === item.path || 
                                (item.name === 'Dashboard' && loc.pathname === '/StudentDashboard');
                                return(
                                    <div key={item.name} className={`h-12 flex items-center justify-center rounded-l-xl transition-all duration-200 ${isActive?'bg-purple-300 text-white scale-105' : 'text-black-200 hover:text-white' }`}>
                                        <Icon className='w-20 h-7'/>

                                    </div>
                                )
                            })
                        }

                    </div>
                    
                </div>
                <div className="flex-1 bg-white flex flex-col h-full">
                     <div className='h-20 flex justify-center items-center pt-7'>
                        <span className='text-xl pr-3'>Student</span><span className='text-xl text-purple-500'>Erp</span>
                    </div>
                    <div className='flex-1 pt-4 pr-4 space-y-1 font-m'>
                        {
                            menuItems.map((items)=>{
                                const isActive = loc.pathname === items.path || 
                                (items.name === 'Dashboard' && loc.pathname === '/StudentDashboard');
                                
                                return(
                                    <Link key={items.name} to={items.path} className={`h-12 flex items-center justify-between pl-3 rounded-r-xl text-sm transition-all duration-200 ${
                                        isActive?'bg-purple-500 text-white font-bold shadow-md shadow-blue-500/20 ':'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                                    }`} onClick={()=>setPage(items.name)}>
                                        <span>{items.name}</span>
                                    </Link >
                                )
                            })
                        }

                    </div>
                    
                </div>


            </aside>
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <header className="h-16 bg-white justify-between border-b border-gray-300 flex items-center px-6">
                    <span className='text-xl text-bold'>
                       {Page}
                    </span>
                    
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-white hover:bg-purple-500 rounded-lg transition-all duration-200">
                        <LogOut className='w-4 h-4'/>
                        <span>Logout</span>
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto p-2">
                    <Outlet context={{name}}/>
                </main>

            </div>
            
        </div>
    )
}
export default Dashboard