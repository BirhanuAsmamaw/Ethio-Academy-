"use client"

import { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import ChooseForm from "./chooseForm";

interface QuestionsClientProps{
  lesson:any;
}


const QuestionsClient:React.FC<QuestionsClientProps> = ({lesson}) => {

 
    const [question,setQuestion]=useState<any>(
        {Q:"",
A:{
    choose:"",
    isAnswer:false,
},
B:{
    choose:"",
    isAnswer:false,
},

C:{
    choose:"",
    isAnswer:false,
},
D:{
    choose:"",
    isAnswer:false,
},
});


const onAddQuestion=() => {
    
 console.log("onAddQuestion",question);
 
};
  return (  <div className={`bg-white dark:bg-gray-800 pb-10  mb-10 min-h-screen flex flex-col items-center gap-6 w-full`}>
  
     <div className="p-4">
      <h5 className="text-lg">Write Questions of <span className="text-green-600 dark:text-green-400">{lesson.title}</span> in <span className="text-rose-600 dark:text-rose-400">{lesson.chapter.title} </span>of <span className="text-blue-600 dark:text-blue-400">{lesson.chapter.course.subject}</span></h5>
     </div>




     <div className="w-full pt-10">
<textarea
onChange={(event)=>setQuestion({...question,Q:event.target.value})}
className="block 
p-2.5 w-full 
text-sm 
text-gray-900 
bg-gray-50 

rounded-lg 
border 
border-gray-300
 focus:ring-blue-500 
 focus:border-blue-500 
 dark:bg-gray-700 
 dark:border-gray-600 
 dark:placeholder-gray-400 
 dark:text-white 
 dark:focus:ring-blue-500 
dark:focus:border-blue-500
"
rows={4}
></textarea>



<div className={`p-4 flex flex-col gap-2 ${question.Q!==""? 'block':'hidden'}`}>

   <ChooseForm 
    onChange={(event) => setQuestion({ ...question, A:{ ...question.A,choose: event.target.value } })} 
    label="A"
    onAnswer={(event) => setQuestion({ ...question, A: {...question.A, isAnswer: event.target.value } })} />

   <ChooseForm 
    label="B"
   onChange={(event)=>setQuestion({...question,B:{...question.B,choose:event.target.value}})}
   onAnswer={(event) => setQuestion({ ...question, B: { ...question.B,isAnswer: event.target.value } })} 
   />
   

   <ChooseForm 
    label="C"
   onChange={(event)=>setQuestion({...question,C:{...question.C,choose:event.target.value}})}
   onAnswer={(event) => setQuestion({ ...question, C: {...question.C, isAnswer: event.target.value} })} 
   />

   <ChooseForm 
   label="D"
   onChange={(event)=>setQuestion({...question,D:{...question.D,choose:event.target.value}})}
   onAnswer={(event) => setQuestion({ ...question, D: {...question.D, isAnswer: event.target.value } })} 
   />
   
   <div className="w-full flex justify-end px-2 py-4">
    <button 
    onClick={onAddQuestion}
    className="
    flex gap-1 
    text-sm 
    text-gray-600
     bg-gray-200 
     border 
     border-gray-300 
     rounded-[10px]
     hover:bg-gray-600
     hover:text-white
     font-medium

     px-2 py-1"><AiOutlineSave className="mt-1"/> <p>save</p></button>
   </div>
</div>
  </div>
  </div>);
}
 
export default QuestionsClient;