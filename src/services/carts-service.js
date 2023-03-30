import instance from "./config/axios"

export function getCarts({ id }) {
    const response = instance.get(`/carts?id=${id}`);
    return response
}

export function createCarts({ customer_id, product, quantity = 1 }) {
    const line_items = [{
        quantity: quantity,
        product_id: product.id,
        variant_id: product.option_set_id || undefined,
    }]
    const response = instance.post(`/carts`, { customer_id, line_items, locale: "en-US", channel_id: 1, });
    return response
}

export function addItemToCarts({ line_items, id }) {
    console.log(line_items)
    let list = line_items?.map((item)=>{
        return({
            quantity: item?.quantity,
            product_id: item?.product_id,
            variant_id: item?.option_set_id || undefined,
        })
    })
    console.log(list)
    const response = instance.post(`/carts/items?id=${id}`, { line_items:list });
    return response
}

//Add endpoints to work with the carts