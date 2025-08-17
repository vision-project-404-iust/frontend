import api from "../axiosConfig";
import type { ClassDetailStatusResponse } from "../../types/api";

/**
 * Fetches detailed breakdown data for all classes.
 * @returns A promise that resolves to a map of class details.
 */
export const getClassDetailStatus =
  async (): Promise<ClassDetailStatusResponse> => {
    const response = await api.get<ClassDetailStatusResponse>(
      "/api/class-detail-status/"
    );
    return response.data;
  };
