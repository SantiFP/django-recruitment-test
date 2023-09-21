export type Soap = {
  name: string;
  price: number;
  id: number;
  img: string;
  description: string;
};

export type SoapCard = {
  name: string;
  price: number;
  img: string;
  description: string;
  totalAmountHandler: (amount: number, operation: string) => void;
};
