import { useOutletContext } from "react-router-dom"
function StudentBatch(){
    const {form,setForm}=useOutletContext()
    const handleChange=(e)=>{
        const {name,value}=e.target
        setForm({
            ...form,
            [name]:value
            
        })
    }
    return(
         <div className='flex flex-col h-full   justify-center'>
                <div className="bg-gray-100 rounded-4xl">
                    <div className='flex flex-col p-7 items-center justify-center'>
                        <label className='text-xl '>Select Batch of Student</label>
                        <input type="text" name="batch" value={form.batch} onChange={handleChange} className='border border-gray-500 rounded-lg '/>
                    </div>
                    <div className='flex flex-col p-7 items-center justify-center'>
                        <label className='text-xl '>Select course of Student</label>
                        <input type="text" name="course" value={form.course} onChange={handleChange} className='border border-gray-500 rounded-lg'/>
                    </div>
                </div>
               
                   
                
        </div>
    )
}
export default StudentBatch