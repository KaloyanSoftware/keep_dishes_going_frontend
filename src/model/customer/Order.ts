import type {CustomerInfo} from "./CustomerInfo.ts";
import type {OrderLine} from "./OrderLine.ts";

export type Order = {
    id: string,
    orderLines: OrderLine[]
    customerInfo: CustomerInfo,
    total: number,
}