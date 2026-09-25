export interface Flavor {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  price: number;
  image: string;
  description: string;
  tastingNotes: string[];
  ingredients: string[];
  allergens: string[];
  origin: string;
  featured?: boolean;
}

export interface CartItem {
  flavor: Flavor;
  quantity: number;
}

export type NavTab = 'home' | 'flavors' | 'heritage' | 'contact';

export interface InquiryForm {
  firstName: string;
  lastName: string;
  email: string;
  inquiryType: string;
  message: string;
}
