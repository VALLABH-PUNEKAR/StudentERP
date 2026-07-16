import {useState,useEffect} from 'react'
import { useOutletContext } from 'react-router-dom'
function MainDashboard(){
    const {name}=useOutletContext()
    return(
        <div className='p-10'>
            <div>
                <h1 className='text-3xl'>Hello {name} 👋</h1>
            </div>
        </div>
        
    )

}
export default MainDashboard