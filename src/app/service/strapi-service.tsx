import routes from "@/app/navigation-list/route-list";
import { apiGet } from "./commonAPI-service";

export const getBlogs = async () => {
    return apiGet(routes.blogs);
  };