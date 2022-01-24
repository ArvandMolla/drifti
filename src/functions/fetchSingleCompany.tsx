import { AxiosResponse } from "axios";
import axiosInstance from "../util/axios";

export const fetchSingleCompany = async (orgNumber: number) => {
  let res: AxiosResponse | void = await axiosInstance
    .get(`enheter/${orgNumber}`)
    .catch((err) => {
      console.log(err.message);
      return undefined;
    });

  if (res) {
    return res.data;
  } else {
    return undefined;
  }
};
