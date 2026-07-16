import { useState ,useEffect} from 'react';

import uimg from '../assets/Faculty.png';
import api from '../api.js'
import {Link,useNavigate} from 'react-router-dom'
function FacultLogin(){
    const [form, setForm] = useState({ Id: "", Password: "",Email:"",Role:"Faculty"});
    const [fid, setFid] = useState(true);
    const [fe, setFe] = useState(false);
    const [res,setRes]=useState(false);
    const [message,setMessage]=useState("")
    const navigate=useNavigate();
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const request=await api.post('/login',form)
            const {token,role}=request.data
            if(token && role=="Faculty" || role=="Hod"){
                localStorage.setItem("userToken",token)
                localStorage.setItem("role",role)
                setRes(true)
                setMessage("Login SuccessFull")
                
                navigate('/FacultyDashboard')
                
            }
            else{
                setRes(true)
                setMessage("Invalid User name or Password")
            
            }
        }
        catch(err){
            console.log("Server error",err)
            if (err.response && err.response.status === 401) {
                setRes(true);
                setMessage("Invalid Username or Password");
            } else {
            
                setRes(true);
                setMessage("Something went wrong. Please try again later.");
            }
        }
    };
    const changeField=()=>{
        setFid(!fid);
        setForm({Id:"",Password:"",Email:"",Role:"Faculty"})
        setFe(!fe);
       
    }
    return (
        <div className="flex min-h-screen">
            {/* Left Side: Welcome Message */}
            <div className="w-1/2 flex flex-col items-center justify-center bg-gray-50">
                    <h1 className="text-4xl font-extrabold text-purple-600">Welcome to Student ERP</h1>
                    <img src={uimg}
                    class="h-100 w-2/4 object-cover" alt="Background" />
                
            </div>
            {/* Right Side: Login Form */}
            <div className="flex w-1/2 bg-purple-500 items-center justify-center p-10">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                    {
                    res&&<div className="flex justify-center bg-green-200 font-bold text-blue-500 rounded-lg">
                        <label>{message}</label>

                    </div>
                    }
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Faculty Login</h2>
                    <form onSubmit={handleSubmit}>
                    {
                        fid&&<div className="mb-4">
                        <label className="mb-1 block text-sm font-medium text-gray-600">Enter Id:-</label>
                        <input 
                            type="text" 
                            name="Id" 
                            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-400"
                            value={form.Id} 
                            onChange={handleChange} 
                        />
                    </div>
                    }
                    {
                        fe&&<div className="mb-4">
                        <label className="mb-1 block text-sm font-medium text-gray-600">Enter Email:-</label>
                        <input 
                            type="text" 
                            name="Email" 
                            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-400"
                            value={form.Email} 
                            onChange={handleChange} 
                        />
                    </div>
                    }

                    <div className="mb-4">
                        <label className="mb-1 block text-sm font-medium text-gray-600">Enter Password:-</label>
                        <input 
                            type="password" 
                            name="Password" 
                            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-400"
                            value={form.Password} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="mb-4 flex items-center justify-center">
                        <label>Or</label>

                    </div>

                    {
                        fid&&<div className="mb-4 flex items-center justify-center">
                        <button 
                             type="button"
                            onClick={changeField} 
                            className="text-blue-600 font-medium hover:text-blue-800 hover:underline"
                        >
                        Login via email
                        </button>
                    </div>
                    }
                    {
                        fe&&<div className="mb-4 flex items-center justify-center">
                        <button 
                            type="button"
                            onClick={changeField} 
                            className="text-blue-600 font-medium hover:text-blue-800 hover:underline"
                        >
                        Login via Id
                        </button>
                    </div>
                    }
                    <button 
                        type="submit"
                        
                        className="mb-4 w-full bg-purple-600 text-white font-bold py-2 rounded-md hover:bg-purple-700 transition"
                    >
                        Login
                    </button>
                    </form>
                   

                   
                </div>
            </div>

            
        </div>
    )
}
export default FacultLogin