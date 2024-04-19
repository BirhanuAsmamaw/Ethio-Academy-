



"use client"

import * as React from "react"
import { MdContentPaste } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai"
import { Button } from "@/components/ui/button"
import { MdEditDocument } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


import { MdDelete } from "react-icons/md";
import { GoQuestion } from "react-icons/go";

import { CourseType } from "@/types";

import UpdateChapter from "./updateChapter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DeleteChapter from "./deleteChapter";
import { useRouter } from "next/navigation";
import CLink from "@/components/link";
import CreateLesson from "./createLesson";
export function ChapterList({course}:{course:CourseType|any}) {
  const router=useRouter();
  if (!course){
    return <div className="p-4 font-bold text-xl">No Chapter!</div>
  }
 
  return (<Accordion type="single" collapsible className="w-fu">
      {course.chapters.map((chapter:any,index:number)=>{
        return <AccordionItem className="dark:border-b-gray-600" key={index} value={`${index}`}>
        <AccordionTrigger className="hover:no-underline">
        <h5 className="flex text-[14px] gap-2 font-medium px-2 md:px-6"><p>Chapter {index+1}: </p><p>{chapter.title}</p></h5>
        </AccordionTrigger>
        <AccordionContent>
        <div className="flex flex-col gap-6">

          
           

            <Tabs defaultValue="" className=" w-full">
  <TabsList className="grid w-full grid-cols-2 gap-4 ">
    <TabsTrigger className="py-2 md:py-2.5 px-3 md:px-5 me-2 mb-2
  text-sm font-medium text-gray-900 focus:outline-none
   bg-white rounded-full border border-gray-200 
   hover:bg-gray-100 hover:text-blue-700 focus:z-10 
   focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700
    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
     dark:hover:text-white dark:hover:bg-gray-700 flex gap-2 items-center justify-center" value="update"><><MdModeEdit size={24}/> <p>Update Chapter</p></></TabsTrigger>
    <TabsTrigger className="py-2 md:py-2.5 px-3 md:px-5 me-2 mb-2
  text-sm font-medium text-gray-900 focus:outline-none
   bg-white rounded-full border border-gray-200 
   hover:bg-gray-100 hover:text-blue-700 focus:z-10 
   focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700
    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
     dark:hover:text-white dark:hover:bg-gray-700 flex gap-2 items-center justify-center" value="delete"><><MdDelete size={24}/> <p>Delete Chapter</p></></TabsTrigger>
  </TabsList>

  <TabsContent value="update" className="pt-10">
  <UpdateChapter chapter={chapter}/>
  </TabsContent>



  <TabsContent value="delete" className="pt-10">
 <DeleteChapter chapterId={chapter.id}/>
  </TabsContent>


</Tabs>


<div className="px-4 flex  w-full justify-end">
<CreateLesson chapterId={chapter?.id}/>
           
          </div>
  <div className="-m-1.5 overflow-x-auto">
    <div className="p-1.5 min-w-full inline-block align-middle relative">
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 relative">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Lessons</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Titles</th>
              <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
           {
            chapter?.lessons?.map((lesson:any,ind:number)=>{
              return  <tr key={ind} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Lesson: {ind+1}</td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{lesson.title}</td>
              <td className="py-2 whitespace-nowrap text-end text-sm font-medium relative">
             
             <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost"><BsThreeDots size={20}/></Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56 absolute right-0 top-2 bg-slate-100 dark:bg-slate-700 p-2">
        <DropdownMenuLabel>Lesson: {ind+1}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem >
          <CLink url={`/course/${course.id}/${chapter.id}/${lesson.id}`}>
            <><GrFormView size={20}/> <p>View Detail</p></>
          </CLink>
        </DropdownMenuItem>

        <DropdownMenuItem >
        <CLink url={`/dashboard/course/${course?.id}/chapter/${chapter?.id}/lesson/${lesson?.id}/add-questions`}>
            <><GoQuestion size={20}/> <p>Add Questions</p></>
          </CLink>
        </DropdownMenuItem>


        <DropdownMenuItem>
        <CLink url={`/dashboard/course/${course?.id}/chapter/${chapter?.id}/lesson/${lesson?.id}/update-content`} >
            <><MdContentPaste size={20}/> <p> Contents</p></>
          </CLink>
        </DropdownMenuItem>

        <DropdownMenuItem>
        <CLink url={`/dashboard/course/${course?.id}/chapter/${chapter?.id}/lesson/${lesson?.id}/update-files`} >
            <> <MdEditDocument size={20}/> 
         <p>Edit Lesson Files</p></>
          </CLink>
        </DropdownMenuItem>


        <DropdownMenuItem>
        <CLink url={`/dashboard/course/${course?.id}/chapter/${chapter?.id}/lesson/${lesson?.id}/update-files`} >
            <><AiOutlineDelete size={20}/> <p>Delete Lesson</p></>
          </CLink>

        </DropdownMenuItem>
        
       
      </DropdownMenuContent>
    
    </DropdownMenu>
            
              </td>
            </tr>
            })
           }

           
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
        </AccordionContent>
      </AccordionItem>
      
      })}
    </Accordion>
  )
}