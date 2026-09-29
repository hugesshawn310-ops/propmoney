export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishDate: string;
  readTime: string;
  category: string;
  image: string;
  relatedProductSlugs: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-prop-money-is-used-in-film',
    title: 'How Prop Money Is Used in Australian Film, TV & Commercial Productions',
    excerpt: 'An insider look into cinema art departments: camera lighting tests, Reserve Bank of Australia compliance, and handling prop banknotes on high-definition sets.',
    author: 'AUS PROP CASH Art Department',
    authorRole: 'Master Prop Fabricators & Set Dressers',
    publishDate: '2026-08-15',
    readTime: '6 min read',
    category: 'Cinematography & Props',
    image: '/hero-fullscreen.jpg',
    relatedProductSlugs: [
      'buy-counterfeit-aud-100-dollar-banknotes',
      'buy-counterfeit-aud-50-dollar-banknotes',
      'buy-counterfeit-aud-20-dollar-banknotes'
    ],
    content: `
## The Art and Law of Screen Currency in Australia

Filming realistic heist sequences, crime dramas, rap music videos, or theater scenes in Australia requires high-visual-fidelity cash that withstands extreme macro camera scrutiny. However, handling reproduction currency carries serious legal responsibilities under Australian federal law.

### 1. Camera Glare Suppression and Sensor Testing
Genuine Australian polymer banknotes feature high-gloss transparent windows and reflective inks that cause harsh specular highlights under 10,000-watt HMI lights and high-end digital sensors (such as ARRI Alexa 35, RED V-Raptor, and Sony Venice). 

At AUS PROP CASH, our banknotes are produced on non-reflective 110gsm hybrid linen-smooth paper stock. Under harsh set lighting, this absorbs flash glare while preserving vibrant Australian ocean-blue ($10), ruby-red ($20), golden-yellow ($50), and emerald-green ($100) color gamuts.

### 2. Legal Compliance Under the Crimes (Currency) Act 1981
Section 22 of the Commonwealth Crimes (Currency) Act 1981 regulates reproduction of Australian banknotes. To remain 100% compliant with the Reserve Bank of Australia (RBA):
- Every prop banknote displays prominent, permanent **"FOR MOTION PICTURE USE ONLY"** and **"PROP SPECIMEN - NOT LEGAL TENDER"** notices.
- Architectural and portrait artwork incorporates deliberate dimensional alterations (over 1.5 times or less than 0.5 times specific genuine security micro-lines).
- Security threads, metallic foil patches, and UV fluorescent security features are deliberately omitted.
- The notes will not pass automated banking machines, banknote acceptors, or cash registers.

### 3. Thumb-Flipping and Tactile Properties
Actors and prop handlers need currency that fans out smoothly without sticking together or sliding unnaturally. Our proprietary finishing gives actors the authentic resistance and audible "snap" required for believable close-up counting scenes.

### 4. Logistics & On-Set Production Documentation
State film bodies—including Screen Australia, Screen NSW, VicScreen, and Screen Queensland—frequently require an Art Department clearance chain of title. Every AUS PROP CASH order includes an official Theatrical Currency Compliance Certificate and RBA Legal Clearance Dossier for production files.
    `.trim()
  },
  {
    slug: 'rba-compliance-guide-for-filmmakers',
    title: 'Reserve Bank of Australia Compliance Guide for Screen Producers',
    excerpt: 'Essential legal considerations for line producers, directors, and props masters ordering theatrical banknotes in Australia.',
    author: 'Legal & Standards Desk',
    authorRole: 'Production Compliance Advisory',
    publishDate: '2026-08-28',
    readTime: '5 min read',
    category: 'Legal & Clearance',
    image: '/hero-australian-cash.jpg',
    relatedProductSlugs: [
      'buy-counterfeit-aud-50-dollar-banknotes',
      'buy-counterfeit-aud-100-dollar-banknotes'
    ],
    content: `
## Guidelines for Sourcing and Clearing Replica Currency in Australia

Navigating legal regulations on set ensures uninterrupted production workflows. This guide breaks down what Australian production managers need to know before filming with prop banknotes.

### 1. The Statutory Framework
The Reserve Bank of Australia (RBA) maintains strict policies against counterfeiting while providing clear reproduction exceptions for legitimate theatrical, artistic, and educational use under Crimes (Currency) Act 1981 (Cth).

### 2. Transporting Prop Cash to Location Shoots
When travelling between states (e.g. flying from Sydney Airport to Melbourne or the Gold Coast), keep prop cash in sealed cases with your production call-sheet and our official Theatrical Compliance Certificate.

### 3. Responsible Disposal After Production Wrap
Prop money must never be left in public spaces, dumped in open waste bins, or given away as real currency. Production departments should maintain inventory counts and securely store or destroy used prop stacks.
    `.trim()
  }
];
