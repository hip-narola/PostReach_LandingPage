import routes from "@/app/Routes/route";
import { apiGet } from "./commonAPI-service";

export const getBlogs = async () => {
    return apiGet(routes.blogs);
  };