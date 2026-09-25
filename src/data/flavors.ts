import { Flavor } from '../types';
import { ASSETS } from './assets';

export const FLAVORS: Flavor[] = [
  {
    id: 'moon-milk-kulfi',
    name: 'Moon Milk Kulfi',
    subtitle: 'Signature Celestial Blend',
    tagline: 'Our heritage slow-churned malai kulfi.',
    price: 50.00,
    image: ASSETS.saffronKulfi, 
    description: 'The classic that started it all. Rich, slow-reduced milk simmering for hours to concentrate its natural sweetness, offering a dense, luxurious texture.',
    tastingNotes: ['Caramelized Sweet Milk', 'Rich Cream'],
    ingredients: ['Whole grass-fed milk', 'Organic cane sugar', 'Pure cream'],
    allergens: ['Dairy'],
    origin: 'Artisan Crafted',
    featured: true,
  },
  {
    id: 'authentic-jigarthanda',
    name: 'Authentic Jigarthanda',
    subtitle: 'Madurai Royal Cooler',
    tagline: 'The iconic soul-cooling dessert drink.',
    price: 80.00,
    image: ASSETS.simmeringMilk, 
    description: 'A genuine tribute to the legendary local classic. Hand-churned almond gum (badam pisin), nannari syrup, and reduced milk, topped with a scoop of our signature ice cream.',
    tastingNotes: ['Cooling Nannari', 'Rich Caramel Milk', 'Earthy Almond Gum'],
    ingredients: ['Whole milk', 'Badam Pisin', 'Nannari Syrup', 'Organic cane sugar'],
    allergens: ['Dairy', 'Tree Nuts'],
    origin: 'Madurai, Tamil Nadu',
    featured: true,
  }
];