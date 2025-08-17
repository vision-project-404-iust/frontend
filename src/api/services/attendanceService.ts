import type { ClassAttendanceData } from "../../types/api";
import api from "../axiosConfig";

/**
 * Fetches the attendance rate of all classes.
 * @returns A promise that resolves to an array of class attendance data.
 */
export const getAttendanceStatus = async (): Promise<ClassAttendanceData[]> => {
  const response = await api.get<ClassAttendanceData[]>(
    "/api/attendance-status/"
  );
  return response.data;
};
