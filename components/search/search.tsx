import { CiSearch } from "react-icons/ci";

const Search = () => {
  return ( <>
    <div className="hidden md:block  ">
   <div className="flex w-full  bg-white dark:bg-gray-800  border rounded-[8px] border-gray-200 dark:border-gray-700 overflow-hidden ">
     <CiSearch size={30} className="pt-1"/> 
     <input type="search" className="bg-white dark:bg-gray-700  w-full border-none outline-none px-2 py-1"/></div>
   </div>
   <div className="md:hidden relative">
    <button><CiSearch size={30} className=""/></button>
    <div className="absolute top-13 w-full right-2 left-2">
    <div className=" dark:border-gray-700 bg-white dark:bg-gray-800  shadow-lg flex w-[300px]  border rounded-[8px] border-gray-200 overflow-hidden ">
    <CiSearch size={24} className="pt-1"/> 
    <input type="search" 
    className=" bg-white dark:bg-gray-700  w-full border-none outline-none px-2 py-1"/>
   </div>
    </div>
   </div>
   </>
     );
}
 
export default Search;