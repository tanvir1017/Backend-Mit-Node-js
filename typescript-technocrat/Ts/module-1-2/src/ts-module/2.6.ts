{
  // Constraints
  // type AddStudentCourse = <T>(student: T) => T & { course: string }

  type MustHaveDataType = {
    id: number;
    name: string;
    email: string;
  };
  const addCourseToStudent = <T extends MustHaveDataType>(
    student: T
  ): T & { course: string } => {
    const course = "Next Level Web Development Course By PH";
    return {
      ...student,
      course,
    };
  };

  const student1 = addCourseToStudent<MustHaveDataType>({
    id: 22,
    name: "Tanvir Hossain",
    email: "tanvirhossain.1017@gmail.com",
  });

  console.log(student1);
  //
}
