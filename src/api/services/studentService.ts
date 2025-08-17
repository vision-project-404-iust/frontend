import api from "../axiosConfig";
import type {
  StudentOverallStatus,
  StudentsDetailStatusResponse,
} from "../../types/api";

/**
 * Fetches the overall status for all students.
 * @returns A promise that resolves to an array of student status data.
 */
export const getStudentOverallStatus = async (): Promise<
  StudentOverallStatus[]
> => {
  const response = await api.get<StudentOverallStatus[]>(
    "/api/student-overall-status/"
  );
  return response.data;
};

/**
 * Fetches detailed breakdown data for all students. Used for the Students Page.
 * @returns A promise that resolves to a map of student details.
 */
export const getStudentsDetailStatus =
  async (): Promise<StudentsDetailStatusResponse> => {
    const response = await api.get<StudentsDetailStatusResponse>(
      "/api/students-detail-status/"
    );
    return response.data;
  };
