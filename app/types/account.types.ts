export type ActivityDataTypes = {
    id: number;
    account_id: number;
    type: string;
    description: string;
    origin: string;
    destination: string;
    amount: number;
    dated: string;
    error?: string;
}