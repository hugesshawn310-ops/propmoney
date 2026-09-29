export interface CategoryInfo {
  slug: string;
  name: string;
  currencyCode: string;
  symbol: string;
  h1Title: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
}

export const CATEGORIES: Record<string, CategoryInfo> = {
  'australian-dollar': {
    slug: 'australian-dollar',
    name: 'Australian Dollars',
    currencyCode: 'AUD',
    symbol: '$',
    h1Title: 'Australian Dollar (AUD) Prop Money Stacks',
    metaTitle: 'Buy Australian Dollar (AUD) Prop Money Stacks | AUS PROP CASH',
    metaDescription: 'Shop ultra-realistic Reserve Bank of Australia (RBA) compliant AUD replica banknotes ($10, $20, $50, $100). Same-day express dispatch across Australia.',
    description: 'Ultra-realistic cinema-spec Australian Dollar prop banknotes engineered for 4K/8K film, television, music videos, and theater. 100% compliant with RBA guidelines and Crimes (Currency) Act 1981 Section 22.',
  },
  'us-dollar': {
    slug: 'us-dollar',
    name: 'US Dollars',
    currencyCode: 'USD',
    symbol: '$',
    h1Title: 'US Dollar (USD) Movie Prop Cash Stacks',
    metaTitle: 'Buy US Dollar (USD) Prop Money Stacks | AUS PROP CASH',
    metaDescription: 'Cinema-grade US Dollar replica banknote stacks ($5, $10, $20, $50, $100 USD) with authentic greenbacks and non-reflective 110gsm paper stock for film.',
    description: 'Realistic US Dollar prop banknote stacks designed for international films, streaming productions, and photo shoots requiring American currency with camera-ready detail.',
  },
  'british-pound': {
    slug: 'british-pound',
    name: 'British Pounds',
    currencyCode: 'GBP',
    symbol: '£',
    h1Title: 'British Pound (GBP) Replica Prop Notes',
    metaTitle: 'Buy British Pound (GBP) Prop Banknote Stacks | AUS PROP CASH',
    metaDescription: 'UK British Pound (£5, £10, £20, £50 GBP) replica banknotes for film and theatre. Authentic color tones and camera glare suppression.',
    description: 'Realistic British Pound Sterling theatrical prop notes for television dramas, UK co-productions, and international film projects.',
  },
  'euro': {
    slug: 'euro',
    name: 'Euros',
    currencyCode: 'EUR',
    symbol: '€',
    h1Title: 'Euro (EUR) Prop Currency Stacks',
    metaTitle: 'Buy Euro (EUR) Prop Money Stacks | AUS PROP CASH',
    metaDescription: 'European Euro (€5 to €500 EUR) prop currency stacks engineered for high-definition cinematography. Non-reflective linen finish.',
    description: 'Full series of Euro replica banknotes from €5 to €500 featuring dual-sided movie spec markings and high-density printing.',
  },
  'canadian-dollar': {
    slug: 'canadian-dollar',
    name: 'Canadian Dollars',
    currencyCode: 'CAD',
    symbol: 'C$',
    h1Title: 'Canadian Dollar (CAD) Prop Notes',
    metaTitle: 'Buy Canadian Dollar (CAD) Prop Banknotes | AUS PROP CASH',
    metaDescription: 'Canadian Dollar replica banknotes (C$5 to C$100 CAD) with authentic polymer look for film and media production.',
    description: 'Authentic-looking Canadian Dollar replica banknotes built with glare-resistant hybrid paper stock for North American film shoots.',
  },
};
