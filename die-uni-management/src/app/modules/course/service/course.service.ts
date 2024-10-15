import QueryBuilder from "../../../builder/QueryBuilder";
import { courseSearchAbleFields } from "../constant/course.constant";
import { TCourse } from "../interface/course.interface";
import CourseModel from "../model/course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  // TODO: Implement function to create a course into database
  const result = await CourseModel.create(payload);

  return result;
  // Return the created course object
};

// TODO => Get all courses from the database
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  // TODO: Implement function that retrieve all the courses from the database
  const courseQuery = new QueryBuilder(
    CourseModel.find({}).populate("preRequisiteCourses.course"),
    query,
  )
    .search(courseSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fieldLimiting();

  const result = await courseQuery.modelQuery;

  return result;
};

// TODO => Get single course from the database
const getSingleCoursesFromDB = async (id: string) => {
  // TODO: Implement function that retrieve single course from DB by mongoose ID
  const result = await CourseModel.findById(id).populate(
    "preRequisiteCourses.course",
  );

  return result;
};

// TODO => Delete specific course from the database
const deleteCourseFromDB = async (id: string) => {
  // TODO: Implement function that will delete a single course from
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );

  return result;
};

// Todo => Update course dynamically
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...rest } = payload;
  const modifiedData: Record<string, unknown> = { ...rest };

  // TODO:Step 01 => Basic course info update

  // TODO:Step 02 =>

  const updateBasicCourseInfo = await CourseModel.findByIdAndUpdate(
    id,
    modifiedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return updateBasicCourseInfo;
};

export const CourseServices = {
  createCourseIntoDB,
  getSingleCoursesFromDB,
  getAllCoursesFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
};
