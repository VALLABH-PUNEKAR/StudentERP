import {CalendarArrowUp,ClipboardCheck,FileCheck,Award} from 'lucide-react'
function Exams(){
    return(
        <div className="flex flex-col p-5">
           <div className='flex gap-5 '>
            <div className="flex gap-5 bg-gray-200 p-10 rounded-lg shadow-lg w-full">
                <div className='flex bg-blue-200 w-15 h-15 items-center justify-center rounded-xl'>
                    <CalendarArrowUp/>

                </div>
                <div>
                    <label>UpComing Exams</label>
                </div>

            </div>
             <div className="flex gap-5 bg-gray-200 p-10 rounded-lg shadow-lg w-full">
                <div className='flex bg-green-200 w-15 h-15 items-center justify-center rounded-xl'>
                    <ClipboardCheck/>

                </div>
                <div>
                    <label>UpComing Exams</label>
                </div>

            </div>
             <div className="flex gap-5 bg-gray-200 p-10 rounded-lg shadow-lg w-full">
                <div className='flex bg-yellow-200 w-15 h-15 items-center justify-center rounded-xl'>
                    <FileCheck/>

                </div>
                <div>
                    <label>Completed Exams</label>
                </div>

            </div>
            <div className="flex gap-5 bg-gray-200 p-10 rounded-lg shadow-lg w-full">
                <div className='flex bg-red-200 w-15 h-15 items-center justify-center rounded-xl'>
                    <Award/>

                </div>
                <div>
                    <label>Average Score</label>
                </div>

            </div>

           </div>

        </div>
    )

}
export default Exams