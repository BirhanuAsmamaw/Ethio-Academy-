"use client"
import Heading from '@/components/Heading/Heading'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import Input from '@/components/input/input'
import Button from '@/components/button/button'

interface UpdateExamContentProps{
  exam: any;
}
const UpdateExamContent:React.FC<UpdateExamContentProps> = ({exam}) => {
  const router=useRouter()
  const [isLoading, setIsLoading]=useState(false)
  

  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues: {
      exam:exam.examType,
      url:exam.url,
        
    },
  })
  







  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true)
   
    
    axios.put(`/api/examCategory/${exam.id}/update/content`,{...data}).then(()=>{
      toast.success("Exam updated successfully")
      router.refresh()
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setIsLoading(false)
    });

  }
  return ( <div className="w-full p-2 bg-white shadow-md dark:bg-slate-800">
  <div className="p-4">
  <Heading small title="Update Exams Content"/>
  </div>
<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 justify-between">
 
  <div className="pt-10 flex flex-col gap-4 justify-between px-4">
  <div className=" flex-col items-center justify-center w-full ">

<Input 
id="Exam" 
defaultValue={exam.examType}
register={register} errors={errors}  label="write Exam" type="text" required/>
</div>

<div className=" flex-col items-center justify-center w-full ">

<Input id="url" 
defaultValue={exam.url}
register={register} errors={errors}  label="Add Exam Path" type="text" required/>
</div>
  </div>
</div>
<div className="w-full flex justify-end  mt-6 py-6 px-4 ">
  <Button isDisabled={isLoading} title={isLoading?'Loading...':'Submit'} onClick={handleSubmit(onSubmit)}/>
</div>
</div>
  )
}

export default UpdateExamContent