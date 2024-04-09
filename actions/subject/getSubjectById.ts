import prisma from "@/lib/prismadb"
export async function getSubjectById(subjectId: string){
  try{
    const subject = await prisma.subject.findUnique({
      where:{id:subjectId},
      include:{
        department:{
          include:{
            exam:true
          }
        }
      }
      
      
    });
  return subject
  }catch(e){
    return null;
  }
}