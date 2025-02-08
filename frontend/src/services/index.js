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




// Product services
export async function getAllProductsService(limit = 10, skip = 0) {
    const { data } = await axiosInstance.get(`/products?limit=${limit}&skip=${skip}`);
    return data;
}

export async function getProductByIdService(productId) {
    const { data } = await axiosInstance.get(`/products/${productId}`);
    return data;
}

export async function getProductsByCategoryService(categoryId) {
    const { data } = await axiosInstance.get(`/products/category/${categoryId}`);
    return data;
}

export async function getProductsByTagService(tags = []) {
    try {
        if (!Array.isArray(tags) || tags.length === 0) {
            throw new Error("Tags parameter must be a non-empty array");
        }

        const tagQuery = tags.join(",");
        const response = await axiosInstance.get(`/products/tag?tag=${tagQuery}`);

        return response.data; // Ensure you're returning only the necessary data
    } catch (error) {
        console.error("Error fetching products by tag:", error.response?.data || error.message);
        throw error; // Re-throw so the calling function can handle it
    }
}


export async function addToCartService(){
    try {
        
    } catch (error) {
        
    }
}



