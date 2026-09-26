import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export interface EmailPayload {
  formType: 'order' | 'quote' | 'inquiry' | 'concierge' | 'newsletter' | 'contact';
  orderNumber?: string;
  customer?: {
    fullName?: string;
    productionCompany?: string;
    abn?: string;
    email: string;
    phone?: string;
    address?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
    deliveryMethod?: string;
    paymentMethod?: string;
  };
  items?: Array<{
    id: string;
    name: string;
    denomination: string;
    stackSize: string;
    notesCount: number;
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
  }>;
  pricing?: {
    subtotal: number;
    shippingCost: number;
    gst: number;
    grandTotal: number;
    deliveryMethod?: string;
    paymentMethod?: string;
  };
  studioQuote?: {
    studioName: string;
    abn?: string;
    email: string;
    presetTitle?: string;
    productName?: string;
    stacksCount: number;
    totalNotes: number;
    singleBrickPrice: number;
    discountTier: number;
    finalSubtotal: number;
    gstAmount: number;
    totalIncGst: number;
  };
  inquiry?: {
    name: string;
    email: string;
    phone?: string;
    message: string;
    subject?: string;
  };
  concierge?: {
    projectName: string;
    email: string;
    phone?: string;
    requirements: string;
  };
  newsletter?: {
    email: string;
  };
}

export function getSmtpConfig() {
  const host = process.env.SMTP_HOST || 'smtp.zoho.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE !== 'false'; // default true for 465
  const user = process.env.SMTP_USER || 'sales@propmoneyaustralia.com.au';
  const pass = process.env.SMTP_PASS || 'Mimowhite';
  const from = process.env.EMAIL_FROM || 'sales@propmoneyaustralia.com.au';
  const adminEmail = process.env.EMAIL_TO || process.env.EMAIL_FROM || 'sales@propmoneyaustralia.com.au';

  return { host, port, secure, user, pass, from, adminEmail };
}

