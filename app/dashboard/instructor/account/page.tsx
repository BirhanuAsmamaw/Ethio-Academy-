
import React from 'react'
import { EB_Garamond } from 'next/font/google'
import { PiStudentLight } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";
import { SiBookstack } from "react-icons/si";
import ChannelVerfiedComponent from '@/components/ChannelVerfiedComponent'
import { RxDashboard } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { getCurrentUser } from '@/actions/users/currentUser'
import ActionButton from '@/components/button/actionButton';
import AccountEdit from './accountEdit';
import InstructorCourseListClient from '../course/courseListClient';
import UpdateTeacherLogo from './updateTeacherLogo';
import Link from 'next/link';


const eb_garamound= EB_Garamond({ subsets: ['latin'] ,weight:['400', '500','600','700']})
const AccountPage= async() => {
  
  const user=await getCurrentUser();
  
  const isDataAccessed=user?.permissions.some((permission)=>permission.permission.action === "CanManageOwnCourse"||permission.permission.action === "CanManageCourse" || permission.permission.action === "CanCreateCourse")

 
  if(!isDataAccessed || !user?.teacher ){
    return null;
  }
  const names=user.teacher.accountName?.split(" ")||user.name?.split(" ")
  return (
       <div className="flex py-20 lg:py-0 justify-center">
          <div className='flex flex-col items-center min-h-screen p-1 gap-20  w-full md:w-11/12 '>


         <div className=" bg-blue-600 p-4 relative flex-wrap text-white h-64   w-full rounded-[10px] flex justify-center sm:justify-between items-center">

          <Link href="/dashboard/instructor/analysis" className=' absolute top-3 right-3'><RxDashboard size={26} className=' font-extrabold text-white'/></Link>
<div className="">
        
          <div className="flex flex-col sm:flex-row text-center items-center w-full sm:gap-5 md:gap-10 ">
          <UpdateTeacherLogo user={user} />
            <div className="mt-1">
              <div className='text-xl md:text-2xl  xl:text-3xl  tracking-tight font-semibold flex gap-x-2 w-full'><p>{user?.teacher?.accountName? user?.teacher?.accountName:user?.name}</p> <ChannelVerfiedComponent/></div>
              {user?.teacher?.title?<p className={`
              ${eb_garamound.className}
              text-base md:text-xl  xl:text-2xl  
                text-gray-200 font-medium text-left tracking-tight `}> {user?.teacher?.title}</p>:""}

            </div>
          </div>
          <div className="mt-4 hidden md:block">

<ul className='flex  flex-row gap-x-2 w-full text-start items-start text-[16px] font-thin space-y-0 text-gray-300 list-none'>
<li className='flex gap-1'>
<SiBookstack size={20}/>
<span>{user.teacher.course_no} courses</span>
</li>

<li className='flex gap-1'>
<PiStudentLight size={20}/>
<span>{user.teacher.learner_no} learners</span>
</li>

<li className='flex gap-1'>
<BsPeople size={20}/>
<span>{user.teacher.subscribe_no} subscribers</span>
</li>


</ul>
</div>



<div className="mt-2 md:hidden">

<ul className='flex  flex-row gap-x-2 w-full text-start items-start text-[12px] font-thin space-y-0 text-gray-300 list-none'>
<li className='flex gap-1'>
<SiBookstack size={16}/>
<span>{user.teacher.course_no} courses</span>
</li>

<li className='flex gap-1'>
<PiStudentLight size={16}/>
<span>{user.teacher.learner_no} learners</span>
</li>
<li className='flex gap-1'>
<BsPeople size={16}/>
<span>{user.teacher.subscribe_no} subscribers </span>
</li>


</ul>
</div>
</div>


<div className=" flex flex-row md:flex-col gap-2 pt-1 items-center justify-center">
<AccountEdit user={user}/>
{user?.teacher?.status?<ActionButton url='/dashboard/instructor/course/add-course' label='Course' icon={IoMdAdd}/>:""}















</div>

         </div>


{/* COURSES */}
<InstructorCourseListClient instructor={user.teacher}/>



          </div>
       </div>
  )
}

export default AccountPage