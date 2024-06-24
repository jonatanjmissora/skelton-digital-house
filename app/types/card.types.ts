export type CardsDataTypes = {
    id: number;
    account_id: number;
    number_id: number;
    first_last_name: string;
    cod: number;
    expiration_date: string;
    error?: string
  }
  
  export type NewCardTypes = {
    cod: number;
    expiration_date: string;
    first_last_name: string;
    number_id: number;
  }