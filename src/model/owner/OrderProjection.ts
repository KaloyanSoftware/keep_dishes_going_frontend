import type {DeliveryInfo} from "./DeliveryInfo.ts";

export type OrderProjection = {
    orderId: string,
    restaurantId: string,
    deliveryInfo: DeliveryInfo
    orderLines: Record<string, number>,
    status: string
}