function FacultyLMS(){
    return(
        <div className="flex flex-col bg-white h-full rounded-xl items-center gap-7 p-5">
            <label className="p-5 text-2xl ">LMS</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                <div className="flex gap-5 w-100 h-20 bg-gray-100 items-center justify-center shadow-sm rounded-3xl">
                    <label className="text-xl ">Select Course</label>
                    <select className="border border-purple-300 rounded-lg w-40 ">
                        <option>Default</option>
                    </select>
                </div>
                <div className="flex gap-5 w-100  h-20 bg-gray-100 items-center justify-center shadow-sm rounded-3xl">
                    <label className="text-xl ">Select Subject</label>
                    <select className="border border-purple-300 rounded-lg w-40 ">
                        <option>Default</option>

                    </select>
                </div>
                <div className="flex gap-5 w-100  h-20 bg-gray-100 items-center justify-center shadow-sm rounded-3xl">
                    <label className="text-xl ">Select Batch</label>
                    <select className="border border-purple-300 rounded-lg w-40 ">
                        <option>Default</option>

                    </select>
                </div>


            </div>
            <div className="border h-full w-full rounded-2xl ">

            </div>


        </div>
    )

}
export default FacultyLMS