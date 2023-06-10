export interface Dish {
  _id?: string;
  name: string;
  description: string;
  vegetarian: boolean;
  image: string;
  price: number;
  ingredients: string;
  available: boolean;
  rating: number;
}
