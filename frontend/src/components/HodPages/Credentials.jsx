import { useOutletContext } from "react-router-dom"
import {useState} from 'react'
import {Check,X} from 'lucide-react'
function Credentials(){
    const {form,setForm}=useOutletContext()
    const [confirm_password,setConfirmPassword]=useState("")
    const isPasswordMatch = confirm_password.length > 0 && confirm_password === form.password
    const handleChange=(e)=>{
        const {name,value}=e.target
        setForm({
            ...form,
            [name]:value
            
        })
    }
    const password_check=(e)=>{
        const {value}=e.target
        setConfirmPassword(value)

    }
    return(
       
            <div className='flex flex-col h-full bg-gray-100 rounded-4xl'>
                <div className='flex flex-col p-7 items-center justify-center'>
                    <label className='text-xl '>Enter Id/RollNo of Student</label>
                    <input type="text" name="id" value={form.id} onChange={handleChange} className='border border-gray-500 rounded-lg ' />
                </div>
                <div className='flex flex-col p-7 items-center justify-center'>
                    <label className='text-xl '>Enter Email of Student</label>
                    <input type="text" name="email" value={form.email} onChange={handleChange} className='border border-gray-500 rounded-lg'/>
                </div>
                <div className='flex flex-col p-7 items-center justify-center'>
                    <label className='text-xl '>Generate Password for Student</label>
                    <input type="password" name="password" value={form.password} onChange={handleChange} className='border border-gray-500 rounded-lg'/>
                </div>
                 <div className='flex flex-col p-7 items-center justify-center'>
                    <label className='text-xl '>Confirm Password </label>
                    <div className="flex items-center justify-center">
                        <input
                            type="password"
                            value={confirm_password}
                            onChange={password_check}
                            className={`border rounded-lg ${confirm_password.length === 0 ? 'border-gray-500' : isPasswordMatch ? 'border-green-500' : 'border-red-500'}`}
                        />
                        <label className={confirm_password.length === 0 ? 'text-gray-500' : isPasswordMatch ? 'text-green-600' : 'text-red-600'}>
                            {confirm_password.length === 0 ? null : isPasswordMatch ? <Check /> : <X />}
                        </label>
                    </div>
                    
                </div>
            </div>
            
        
        
    )

}
export default Credentials