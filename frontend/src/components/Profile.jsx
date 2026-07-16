import {User,Mail,Phone,CalendarRange,BookOpen,IdCard,Edit2,Check} from 'lucide-react'
import {useState,useEffect} from 'react'
import api from '../api.js'
function Profile(){
    const [edit,setEdit]=useState(false)
    const [form,setForm]=useState({name:"",fname:"",mname:"",lname:"",gender:"",mobile:"",dob:"",roll_no:"",pob:"",blood_grp:"",occupation:"",aadhar_no:"",pan_card_no:"",nationality:"",course:"",institute:""})
        const fetchData= async()=>{
            try{
                const response=await api.get("/student/profile")
                const data=response.data
                const nameParts=data.name?data.name.split(" "):[]
               
                setForm({
                    ...data,
                    fname:nameParts[0]||"",
                    mname:nameParts.length>2?nameParts[1]:"",
                    lname:nameParts.length>1?nameParts[nameParts.length-1]:" "

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
    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSave= async()=>{
        if(edit){
            try{
                const payload={
                    ...form,
                    name:`${form.fname} ${form.mname} ${form.lname}`.replace(/\s+/g, ' ').trim()
                }
                await api.post("/student/profile",payload)
                await fetchData()
            }
            catch(err){
                alert(`Some error Occured: ${err}`)
            
            }
        }
        setEdit(!edit)
    }
    

    return(
        <div className="flex flex-col justify-center items-center h-full bg-gray-150">
            <div className="relative w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-sm p-8 pt-16 mt-12">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative w-28 h-28 bg-gradient-to-tr from-purple-500 to-indigo-600 rounded-full p-1 shadow-lg border-4 border-white flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-blue-50 rounded-full flex items-center justify-center text-purple-500">
                            <User className="w-14 h-14 stroke-[1.5]" />
                        </div>
                    </div>
                </div>
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-800">{form.fname}</h2>
                    <p className="text-sm text-gray-400 font-medium">Student Profile</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">First Name</label>
                        <input type="text" name="fname" disabled={!edit} value={form.fname} onChange={handleChange} className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Middle Name</label>
                        <input type="text" name="mname" disabled={!edit} value={form.mname}  onChange={handleChange} className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Last Name</label>
                        <input type="text" name="lname" disabled={!edit} value={form.lname}  onChange={handleChange} className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Gender</label>
                        <input type="text" name="gender" disabled={!edit} value={form.gender}  onChange={handleChange} className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Mobile Number</label>
                        <input type="text" name="mobile" disabled={!edit} value={form.mobile}  onChange={handleChange} className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Date of Birth</label>
                        <input type="date" name="dob" disabled={!edit} value={form.dob}  onChange={handleChange} className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Place of Birth</label>
                        <input type="text" name="pob" disabled={!edit} value={form.pob}  onChange={handleChange} className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Roll No</label>
                        <input type="text" name="roll_no" disabled={!edit} value={form.roll_no}  onChange={handleChange} className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Blood Group</label>
                        <input type="text" name="blood_grp" disabled={!edit} value={form.blood_grp}  onChange={handleChange} className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Occupation</label>
                        <input type="text" name="occupation" disabled={!edit} value={form.occupation} onChange={handleChange} className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Aadhaar Card Number</label>
                        <input type="text" name="aadhar_no" disabled={!edit} value={form.aadhar_no}   onChange={handleChange} className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Pan Card Number</label>
                        <input type="text" name="pan_card_no" disabled={!edit} value={form.pan_card_no}   onChange={handleChange} className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Nationality</label>
                        <input type="text" name="nationality" disabled={!edit} value={form.nationality}  onChange={handleChange} className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none ${
                        edit ? 'border-purple-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-800' : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Course</label>
                        <input type="text" name="course" disabled={true} value={form.course}  onChange={handleChange} className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none
                        border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed`}>
                        </input>

                    </div>
                     <div className="space-y-1">
                        <label className="text-s font-semibold text-greay-500 tracking-wide block">Institute</label>
                        <input type="text" name="institute" disabled={!edit} value={form.institute}  onChange={handleChange} className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all outline-none 
                       border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed`}>
                        </input>
                    </div>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                        <button type="button" onClick={handleSave} className={`flex items-center gap-2 px-8 py-2.5 rounded-full text-sm font-bold tracking-wide shadow-md uppercase transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${edit?'bg-purple-500 text-white shadow-purple-500/20 hover:bg-purple-300':'bg-white text-black shadow-gray-300 hover:bg-purple-300'}`}>
                           {
                            edit?(
                                <>
                                <Check className="w-4 h-4 stroke-[2.5]"/>
                                <span>Save Changes</span>
                                </>
                            ):
                            (  
                                <>
                                <Edit2 className='w-4 h-4 stroke-[2.5]'/>
                                <span>Edit</span>
                                </>
                            )
                           }
                        </button>
                </div>
                
                
            </div>
            
        </div>
    )

}
export default Profile