import {authorizationRequest} from "../requestMethods.js";

export const getBlogs = async () => {
    const response = await authorizationRequest.get("/blog");
    return response.data;
}
export const deleteBlog = async (id) => {
    return await authorizationRequest.delete(`/blog/delete/${id}`);
}

export const addBlog = async (data) => {
    const res = await authorizationRequest.post("/blog/create", data);
    return res.data;
}