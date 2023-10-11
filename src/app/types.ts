export interface Record {
  id: string;
  amount: number;
  type: string;
  userBalance: number;
  operationResponse: string;
  date: string;
}

export interface OrderKey {
  id: string;
  value: string;
  sx?: object;
}

export interface Operation {
  id: number;
  cost: number;
  type: string;
}
