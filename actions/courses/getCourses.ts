import prisma from "@/lib/prismadb"

export async function getCourses(page: 1,pageSize:4){
  try{
    const courses = await prisma.course.findMany({
      orderBy:{
rating:"desc"
      },
      include:{
        reviews:true,
        chapters:{
          include: {
            lessons:true
          }
        }
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      
    });
  return courses
  }catch(e){
    return null;
  }
  
}