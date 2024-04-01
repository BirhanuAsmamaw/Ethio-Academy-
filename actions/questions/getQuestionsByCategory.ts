import prisma from "@/lib/prismadb";


export async function getQuestionsByCategory(type: string, department: string, year: string, subject?: string,isModel?:boolean) {
  try {
    const whereClause: any = {
      year: year,
      isModel:isModel,
      department: {
        departmentName: department,
        exam: {
          url: type,
        },
      },
      
    };

    if (subject) {
      whereClause.subject = subject;
      
    }

    const selectedQuestion = await prisma.question.findMany({
      where: whereClause,
    });

    return selectedQuestion;
  } catch (err) {
    // Handle the error appropriately
    console.error("Error in getQuestionsByCategory:", err);
    throw err; // Re-throw the error to be caught by the calling function or handle it accordingly.
  }
}
