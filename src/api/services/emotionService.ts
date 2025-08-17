import api from "../axiosConfig";
import type { ClassEmotionData } from "../../types/api";

/**
 * Fetches the emotion distribution for all classes.
 * @returns A promise that resolves to an array of class emotion data.
 */
export const getEmotionStatus = async (): Promise<ClassEmotionData[]> => {
  const response = await api.get<ClassEmotionData[]>("/api/emotions-status/");
  return response.data;
};
