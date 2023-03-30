import instance from "./config/axios"

export function getCarts({ id }) {
    const response = instance.get(`/carts?id=${id}`);
    return response
}

export function createCarts({ customer_id, product, quantity = 1 }) {
    const line_items = [{
        quantity: 1,
        product_id: product.id,
        variant_id: product.option_set_id || undefined,
    }]
    const response = instance.post(`/carts`, { customer_id, line_items, locale: "en-US", channel_id: 1, });
    return response

}