import { useOutletContext } from "react-router-dom"
function SubmitStudent(){
    const {form,setForm}=useOutletContext()
    
    return(
         <div className='flex flex-col h-full   justify-center'>
                <div className="grid  items-center justify-center bg-gray-100 rounded-4xl">
                    <div className='flex p-5 items-center justify-center'>
                        <label className='text-xl '>Roll No:-</label>
                        <label className='w-80 h-8 border border-gray-500 rounded-lg text-xl'>{form.id}</label>
                    </div>
                    <div className='flex p-5 items-center justify-center'>
                        <label className='text-xl '>Email:-</label>
                        <label className='w-80 h-8 border border-gray-500 rounded-lg text-xl'>{form.email}</label>
                    </div>
                    <div className='flex p-5 items-center justify-center'>
                        <label className='text-xl '>Password:-</label>
                        <label className='w-80 h-8 border border-gray-500 rounded-lg text-xl'>{form.password}</label>
                    </div>
                    <div className='flex p-5 items-center justify-center'>
                        <label className='text-xl '>Batch:-</label>
                        <label className='w-80 h-8 border border-gray-500 rounded-lg text-xl'>{form.batch}</label>
                    </div>
                    <div className='flex p-5 items-center justify-center'>
                        <label className='text-xl '>Course:-</label>
                        <label className='w-80 h-8 border border-gray-500 rounded-lg text-xl'>{form.course}</label>
                    </div> 
                    <div className='flex p-5 items-center justify-center'>
                        <label className='text-xl '>Institue:-</label>
                        <label  className='w-80 h-8 border border-gray-500 rounded-lg text-xl'/>
                    </div>
                </div>
        </div>
    )

}
export default SubmitStudent