"use client"
import React, { ReactNode, useState } from 'react'
import {motion} from "framer-motion"
import { GrClose } from "react-icons/gr";
import { Button, buttonVariants } from './ui/button';
import { Loader2 } from "lucide-react"
import { cn } from '@/lib/utils';
import Container from './container/container';
interface ModalProps{
  children:ReactNode;
  title?:string;
  buttonLabel?:string;
  onClick?:() => void;
  modalName:ReactNode;
  disabled?:boolean;
  className?:string;
  variant?:"default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
}
const CModal:React.FC<ModalProps> = ({className,variant,disabled,children,title,buttonLabel,onClick,modalName}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button  onClick={() => setOpen(prev => !prev)} className={cn(buttonVariants({
        variant:variant,
       
        className:className
      }))}>
       {modalName}
      </button>
      {isOpen && (
        <div  className="fixed z-50 inset-0 overflow-y-auto w-full  ">
          <div className="flex  items-center justify-center min-h-screen w-full pt-10 pb-20 text-center">
            <div onClick={() => setOpen(prev => !prev)}  className="fixed  inset-0 transition-opacity " aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-65"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <motion.div 
            initial={{opacity:0 ,y:40}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0 ,y:40}}
            transition={{delay:0.25,duration:0.25}}
            className=" z-40 flex justify-center  align-bottom rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle m-4   lg:max-w-6xl ">
              <Container className='pt-2'>
                <div className="sm:flex sm:items-start">
                  <div className=" text-center sm:mt-0 sm:ml-4 sm:text-left">
                    
                      <div className={`w-full flex ${title?'justify-between':'justify-end'} `}>
                      {title?<h3 className="text-lg leading-6 font-semibold text-gray-900 dark:text-white ">{title}</h3>:""}
                      <Button variant="ghost" onClick={() => setOpen(prev => !prev)} className="text-red-500 hover:text-red-700  font-bold  px-4 rounded">
                        <GrClose size={20}/>
                      </Button>
                      
                      </div>
                    <div className=" text-wrap"> {children}</div>
                      <div className="mt-2 p-2 w-full flex justify-end gap-6">
                        <Button className='text-sm text-white' onClick={() => setOpen(prev => !prev)} variant="destructive">Cancel</Button>
                      {buttonLabel?  <Button className='text-sm' disabled={disabled} onClick={onClick}>{disabled? <Loader2 className="mr-2 h-4 w-4 animate-spin" />:""}{buttonLabel}</Button>:""}
                      </div>
                   
                  </div>
                </div>
              </Container>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default CModal;
