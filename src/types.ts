export type Denomination = '5' | '10' | '20' | '50' | '100' | '200' | '500' | 'bundle' | string;

export type PageId =
  | 'home'
  | 'shop'
  | 'full-stacks'
  | 'rba-guidelines'
  | 'bulk-studio'
  | 'studio-portal';

export type StackSize = '50' | '100' | '250' | '1000';

export interface StackOption {
  size: StackSize;
  label: string;
  notesCount: number;
  multiplier: number;
  badge?: string;
}

export interface Product {
  id: string;
  name: string;
  slug?: string;
  sku?: string;
  currency?: string;
  category?: string;
  image?: string;
  denomination: Denomination;
  faceValue: number;
  tag?: string;
  colorName: string;
  accentColor: string;
  bgGradient: string;
  borderColor: string;
  basePrice: number; // Base stack price
  rating: number;
  reviewsCount: number;
  shortDesc: string;
  seoKeywords: string[];
  fullDesc: string;
  rbaComplianceDetails: string;
  specifications: {
    paperWeight: string;
    finish: string;
    dimensions: string;
    printSides: string;
    safetyMarkings: string;
    cameraTested: string;
  };
  features: string[];
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  stackSize: StackSize;
  notesCount: number;
  pricePerUnit: number;
  quantity: number;
}

export interface CityDispatch {
  city: string;
  state: string;
  transitExpress: string;
  transitStandard: string;
  hub: string;
  localStudioNote: string;
  badge: string;
}

export interface StudioReview {
  id: string;
  author: string;
  role: string;
  project: string;
  city: string;
  rating: number;
  comment: string;
  verifiedStudio: boolean;
  date: string;
}
