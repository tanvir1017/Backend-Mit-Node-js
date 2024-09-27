type TMonths =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

type TAcademicSemesterName = "Autumn" | "Summer" | "Fall";
type TAcademicSemesterCode = "01" | "02" | "03";
type TAcademicSemester = {
  name: TAcademicSemesterName;
  year: Date;
  code: TAcademicSemesterCode;
  startMonth: TMonths;
  endMonth: TMonths;
};

export {
  TAcademicSemester,
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
};
