import axiosInstance from "../api/axiosInstance";

//Auth services
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

        return response.data; 
    } catch (error) {
        console.error("Error fetching products by tag:", error.response?.data || error.message);
        throw error; 
    }
}

export async function getProductsByFilterService(filters = {}) {
    try {
        // Remove empty filters
        const validFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== "")
        );

        const response = await axiosInstance.get("/products/filter", {
            params: validFilters, // Axios will automatically format it into query params
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching filtered products:", error.response?.data || error.message);
        throw error;
    }
}




//cart services  

export const addToCartService = async (productId) => {
    const { data } = await axiosInstance.post(`/cart/${productId}`);
    return data;
};

export const getUserCartService = async () => {
    const { data } = await axiosInstance.get("/cart");
    return data;
};

export const deleteProductService = async (productId) => {
    const { data } = await axiosInstance.delete(`/cart/${productId}`);
    return data;
};

export const increaseQuantityService = async (productId) => {
    const { data } = await axiosInstance.patch(`/cart/${productId}/increase`);
    return data;
};

export const decreaseQuantityService = async (productId) => {
    const { data } = await axiosInstance.patch(`/cart/${productId}/decrease`);
    return data;
};

export const deleteAllProductService = async () => {
    const { data } = await axiosInstance.delete("/cart");
    return data;
};