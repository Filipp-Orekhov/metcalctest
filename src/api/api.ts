import axiosInstance from "../utils/axiosInstance";

export const fetchShapesApi = async () => {
  const response = await axiosInstance.get("materials");
  return response.data;
};