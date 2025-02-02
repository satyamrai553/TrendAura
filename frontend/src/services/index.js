import axiosInstance from "../api/axiosInstance";


export async function registerService(formData){
    const {data} = await axiosInstance.post("/users/register", {
        ...formData,
    });
    return data
}

export async function loginService(formData){
    
    const {data} = await axiosInstance.post("/users/login", formData)
    return data
}

export async function checkAuthService(){
    const {data} = await axiosInstance.get("/users/current-user");
    return data
}

export async function logoutService(){
    const {data} = await axiosInstance.post("/users/logout")
    return data
}

export async function avatarUploadService(formData, onProgressCallback){
    const {data} = await axiosInstance.post("/users/avatar", formData, {
        onUploadProgress: (progressEvent) =>{
            const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgressCallback(percentCompleted)
        },
    });
    return data;
}



