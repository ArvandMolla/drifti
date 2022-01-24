import { AxiosResponse } from "axios";
import axiosInstance from "../util/axios";

export const fetchCompanies = async (query: string, page: number) => {
  let res: AxiosResponse | void = await axiosInstance
    .get(`enheter?navn=${query}&page=${page}&size=20`)
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
