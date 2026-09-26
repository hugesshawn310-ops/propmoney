export interface OrderEmailData {
  orderNumber: string;
  customer: {
    fullName: string;
    productionCompany: string;
    abn: string;
    email: string;
    phone: string;
    address: string;
    suburb: string;
    state: string;
    postcode: string;
    deliveryMethod: string;
    paymentMethod: string;
  };
  items: Array<{
    id: string;
    name: string;
    denomination: string;
    stackSize: string;
    notesCount: number;
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
  }>;
  pricing: {
    subtotal: number;
    shippingCost: number;
    gst: number;
    grandTotal: number;
    deliveryMethod: string;
    paymentMethod: string;
  };
}

export interface QuoteEmailData {
  studioName: string;
  abn?: string;
  email: string;
  presetTitle: string;
  productName: string;
  stacksCount: number;
  totalNotes: number;
  singleBrickPrice: number;
  discountTier: number;
  finalSubtotal: number;
  gstAmount: number;
  totalIncGst: number;
}

export interface InquiryEmailData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ConciergeEmailData {
  projectName: string;
  email: string;
  phone?: string;
  requirements: string;
}

export async function sendOrderConfirmation(data: OrderEmailData) {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'order',
        orderNumber: data.orderNumber,
        customer: data.customer,
        items: data.items,
        pricing: data.pricing,
      }),
    });
    return await res.json();
  } catch (err: any) {
    console.error('Failed to dispatch order email:', err);
    return { success: false, error: err.message };
  }
}

export async function sendQuoteRequest(data: QuoteEmailData) {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'quote',
        studioQuote: data,
      }),
    });
    return await res.json();
  } catch (err: any) {
    console.error('Failed to dispatch quote email:', err);
    return { success: false, error: err.message };
  }
}

export async function sendStudioInquiry(data: InquiryEmailData) {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'inquiry',
        inquiry: data,
      }),
    });
    return await res.json();
  } catch (err: any) {
    console.error('Failed to dispatch studio inquiry:', err);
    return { success: false, error: err.message };
  }
}

export async function sendConciergeInquiry(data: ConciergeEmailData) {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'concierge',
        concierge: data,
      }),
    });
    return await res.json();
  } catch (err: any) {
    console.error('Failed to dispatch concierge inquiry:', err);
    return { success: false, error: err.message };
  }
}

export async function sendNewsletterSubscription(email: string) {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'newsletter',
        newsletter: { email },
      }),
    });
    return await res.json();
  } catch (err: any) {
    console.error('Failed to dispatch newsletter subscription:', err);
    return { success: false, error: err.message };
  }
}
