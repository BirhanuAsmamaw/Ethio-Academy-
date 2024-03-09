"use client"

import Heading from '@/components/Heading/Heading'
import Button from '@/components/button/button'
import FileInput from '@/components/input/fileInput'
import Input from '@/components/input/input'
import firebaseApp from '@/lib/firebasedb'
import axios from 'axios'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import React, { useCallback, useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

const ExamsTypes = () => {
  const [image,setImage]=useState<File|null>(null)
const [isLoading, setIsLoading]=useState(false)
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues: {
      cover:null,
      examType:""
        
    },
  })

  const handleImageChange = useCallback((acceptedFiles:any)=> {
    setImage(acceptedFiles[0])
    setSelectedImage(URL.createObjectURL(acceptedFiles[0]));
  }, []) 











  let imageCoverUrl:string="";
  



  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true)
    const handleImageUpload = async() =>{
      try{
        const storage=getStorage(firebaseApp);
       

      if(image){
        const fileName=new Date().getTime()+"-"+image.name;

        const imageStorageRef=ref(storage,`examCategory/cover/${fileName}`);
        const uploadTask=uploadBytesResumable(imageStorageRef,image);
        await new Promise<void>((resolve,reject)=>{
          uploadTask.on('state_changed',
          (snapshot)=>{
            const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
            
           
            switch(snapshot.state){
                 case "paused":
                 
                   break;
                 case "running":
                  
                   break;
            }
          },
          (error)=>{
           
            reject(error);
          },
          ()=>{
            //succesful upload image
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
              imageCoverUrl=downloadUrl
             
              resolve();
            }).catch((error)=>{
              
              reject(error);
            });
          }

          )

        })

      }

      
    
    } catch(error) {

    }

    
    


  }
  await handleImageUpload();
  
  if(!imageCoverUrl){
throw new Error("exams Category cover  not empty!!")
  }

  const exam={...data,cover:imageCoverUrl}
    axios.post('/api/examCategory',exam).then(()=>{
      toast.success("exams Category created successfully")
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setIsLoading(false)
    });

  }

const onCancelImage = () => {
  setSelectedImage(null);
};








  
  return ( <div className="w-full">
    <div className="p-4"> <Heading small title=" Exams Category "/></div>
  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 justify-between">
    {/* create exams category */}
    <div className="w-full   flex flex-col gap-1">
      <Heading small title="Upload Exams Category Cover"/>
        <FileInput
        required
        onCancel={onCancelImage}
        file={selectedImage}
        fileType="image"
      onDrop={handleImageChange}
          register={register}
          id="cover" 
          errors={errors}          
      />
    </div>

    <div className="pt-10 flex-col items-center justify-center w-full ">

    <Input id="examType" register={register} errors={errors}  label="Exams Type" type="text" required/>
    </div>
  </div>
  <div className="w-full flex justify-end  mt-6 py-6 px-4 ">
    <Button isDisabled={isLoading} title={isLoading?'Loading...':'Submit'} onClick={handleSubmit(onSubmit)}/>
  </div>
  </div>
  )
}

export default ExamsTypes