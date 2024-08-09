export interface Product {
  _id: number;
  title: string;
  author: string;
  publicatio_year: number;
  genre: [string];
  description: string;
  cover_image: string;
  currency: string;
  price: number;
}
