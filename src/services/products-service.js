import instance from "./config/axios"

export function getProducts({page, limit}) {
    const response = instance.get(`/products?page=${page}&limit=${limit}`);
    return response
}

