export interface StripePostBody {
  patientId: string;
  priceId: string;
  card: ICard | string;
}
export interface ICard {
  number: string;
  expMonth: number;
  expYear: number;
  cvc: string;
}
