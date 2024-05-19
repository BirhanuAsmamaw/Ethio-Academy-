
"use client"
import Login from "@/components/auth/login/login";
import Container from "@/components/container/container";
import { useCart } from "@/hooks/use.cart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface LessonBlurProps{
  course:any;
  user:any;
}
const LessonBlur:React.FC<LessonBlurProps> = ({course,user}) => {
  const router=useRouter();
  const [reloadPage, setReloadPage] = useState(false);
  const {addToCart}=useCart();
  useEffect(() => {
    // Set a timeout to reload the page after 1 minute (60,000 milliseconds)
    const timeoutId = setTimeout(() => {
      setReloadPage(true);
    }, 6000);

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  const onPayment=()=>{
    addToCart(course)
    router.push('/payment')
  }

  if (!user&&reloadPage){
    return (<div className="fixed z-50 flex justify-center items-center h-screen w-full bg-black bg-opacity-80">
      <Login user={user}/>
    </div>

    )

  }


  
  return ( <>{reloadPage&&<div className="fixed z-50 flex justify-center items-center h-screen w-full bg-black bg-opacity-80">
    <Container
    childern={
      <div className="px-2 py-6 flex flex-col items-center justify-center gap-6 w-72">
        <button
         onClick={onPayment}
          className="text-white bg-green-500 px-4 py-2 rounded-[5px] mr-2 hover:bg-green-600 focus:outline-none"
        >
          Buy Course Now!
        </button>

       
        
      </div>
    }/>

  </div>}</> );
}
 
export default LessonBlur;