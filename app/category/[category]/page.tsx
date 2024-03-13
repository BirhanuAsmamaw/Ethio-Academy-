import { getCourses } from "@/actions/courses/getCourses";
import Banner from "@/components/banner";
import Card from "@/components/card/card";

import Navbar from "@/components/navbar/Navbar";
import Spinning from "@/components/spinning";



interface IPrams{
  category: string;
}
const Category =async ({params}:{params:IPrams}) => {
  

  const courses=await getCourses();
  const selectedCourses=courses?.filter((course)=>course.category===params.category);
  if(!courses){
    return <div className="w-full h-screen flex justify-center items-center">
      <Spinning/>
    </div>
  }
  return (<><Navbar/> <div className="flex pb-20">
<div className="flex flex-col gap-10 w-full items-center">



<div className="p-4 md:p-6 lg:p-10 xl:p-20 w-full">
     <Banner title={`${params.category} Courses`}>
        
    <></>
     </Banner>
     </div>

   

    <h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>New Coming {params.category}   Courses</h1>
    <div className='flex justify-center flex-wrap gap-8 md:px-10 '>

{selectedCourses?.map((course,index)=>{
  return <Card
  key={index}
      id={course.id}
      category={course.category}
      price={course.price}
      subject={course.subject}
      rating={course.rating??0}
      cover={course.cover}  />

})}


</div>

</div>
  </div> </> );
}
 
export default Category;