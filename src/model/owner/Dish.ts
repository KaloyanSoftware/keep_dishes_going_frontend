export type Dish = {
    id: string,
    menuId: string,
    state: string,
    stockStatus: string,
    name: string,
    type: string,
    tags: string[],
    description: string,
    price: number,
    pictureURL: string
}
