import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../helper/axiosInstance";
import { logout } from "./authSlice";

const initialState = {
    coursesData: "",
    courseCategory: "",
    courseCategoryData: "",
    courseDescription: "",
    courseInstructor: "",
    myCourse: "",
    courseLecture: ""
};

// function to get all courses
export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const res = axiosInstance.get("/courses");

        const response = await res;

        return response.data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const getCategoryCourse = createAsyncThunk('/course/category', async (category) => {
    try {

        const categ = category?.toUpperCase()?.replace(/ /g, '-')
        const res = await axiosInstance.get(`/courses/category/${categ}`);
        return res.data

    } catch (error) {
        console.log(error.message)
    }
})
export const getAllCategory = createAsyncThunk('/course/all/category', async () => {

    try {
        const res = await axiosInstance.get('/courses/all/categories');

        return res.data

    } catch (error) {
        console.log(error.message)
    }
})

export const getCourseInstructor = createAsyncThunk('/course/getCourseInstructor', async (instructorId) => {
    try {
        const res = await axiosInstance.get(`/admin/course/instructor/${instructorId}`);

        return res.data

    } catch (error) {
        console.log(error.message)
    }
})
export const getCourseDescription = createAsyncThunk('/course/courseDescription', async (courseId) => {
    try {
        const res = await axiosInstance.get(`/courses/courseDescription/${courseId}`);

        return res.data

    } catch (error) {
        console.log(error.message)
    }
})

export const getAllowCategory = createAsyncThunk('/course/getCategory', async () => {
    try {
        const res = await axiosInstance('/courses/getCategory')

        return res.data
    } catch (error) {
        console.log(error.msg)
    }


})

export const myCourse = createAsyncThunk('/course/mycourse', async (type) => {
    try {
        console.log(type)
        let res;
        if (type === "USER") {
            res = axiosInstance.get(`/courses/mycourse`);
        }
        else if (type === "INST") {
            res = axiosInstance.get(`/courses/inst/mycourse`);
        }
        res = await res
        return res.data

    } catch (error) {
        console.log(error.message)
    }
})

export const getLeacture = createAsyncThunk('/course/mycourse/lectures', async (courseId) => {
    try {
        let res = axiosInstance.get(`/courses/mycourse/${courseId}`);
        res = await res
        return { data: res.data, statusCode: res.status }

    } catch (error) {
        console.log(error)
        return { data: error.response.data, statusCode: error.response.status }
    }
})

// crud operation
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try {
        const res = axiosInstance.delete(`courses/mycourse/${id}`);

        toast.promise(res, {
            loading: "Deleting the course...",
            success: "Courses deleted successfully",
            error: "Failed to delete course",
        });

        const response = await res;

        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const createNewCourse = createAsyncThunk(
    "/get/courses",
    async (data) => {
        try {
            // creating the form data from user data
            let formData = new FormData();
            formData.append("title", data?.title);
            formData.append("description", data?.description);
            formData.append("category", data?.category);
            formData.append("createdByName", data?.createdBy);
            formData.append("thumbnail", data?.thumbnail);
            formData.append("price", data?.price);

            const res = axiosInstance.post("/courses", formData);

            toast.promise(res, {
                loading: "Creating the course...",
                success: "Course created successfully",
                error: "Failed to create course",
            });

            const response = await res;
            return response.data;
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }
);

export const updateCourse = createAsyncThunk("/course/update", async (data) => {
    try {
        const res = axiosInstance.put(`/courses/mycourse/${data.id}`, {
            title: data.title,
            category: data.category,
            description: data.description,
            price: data.price
        });

        toast.promise(res, {
            loading: "Updating the course...",
            success: "Course updated successfully",
            error: "Failed to update course",
        });

        const response = await res;
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
});


const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.fulfilled, (state, action) => {
                if (action.payload) {
                    state.coursesData = [...action.payload];
                }
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {

                if (action?.payload?.success) {
                    state.courseCategory = [...action.payload.categories]
                }
            })
            .addCase(getCategoryCourse.fulfilled, (state, action) => {
                if (action?.payload?.success) {
                    state.courseCategoryData = []
                    state.courseCategoryData = [...(action.payload.courses)]
                }
            })
            .addCase(getCourseDescription.fulfilled, (state, action) => {
                if (action?.payload?.success) {
                    state.courseDescription = (action.payload.course)
                }
            })
            .addCase(getCourseInstructor.fulfilled, (state, action) => {
                if (action?.payload?.success) {
                    state.courseInstructor = (action.payload.instructor)
                }
            })
            .addCase(myCourse.fulfilled, (state, action) => {
                if (action?.payload?.success) {
                    state.myCourse = [...(action.payload.mycourse)]
                }
            })
            .addCase(getLeacture.fulfilled, (state, action) => {
                if (action?.payload?.data?.success) {
                    state.courseLecture = [...(action.payload.data.lectures)]
                }
                else {
                    state.courseLecture = ""
                }
            })

            .addCase(logout.fulfilled, (state, action) => {

                if (action?.payload) {
                    localStorage.clear();
                    state.myCourse = "";
                    state.courseLecture = "";
                }
            })



    },
});

export default courseSlice.reducer;
