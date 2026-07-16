import Simg from '../assets/LMS1.png'
function Initial(){
    return(
        <div className='flex justify-center flex-col  items-center h-full'>
           <div className='flex justify-center flex-col  items-center '>
             <h1 className='text-xl'>Select Semester to See Subject List</h1>
            <img src={Simg} className='h-100'/>
           </div>
        </div>
    )
}
export default Initial