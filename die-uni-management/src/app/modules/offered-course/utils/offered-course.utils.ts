import { TDays } from "../interface/offered-course.interface";

export type TSchedule = {
  days: TDays[];
  startTime: string;
  endTime: string;
};

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedules: TSchedule,
) => {
  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}:00`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}:00`);

    const newStingTime = new Date(`1970-01-01T${newSchedules.startTime}:00`);
    const newEndTime = new Date(`1970-01-01T${newSchedules.endTime}:00`);

    if (existingStartTime < newEndTime && existingEndTime > newStingTime) {
      return true;
    }
  }

  return false;
};

export const OfferedCourseUtils = {
  hasTimeConflict,
};
