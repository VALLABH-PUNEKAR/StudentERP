import {Link,Outlet,useLocation,useNavigate} from 'react-router-dom'
import { LogOut,LayoutDashboard,User,BookOpen,CalendarCheck,ClipboardList,FileText,CreditCard,Library,Clock,MessageSquare,Bell,Star,Settings,GraduationCap,Users,ListTodo} from 'lucide-react'
import {useEffect, useState} from 'react'
import api from '../api.js'
function Dashboard(){
    const loc=useLocation()
    const navigate=useNavigate()
    const [Page,setPage]=useState("")
    const [name,setName]=useState("")
    const menuItems = [
        { name: 'Dashboard', path: '/FacultyDashboard/FmainDashboard', icon: LayoutDashboard },
        { name: 'Profile', path: '/FacultyDashboard/FProfile', icon: User },
        { name: 'Class Schedule', path: '/FacultyDashboard/Timetable', icon: Clock },
        {name:'Students',path:'/FacultyDashboard/FacultyStudents',icon:Users},
         {name:'Faculty',path:'/FacultyDashboard/FacultyList',icon:Users},
        { name: 'Attendance', path: '/FacultyDashboard/Attendance', icon: CalendarCheck },
        { name: 'Exams', path: '/FacultyDashboard/Exams', icon: ClipboardList },
        { name: 'LMS', path: '/FacultyDashboard/FacultyLMS', icon: FileText },
        { name: 'Library', path: '/FacultyDashboard/Library', icon: Library },
        { name: 'Messages', path: '/FacultyDashboard/Messages', icon: MessageSquare, badge: 3 },
        { name: 'Notices', path: '/FacultyDashboard/Notices', icon: Bell },
        { name: 'Report', path: '/FacultyDashboard/Placement', icon: ListTodo },
        { name: 'Feedback', path: '/FacultyDashboard/Feedback', icon: Star },
        { name: 'Settings', path: '/FacultyDashboard/Settings', icon: Settings },
    ];
    useEffect(()=>{
        const fetchName=async ()=>{
            try{
                const response=await api.get("faculty/profile/name")
                if(loc.pathname==="/FacultyDashboard/FProfile"){
                    return
                }
                if(response.data=="Profile Incomplete"){
                    alert("Your Profile is Incomplete Complete Profile")
                    navigate("/FacultyDashboard/FProfile")
                }
                else{
                    let fname=response.data.split(" ")
                    fname=fname[0]+" "+fname[1]
                    setName(fname)

                }

            }
            catch(e){
                console.log("Error",e)
            }

        }
        fetchName()

    },[navigate])
    const handleLogout=()=>{
        localStorage.clear()
        navigate('/', { replace: true });
    }


    return(
        <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
            {/*Side Bar */}
             <aside className="w-60 flex h-full border-r border-gray-200 shadow-sm select-none">{/*aside for sidebar */}
                <div className="w-20 bg-purple-500 text-white flex flex-col h-full items-center">
                    <div className='h-20 bg-purple-300 justify-center items-center pt-9'>
                        <GraduationCap className="w-20 h-7"/>
                    </div>
                    <div className="flex-1 w-full pt-4 pl-2 space-y-1">
                        {
                            menuItems.map((item)=>{
                               if(item.name=="Faculty" && localStorage.getItem("role")!="Hod"){
                                    return null
                                }
                                const Icon=item.icon
                                const isActive = loc.pathname === item.path || 
                                (item.name === 'Dashboard' && loc.pathname === '/FacultyDashboard');
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
                        <span className='text-xl pr-3'>Student</span>
                        <span className='text-xl text-purple-500'>Erp</span>
                    </div>
                    <div className='flex-1 pt-4 pr-4 space-y-1 font-m'>
                        {
                            menuItems.map((items)=>{
                                if(items.name=="Faculty" && localStorage.getItem("role")!="Hod"){
                                    return null
                                }
                                const isActive = loc.pathname === items.path || 
                                (items.name === 'Dashboard' && loc.pathname === '/FacultyDashboard');
                                
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
                    <span>
                        {Page}
                    </span>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-white hover:bg-purple-500 rounded-lg transition-all duration-200">
                        <LogOut className='w-4 h-4'/>
                        <span>Logout</span>
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet context={{name}}/>

                </main>

            </div>
            
        </div>
    )
}
export default Dashboard