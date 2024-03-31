export type PlansTypes = "weekly" | "monthly" | "yearly";


export interface PlanProps {
    /**
     * 
     * @returns period of the payment plan
     * "weekly" | "monthly" | "yearly" 
     */
    value: PlansTypes;

    /**
     * 
     * @returns price of the payment plan
     */
    price: number;

    /**
     * 
     * @returns per of the payment plan
     */
    per?: string;

    /**
     * 
     * @returns description of the payment plan
     */
    description?: string;

    // currency: string;

    /**
     * 
     * @returns type of currency of the payment plan
     */
    currency?: "usd" | string;

    /**
     * 
     * @returns discount of the payment plan
     */
    "discount-percentage": number;
}