import {User,ArrowRight,Dot,ArrowLeft} from 'lucide-react'
import {Outlet,Link,useLocation,useNavigate} from 'react-router-dom'
import {useState} from 'react'
function AddStudents(){
    const location=useLocation()
    const navigate=useNavigate()

    const [form,setForm]=useState({id:"",email:"",password:"",batch:"",course:"",institue:""})
   
    let back=0
    let page=false
    const menuItems = [
        { name: 'Credentials', path: '/FacultyDashboard/AddStudents/Credentials'},
        { name: 'Allot Batch', path: '/FacultyDashboard/AddStudents/StudentBatch'},
        { name: 'Review and Submit', path: '/FacultyDashboard/AddStudents/SubmitStudent'},
        
    ];
    const item=menuItems.findIndex(item=>location.pathname===item.path)
    const activePage=item!==-1?item+1:1
    
    if(activePage>1){
        page=true

    }
    else{
        page=false
    }
  
    const handleNext=()=>{
        if (activePage < menuItems.length) {
            
            navigate(menuItems[activePage].path);
        } else {
            
            console.log("Submitting final wizard payload data...");
        }


    }
     const handleBack=()=>{
        
        back=activePage-2
       
        if (activePage !==-1) {
            
            navigate(menuItems[back].path);
        } else {
            
            console.log("Submitting final wizard payload data...");
        }


    }

    return(
        <div className="flex flex-col bg-white h-full rounded-2xl p-10 items-center gap-5">
           <div className='flex'>
                <label className='pr-5 text-3xl text-purple-500'>Add Student</label><User className='h-10 w-10'></User>
            </div>
            <div className='flex gap-2  w-full items-center justify-center'>
                {
                    menuItems.map((item,index)=>{
                         let stepNumber=index+1
                         let isActive=stepNumber===activePage
                            
                           
                            return( 
                          
                            <div className={"flex gap-5 p-2 items-center justify-center "}>
                                <label className={`flex w-10 h-10 rounded-lg items-center justify-center font-semibold text-sm transition-all duration-200 ${
                                isActive ? 'bg-purple-500 text-white shadow-sm' : 'bg-gray-300 text-gray-700'
                            }`}>{index+1}</label>
                                <label>{item.name}
                                </label>
                                  <ArrowRight/>
                             
                            </div>
                            )
                    })
                }

            </div>
            <div className='flex p-10 h-350'>
                <Outlet context={{form,setForm}}/>
            </div>
            
                <div className=" justify-between flex items-center gap-100">
                    <div  className={`flex  rounded-lg items-center justify-center w-25 p-2 gap-3 ${page?'bg-purple-400':'bg-white'}`}>
                        <button hidden={!page} className='text-xl text-white' onClick={handleBack} >
                            <div className='flex gap-2'>
                                 <ArrowLeft  className='bg-white rounded-lg text-black'/>
                                 Back
                            </div>
                        </button>
                    </div>
                    
                    <div className='flex bg-purple-400 rounded-lg items-center justify-center w-40 p-2 gap-3'>
                        <button className='text-xl text-white' onClick={handleNext} >
                            <div className='flex gap-2'>
                                Next Step
                                 <ArrowRight className='bg-white rounded-lg text-black'/>

                            </div>
                            
                        </button>
                       
                    </div>
                </div>

            
            
        </div>
    )
}
export default AddStudents