export function createTransporter() {
  const config = getSmtpConfig();
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

function getBaseEmailLayout(title: string, bodyContent: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0a0a0a; color: #f5f5f5; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #171717; border-radius: 12px; border: 1px solid #333333; overflow: hidden; }
    .header { background: linear-gradient(135deg, #d97706, #b45309); padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; color: #0a0a0a; font-weight: 800; letter-spacing: 1px; }
    .header p { margin: 4px 0 0 0; font-size: 12px; color: #1c1917; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; }
    .content { padding: 24px; color: #d4d4d4; font-size: 14px; line-height: 1.6; }
    .card { background-color: #262626; border-radius: 8px; border: 1px solid #404040; padding: 16px; margin: 16px 0; }
    .table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
    .table th { text-align: left; padding: 8px; border-bottom: 1px solid #404040; color: #fbbf24; font-weight: 600; }
    .table td { padding: 8px; border-bottom: 1px solid #333333; color: #e5e5e5; }
    .total-row td { font-weight: bold; border-top: 2px solid #525252; color: #fbbf24; font-size: 15px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; background-color: #064e3b; color: #34d399; border: 1px solid #059669; }
    .badge-amber { background-color: #78350f; color: #fde68a; border: 1px solid #d97706; }
    .footer { padding: 20px 24px; text-align: center; font-size: 11px; color: #737373; border-top: 1px solid #262626; }
    .footer a { color: #f59e0b; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>AUS PROP CASH</h1>
      <p>Australian Motion Picture Money • RBA Compliant</p>
    </div>
    <div class="content">
      ${bodyContent}
    </div>
    <div class="footer">
      <p><strong>AUS PROP CASH AUSTRALIA</strong> • Alexandria Logistics Hub, Sydney NSW 2015</p>
      <p>ABN: 51 824 753 190 • Crimes (Currency) Act 1981 Section 22 Compliant</p>
      <p>Official Admin & Sales: <a href="mailto:sales@propmoneyaustralia.com.au">sales@propmoneyaustralia.com.au</a></p>
    </div>
  </div>
</body>
</html>
  `;
}

export async function processEmail(payload: EmailPayload): Promise<{ success: boolean; message: string; details?: any }> {
  const config = getSmtpConfig();
  const transporter = createTransporter();

  try {
    if (payload.formType === 'order') {
      const orderNum = payload.orderNumber || `APC-${Date.now()}`;
      const cust = payload.customer || { email: 'unknown@customer.com' };
      const pricing = payload.pricing || { subtotal: 0, shippingCost: 0, gst: 0, grandTotal: 0 };
      const items = payload.items || [];

      const itemsHtml = items.map(item => `
        <tr>
          <td><strong>${item.name}</strong><br><span style="font-size: 11px; color: #a3a3a3;">${item.stackSize} Note Stack (${item.notesCount} bills)</span></td>
          <td style="text-align: center;">${item.quantity}</td>
          <td style="text-align: right;">$${item.pricePerUnit.toFixed(2)} AUD</td>
          <td style="text-align: right;"><strong>$${(item.pricePerUnit * item.quantity).toFixed(2)} AUD</strong></td>
        </tr>
      `).join('');

      // Admin Email Body
      const adminBody = `
        <h2 style="color: #ffffff; margin-top: 0;">🎬 New Studio Order Received!</h2>
        <div style="margin-bottom: 16px;">
          <span class="badge badge-amber">Order #${orderNum}</span>
          <span class="badge">Payment: ${(cust.paymentMethod || 'Card').toUpperCase()}</span>
        </div>
        <div class="card">
          <h3 style="margin-top: 0; color: #fbbf24; font-size: 14px;">Production & Dispatch Details</h3>
          <p style="margin: 4px 0;"><strong>Customer Name:</strong> ${cust.fullName || 'N/A'}</p>
          <p style="margin: 4px 0;"><strong>Studio / Company:</strong> ${cust.productionCompany || 'Independent'}</p>
          <p style="margin: 4px 0;"><strong>ABN:</strong> ${cust.abn || 'Not Provided'}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${cust.email}" style="color: #fbbf24;">${cust.email}</a></p>
          <p style="margin: 4px 0;"><strong>Phone:</strong> ${cust.phone || 'N/A'}</p>
          <p style="margin: 4px 0;"><strong>Shipping Address:</strong> ${cust.address || ''}, ${cust.suburb || ''} ${cust.state || ''} ${cust.postcode || ''}</p>
          <p style="margin: 4px 0;"><strong>Courier Method:</strong> ${cust.deliveryMethod === 'express' ? '⚡ Express StarTrack / AusPost' : 'Standard Tracked Parcel'}</p>
        </div>

        <div class="card">
          <h3 style="margin-top: 0; color: #fbbf24; font-size: 14px;">Ordered Prop Currency</h3>
          <table class="table">
            <thead>
              <tr>
                <th>Item</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Price</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr>
                <td colspan="3" style="text-align: right;">Subtotal:</td>
                <td style="text-align: right;">$${pricing.subtotal.toFixed(2)} AUD</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right;">Shipping:</td>
                <td style="text-align: right;">${pricing.shippingCost === 0 ? 'FREE' : `$${pricing.shippingCost.toFixed(2)} AUD`}</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right;">Included GST (10%):</td>
                <td style="text-align: right;">$${pricing.gst.toFixed(2)} AUD</td>
              </tr>
              <tr class="total-row">
                <td colspan="3" style="text-align: right;">Grand Total:</td>
                <td style="text-align: right; color: #fbbf24;">$${pricing.grandTotal.toFixed(2)} AUD</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;

      // Customer Confirmation Body
      const customerBody = `
        <h2 style="color: #ffffff; margin-top: 0;">Order Confirmed • Dispatch Scheduled</h2>
        <p>Dear <strong>${cust.fullName || 'Valued Customer'}</strong>,</p>
        <p>Thank you for your order with <strong>AUS PROP CASH</strong>. Your order has been logged with our Sydney fulfillment warehouse. Stamped RBA Section 22 compliance documentation is included with your dispatch.</p>
        
        <div class="card">
          <p style="margin: 0; color: #fbbf24; font-weight: bold;">Order Reference: #${orderNum}</p>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #a3a3a3;">Destination: ${cust.suburb || ''}, ${cust.state || ''} ${cust.postcode || ''}</p>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #a3a3a3;">Shipping: ${cust.deliveryMethod === 'express' ? '⚡ Express StarTrack / AusPost (Next Business Day Metro)' : 'Standard Tracked Parcel'}</p>
        </div>

        <div class="card">
          <h3 style="margin-top: 0; color: #fbbf24; font-size: 14px;">Summary of Items</h3>
          <table class="table">
            <thead>
              <tr>
                <th>Item</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr class="total-row">
                <td colspan="2" style="text-align: right;">Total Paid (Inc GST):</td>
                <td style="text-align: right; color: #fbbf24;">$${pricing.grandTotal.toFixed(2)} AUD</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style="font-size: 12px; color: #a3a3a3;">
          Tracking numbers are uploaded upon courier carrier collection at 4:00 PM AEST. If you require immediate production support or have rush call-sheet deadlines, contact our logistics desk at <a href="mailto:sales@propmoneyaustralia.com.au" style="color: #fbbf24;">sales@propmoneyaustralia.com.au</a> or (02) 9000 8888.
        </p>
      `;

      // Send to Admin
      await transporter.sendMail({
        from: `"AUS PROP CASH Orders" <${config.from}>`,
        to: config.adminEmail,
        replyTo: cust.email,
        subject: `[NEW ORDER] #${orderNum} - $${pricing.grandTotal.toFixed(2)} AUD (${cust.fullName || cust.email})`,
        html: getBaseEmailLayout(`New Order #${orderNum}`, adminBody),
      });

      // Send receipt to Customer
      if (cust.email) {
        try {
          await transporter.sendMail({
            from: `"AUS PROP CASH" <${config.from}>`,
            to: cust.email,
            subject: `[AUS PROP CASH] Order Receipt & RBA Clearance Permit #${orderNum}`,
            html: getBaseEmailLayout(`Order Confirmation #${orderNum}`, customerBody),
          });
        } catch (cErr) {
          console.warn('Customer copy email send warning:', cErr);
        }
      }

      return { success: true, message: `Order #${orderNum} registered and confirmed via Zoho Mail.` };

    } else if (payload.formType === 'quote') {
      const q = payload.studioQuote || {
        studioName: 'Production Company',
        email: 'studio@film.com.au',
        stacksCount: 1,
        totalNotes: 100,
        singleBrickPrice: 89.95,
        discountTier: 0,
        finalSubtotal: 89.95,
        gstAmount: 8.99,
        totalIncGst: 98.94,
      };

      const quoteHtml = `
        <h2 style="color: #ffffff; margin-top: 0;">📋 Instant Studio Bulk PO / Quote Request</h2>
        <div class="card">
          <p><strong>Studio / Production Name:</strong> ${q.studioName}</p>
          <p><strong>ABN:</strong> ${q.abn || 'Not provided'}</p>
          <p><strong>Accounts Email:</strong> <a href="mailto:${q.email}" style="color: #fbbf24;">${q.email}</a></p>
          <p><strong>Scene Preset / Configuration:</strong> ${q.presetTitle || 'Custom Production Order'}</p>
          <p><strong>Banknote Denomination / Product:</strong> ${q.productName || 'AUD Prop Notes'}</p>
          <p><strong>Volume:</strong> ${q.stacksCount} Studio Stacks (${q.totalNotes.toLocaleString()} total prop notes)</p>
          <p><strong>B2B Studio Discount:</strong> ${(q.discountTier * 100).toFixed(0)}% OFF</p>
          <p><strong>Subtotal (ex GST):</strong> $${q.finalSubtotal.toFixed(2)} AUD</p>
          <p><strong>GST (10%):</strong> $${q.gstAmount.toFixed(2)} AUD</p>
          <p style="font-size: 16px; color: #fbbf24; font-weight: bold;">Estimated Total (Inc GST): $${q.totalIncGst.toFixed(2)} AUD</p>
        </div>
      `;

      // Send to Admin
      await transporter.sendMail({
        from: `"AUS PROP CASH Quotes" <${config.from}>`,
        to: config.adminEmail,
        replyTo: q.email,
        subject: `[STUDIO QUOTE] ${q.studioName} - ${q.stacksCount} Stacks ($${q.totalIncGst.toFixed(2)} AUD)`,
        html: getBaseEmailLayout('Studio Bulk Quote Request', quoteHtml),
      });

      // Send Proforma Estimate to Client
      if (q.email) {
        try {
          await transporter.sendMail({
            from: `"AUS PROP CASH Quotes" <${config.from}>`,
            to: q.email,
            subject: `[AUS PROP CASH] Official Studio Proforma Quote: ${q.studioName}`,
            html: getBaseEmailLayout('Official Studio Proforma Estimate', `
              <h2 style="color: #ffffff; margin-top: 0;">Studio Proforma Quote Breakdown</h2>
              <p>Hi ${q.studioName},</p>
              <p>Thank you for submitting your studio volume quote request. Here is your proforma quotation breakdown based on current studio tiered pricing:</p>
              ${quoteHtml}
              <p style="font-size: 12px; color: #a3a3a3;">
                Our production accounts desk will review this requisition within 30 minutes to confirm stock allocation, courier priority, and net-30 purchase order terms if applicable.
              </p>
            `),
          });
        } catch (cErr) {
          console.warn('Customer quote copy send warning:', cErr);
        }
      }

      return { success: true, message: 'Official studio proforma invoice has been dispatched.' };

    } else if (payload.formType === 'inquiry') {
      const inq = payload.inquiry || { name: 'Producer', email: 'producer@studio.com', message: '' };

      const inquiryHtml = `
        <h2 style="color: #ffffff; margin-top: 0;">⚡ Urgent Production Inquiry / Call-back</h2>
        <div class="card">
          <p><strong>Contact / Director Name:</strong> ${inq.name}</p>
          <p><strong>Production Email:</strong> <a href="mailto:${inq.email}" style="color: #fbbf24;">${inq.email}</a></p>
          <p><strong>Phone:</strong> ${inq.phone || 'N/A'}</p>
          <p><strong>Production Message / Requirements:</strong></p>
          <div style="background-color: #171717; padding: 12px; border-radius: 6px; border: 1px solid #404040; white-space: pre-wrap; font-family: monospace;">${inq.message}</div>
        </div>
      `;

      await transporter.sendMail({
        from: `"AUS PROP CASH Support" <${config.from}>`,
        to: config.adminEmail,
        replyTo: inq.email,
        subject: `[URGENT INQUIRY] Production Request from ${inq.name}`,
        html: getBaseEmailLayout('Urgent Production Inquiry', inquiryHtml),
      });

      if (inq.email) {
        try {
          await transporter.sendMail({
            from: `"AUS PROP CASH" <${config.from}>`,
            to: inq.email,
            subject: `[AUS PROP CASH] We received your production inquiry`,
            html: getBaseEmailLayout('Inquiry Received', `
              <h2 style="color: #ffffff; margin-top: 0;">Inquiry Dispatched to Dispatch Desk</h2>
              <p>Hi ${inq.name},</p>
              <p>Your message has been assigned to our on-duty Sydney prop logistics desk. A production manager will review your notes and respond promptly.</p>
              <div class="card"><p style="margin: 0; font-style: italic;">"${inq.message}"</p></div>
            `),
          });
        } catch (cErr) {
          console.warn('Inquiry customer copy warning:', cErr);
        }
      }

      return { success: true, message: 'Production inquiry dispatched successfully.' };

    } else if (payload.formType === 'concierge') {
      const conc = payload.concierge || { projectName: 'Project', email: 'artdept@studio.com', requirements: '' };

      const conciergeHtml = `
        <h2 style="color: #ffffff; margin-top: 0;">🎥 Prop Master Concierge & Art Department Request</h2>
        <div class="card">
          <p><strong>Production / Project Name:</strong> ${conc.projectName}</p>
          <p><strong>Production Email:</strong> <a href="mailto:${conc.email}" style="color: #fbbf24;">${conc.email}</a></p>
          <p><strong>Phone:</strong> ${conc.phone || 'N/A'}</p>
          <p><strong>Specific Set Requirements & Shoot Dates:</strong></p>
          <div style="background-color: #171717; padding: 12px; border-radius: 6px; border: 1px solid #404040; white-space: pre-wrap; font-family: monospace;">${conc.requirements}</div>
        </div>
      `;

      await transporter.sendMail({
        from: `"AUS PROP CASH Concierge" <${config.from}>`,
        to: config.adminEmail,
        replyTo: conc.email,
        subject: `[ART DEPT CONCIERGE] ${conc.projectName} (${conc.email})`,
        html: getBaseEmailLayout('Art Department Concierge Request', conciergeHtml),
      });

      if (conc.email) {
        try {
          await transporter.sendMail({
            from: `"AUS PROP CASH Art Department" <${config.from}>`,
            to: conc.email,
            subject: `[AUS PROP CASH] Concierge Request Received - ${conc.projectName}`,
            html: getBaseEmailLayout('Concierge Request Logged', `
              <h2 style="color: #ffffff; margin-top: 0;">Concierge Request Logged</h2>
              <p>Thank you for reaching out to the AUS PROP CASH Art Department Concierge.</p>
              <p>Our head prop master is reviewing your requirements for <strong>${conc.projectName}</strong>.</p>
            `),
          });
        } catch (cErr) {
          console.warn('Concierge customer copy warning:', cErr);
        }
      }

      return { success: true, message: 'Concierge request sent to art department desk.' };

    } else if (payload.formType === 'newsletter') {
      const email = payload.newsletter?.email || 'subscriber@film.com.au';

      await transporter.sendMail({
        from: `"AUS PROP CASH Club" <${config.from}>`,
        to: config.adminEmail,
        replyTo: email,
        subject: `[NEW SUBSCRIBER] Australian Filmmakers Club - ${email}`,
        html: getBaseEmailLayout('New Club Subscriber', `
          <h2 style="color: #ffffff; margin-top: 0;">New Filmmaker Club Subscriber</h2>
          <div class="card">
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #fbbf24;">${email}</a></p>
            <p><strong>Issued Promo Code:</strong> AUSPROP10 (10% Off)</p>
          </div>
        `),
      });

      try {
        await transporter.sendMail({
          from: `"AUS PROP CASH" <${config.from}>`,
          to: email,
          subject: `[AUS PROP CASH] Welcome! Your 10% Studio Promo Code & Legal Guide`,
          html: getBaseEmailLayout('Welcome to the Creators Club', `
            <h2 style="color: #ffffff; margin-top: 0;">Welcome to the Australian Filmmakers Club!</h2>
            <p>Thank you for joining over 1,200 Australian directors, cinematographers, and creators.</p>
            <div class="card" style="text-align: center;">
              <p style="font-size: 13px; color: #a3a3a3; margin-top: 0;">Use your exclusive 10% studio discount code at checkout:</p>
              <div style="font-size: 24px; font-weight: 900; letter-spacing: 3px; color: #fbbf24; padding: 12px; background-color: #0a0a0a; border-radius: 8px; border: 1px dashed #d97706; display: inline-block;">
                AUSPROP10
              </div>
            </div>
            <p style="font-size: 13px;">
              <strong>RBA Compliance Guide Summary:</strong><br>
              Under Crimes (Currency) Act 1981 Section 22, prop money utilized in Australian productions must feature clear "FOR MOTION PICTURE USE ONLY" markings and altered architectural details. All AUS PROP CASH stacks satisfy this standard 100%.
            </p>
          `),
        });
      } catch (cErr) {
        console.warn('Newsletter welcome email warning:', cErr);
      }

      return { success: true, message: 'Welcome email and 10% code dispatched.' };

    } else {
      // General contact
      const inq = payload.inquiry || { name: 'Customer', email: 'customer@domain.com', message: '' };
      await transporter.sendMail({
        from: `"AUS PROP CASH Contact" <${config.from}>`,
        to: config.adminEmail,
        replyTo: inq.email,
        subject: `[CONTACT] ${inq.subject || 'Website Message'} from ${inq.name}`,
        html: getBaseEmailLayout('Website Message', `
          <div class="card">
            <p><strong>From:</strong> ${inq.name} (${inq.email})</p>
            <p><strong>Phone:</strong> ${inq.phone || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p>${inq.message}</p>
          </div>
        `),
      });

      return { success: true, message: 'Message sent successfully.' };
    }
  } catch (error: any) {
    console.error('SMTP Process Error:', error);
    return {
      success: false,
      message: error?.message || 'SMTP Connection Error',
      details: error,
    };
  }
}
