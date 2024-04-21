import { getTeacherById } from '@/actions/teacher/getTeacherById'
import Card from '@/components/card/card'
import CourseList from '@/components/lists/courseList'
import Navbar from '@/components/navbar/Navbar'
import PaginationComponent from '@/components/pagination'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { EB_Garamond } from 'next/font/google'
const eb_garamound= EB_Garamond({ subsets: ['latin'] ,weight:['400', '500','600','700']})
const InstructorPage = async({params}:{params:{instructorId:string}}) => {
  const teacher= await getTeacherById(params.instructorId)
  const names=teacher?.user?.name?.split(" ")
  if(!teacher){
    return null;
  }
  return (<>
  <Navbar/>
       <div className="flex justify-center">
          <div className='flex flex-col items-center min-h-screen gap-20  p-4 w-full md:w-11/12 lg:w-10/12 xl:w-8/12 '>


         <div className=" bg-blue-600 p-4 text-white h-64  w-full rounded-[10px] flex justify-center items-center">
          <div className="flex flex-col md:flex-row w-full gap-10 ">
          <Avatar className={`${!teacher?.user?.image&&'hidden'}  h-24 w-24 `}>
      <AvatarImage src={teacher.logo? teacher?.logo.public_url: teacher.user?.image||""} alt="image" />
      <AvatarFallback>{names? names[0][0]:''}{names?names[1][0]:''}</AvatarFallback>
    </Avatar>
            <div className="">
              <p className='text-xl md:text-2xl  xl:text-3xl leading-10 font-semibold'>{teacher?.accountName? teacher?.accountName:teacher?.user.name}</p>
              {teacher?.title?<p className={`
              ${eb_garamound.className}
              text-lg md:text-xl  xl:text-2xl  leading-6
                text-gray-200 font-medium `}> {teacher?.title}</p>:""}

            </div>
          </div>
         </div>


{/* COURSES */}
{(teacher?.courses?.length||0)?<div  id='common-courselist' className="flex justify-center w-full">
    <div className="w-full lg:w-11/12 xl:px-20 space-y-4">
      <h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double  p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>Most common Courses</h1>
  
     <CourseList>
     {teacher?.courses?.map((course)=>{
          return course.cover&&<Card
          key={course.id}
              id={course.id}
              no_reviews={course.reviews.length}
              url={course.subject.department.url}
              category={course.subject.department.departmentName}
              price={course.price}
              subject={course.course}
              rating={course?.rating??0}
              cover={course.cover.public_url} 
              subjectCat={course?.subject.subjectName}
             
               />
      
        })}
     </CourseList>
      {(teacher?.courses?.length||0)>4?<div className="w-full flex p-4 justify-end">
        <PaginationComponent paginationLength={teacher?.courses?.length||0} page={'1'} pageUrl='page'id='common-courselist'/>
      </div>:""}
</div>
</div>:""}


          </div>
       </div></>
  )
}

export default InstructorPage