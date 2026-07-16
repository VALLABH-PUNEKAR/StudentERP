import {User,Edit2,Check,X} from 'lucide-react'
import { useEffect, useState } from 'react'
import api from '../api.js'

function FProfile(){
    const initialForm = {suffix:"",fname:"",mname:"",lname:"",gender:"",mobile:"",dob:"",emp_id:"",aadhar_no:"",office_address:"",designation:"",department:"",qualification:"",specialization:"",bio:"",institute:""}
    const [form,setFrom]=useState(initialForm)
    const [edit,setEdit]=useState(false)
    

    const fetchData=async()=>{
         try{
                const id=await api.get("/faculty/id")
                setFrom(prev=>({
                    ...prev,
                    emp_id:id.data
                }))
                const response=await api.get("/faculty/profile")
                

                const data=response.data
                const nameParts=data.name?data.name.split(" "):[]
                const depts=data.department
             
                const departments=depts.join(', ');
                
                setFrom({
                    ...data,
                    department:departments,
                    
                    suffix:nameParts[0]||"Mr",
                    fname:nameParts.length>3?nameParts[1]:"",
                    mname:nameParts.length>2?nameParts[2]:"",
                    lname:nameParts.length>1?nameParts[nameParts.length-1]:""

                })

            }
            catch(err){
                setEdit(!edit)
                console.error("Error:",err)
            }


    }
    useEffect(()=>{
        fetchData()
    },[])
    const handleSave= async()=>{
        if(edit){
            try{
                const payload={
                    ...form,
                    name:`${form.suffix} ${form.fname} ${form.mname} ${form.lname}`.replace(/\s+/g, ' ').trim()
                }
                await api.post("/faculty/profile",payload)
                await fetchData()
            }
            catch(err){
                alert(`Some error Occured: ${err}`)
            
            }
        }
        setEdit(!edit)
    }
    const handleChange=(e)=>{
        const {name,value}=e.target
        setFrom({
            ...form,
            [name]:value
        })
    }
    const handleDiscard=()=>{
        setFrom(initialForm)


    }

    return(

        <div  className="flex flex-col lg:flex-row justify-center items-start gap-8 p-10 max-w-7xl mx-auto min-h-[500px] ">
            <div className="relative w-full lg:w-80 flex-shrink-0 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 pt-16 mt-12 flex flex-col justify-between self-start">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative w-28 h-28 bg-gradient-to-tr from-purple-500 to-indigo-600 rounded-full p-1 shadow-lg border-4 border-white flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-blue-50 rounded-full flex items-center justify-center text-purple-500">
                            <User className="w-14 h-14 stroke-[1.5]" />
                        </div>
                    </div>
                
                </div>
                <div className='flex justify-center items-center p-5'>
                    <label>{form.suffix+" "+form.fname+" "+form.lname}</label>
                </div>
                <div className="flex flex-col justify-center items-center">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">BIO</label>
                        <textarea  name="bio" disabled={!edit} value={form.bio}  onChange={handleChange} className={`w-full min-h-[280px] px-3 py-2.5 border rounded-lg text-sm transition-all outline-none 
                       border-gray-200 bg-gray-50 text-gray-500 ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        } `}>
                        </textarea>
                    </div>
            </div>

            <div className="relative flex-1 w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-8 pt-12 mt-12 mb-12">
                
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-800">{/*form.fname*/}</h2>
                    <p className="text-2xl text-gray-400 font-medium">Faculty Profile</p>
                    
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Suffix</label>
                        <select disabled={!edit} name="suffix" value={form.suffix} onChange={handleChange}
                        className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                        </select>
                        

                    </div>
                    <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">First Name</label>
                        <input type="text" name="fname" value={form.fname} onChange={handleChange} disabled={!edit}   className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Middle Name</label>
                        <input type="text" name="mname" value={form.mname} onChange={handleChange} disabled={!edit}    className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Last Name</label>
                        <input type="text" name="lname" value={form.lname} onChange={handleChange} disabled={!edit}    className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Gender</label>
                        <input type="text" name="gender" value={form.gender} onChange={handleChange} disabled={!edit}    className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Mobile Number</label>
                        <input type="text" name="mobile" value={form.mobile} onChange={handleChange}disabled={!edit}    className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Date of Birth</label>
                        <input type="date" name="dob" value={form.dob} onChange={handleChange} disabled={!edit}   className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     
                     
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Employee Id</label>
                        <input type="text" name="emp-id" disabled={true} value={form.emp_id} onChange={handleChange}  className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     
                    
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Aadhaar Card Number</label>
                        <input type="text" name="aadhar_no" disabled={!edit} value={form.aadhar_no} onChange={handleChange}   className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Office Address</label>
                        <input type="text" name="office_address" disabled={!edit} value={form.office_address} onChange={handleChange}   className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Designation</label>
                        <input type="text" name="designation" disabled={!edit}  value={form.designation} onChange={handleChange} className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Department</label>
                        <input type="text" name="department" disabled={true} value={form.department} onChange={handleChange}   className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none
                        border-gray-200 bg-gray-50 text-gray-500  cursor-not-allowed${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Qualification</label>
                        <input type="text" name="qualification" disabled={!edit} value={form.qualification} onChange={handleChange}   className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none 
                       border-gray-200 bg-gray-50 text-gray-500  ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>
                    </div>
                    <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Specialization</label>
                        <input type="text" name="specialization" disabled={!edit} value={form.specialization} onChange={handleChange}  className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none 
                       border-gray-200 bg-gray-50 text-gray-500  ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>
                    </div>
                    <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Institute</label>
                        <input type="text" name="institute" disabled={!edit} value={form.institute} onChange={handleChange}  className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none 
                       border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed`}>
                        </input>
                    </div>
                    
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex items-center gap-3">
                    {edit ? (
                        // ================= SHOWS WHEN IN EDIT MODE =================
                        <>
                        {/* Save Button */}
                        <button 
                        type="button" 
                        onClick={handleSave} 
                        className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-full text-sm font-bold tracking-wide shadow-md uppercase transition-all transform hover:scale-105 active:scale-95 cursor-pointer hover:bg-purple-700">
                            <Check className="w-4 h-4 stroke-[2.5]" />
                            <span>Save</span>
                        </button>

                        {/* Discard Button */}
                        <button 
                        type="button" 
                        onClick={() => setEdit(false)} // Simply turns off edit mode without saving
                        className="flex items-center gap-2 px-6 py-2.5 bg-red-400 text-gray-700 border border-gray-300 rounded-full text-sm font-bold tracking-wide shadow-sm uppercase transition-all transform hover:scale-105 active:scale-95 cursor-pointer hover:bg-gray-100">
                         <X className="w-4 h-4 stroke-[2.5]" />
                        <span>Discard</span>
                        </button>
                        </>
                    ) : (
                    // ================= SHOWS WHEN NOT IN EDIT MODE =================
                    <button 
                    type="button" 
                    onClick={() => setEdit(true)} // Turns on edit mode
                    className="flex items-center gap-2 px-8 py-2.5 bg-white text-gray-800 border border-gray-200 rounded-full text-sm font-bold tracking-wide shadow-md uppercase transition-all transform hover:scale-105 active:scale-95 cursor-pointer hover:bg-gray-50"
                    >
                        <Edit2 className="w-4 h-4 stroke-[2.5]" />
                    <span>Edit Profile</span>
                    </button>
                    )}
                </div>
                
                

                
            </div>
            

        </div>
    )
}
export default FProfile