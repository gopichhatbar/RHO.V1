export interface RummyApp {
 id: number;
  slug: string;
  name: string;
  images: string[]; // ✅ added
  logo: string
  tagline: string;
  rating: number;
  reviews: string;
  bonus: string;
  minWithdraw: string;
  category: string[];
  featured?: boolean;
  color: string;
  description: string;
  pros: string[];
  cons: string[];
  paymentMethods: string[];
  platforms: string[];
  gameTypes: string[];
  maxBonus: string;
  referralBonus: string;
  established: string;
    downloadUrl: string;
}

