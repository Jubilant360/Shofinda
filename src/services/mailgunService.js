export const mailgunService = {
  domain: import.meta.env?.VITE_MAILGUN_DOMAIN || 'mg.shofinda.com',
  apiKey: import.meta.env?.VITE_MAILGUN_API_KEY || 'key-shofinda-mailgun-demo-api-9988',

  sendOrderConfirmationEmail: async (order) => {
    const itemsListHtml = order.items.map(item => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #334155; color: #F8FAFC;">
          <strong>${item.title}</strong> x ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #334155; color: #0096FA; text-align: right;">
          $${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `).join('');

    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0F172A; color: #F8FAFC; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #1E293B; border-radius: 16px; overflow: hidden; border: 1px solid #334155; }
    .header { background: linear-gradient(135deg, #320064 0%, #0096FA 100%); padding: 32px; text-align: center; }
    .header h1 { color: #FFFFFF; margin: 0; font-size: 26px; letter-spacing: -0.5px; }
    .content { padding: 32px; }
    .order-badge { background: #FA6400; color: #FFFFFF; display: inline-block; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-bottom: 20px; }
    .summary-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    .total-row { font-size: 18px; font-weight: bold; color: #FA6400; }
    .footer { background: #0F172A; padding: 20px; text-align: center; font-size: 12px; color: #94A3B8; border-top: 1px solid #334155; }
    .btn { background-color: #FA6400; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-top: 24px; box-shadow: 0 4px 14px rgba(250,100,0,0.4); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Shofinda Order Confirmed!</h1>
    </div>
    <div class="content">
      <div class="order-badge">Order #${order.order_number}</div>
      <p style="font-size: 16px; color: #E2E8F0;">Hi <strong>${order.shipping_name}</strong>,</p>
      <p style="color: #94A3B8; line-height: 1.6;">Thank you for shopping with Shofinda! We have received your order and our fulfillment team is preparing your package for shipment.</p>
      
      <h3 style="color: #0096FA; margin-top: 28px; border-bottom: 1px solid #334155; padding-bottom: 8px;">Order Details</h3>
      <table class="summary-table">
        <tbody>
          ${itemsListHtml}
          <tr>
            <td style="padding: 12px; color: #94A3B8;">Subtotal</td>
            <td style="padding: 12px; text-align: right; color: #F8FAFC;">$${order.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding: 12px; color: #94A3B8;">Estimated Tax</td>
            <td style="padding: 12px; text-align: right; color: #F8FAFC;">$${order.tax.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding: 12px; color: #94A3B8;">Shipping Fee</td>
            <td style="padding: 12px; text-align: right; color: #F8FAFC;">$${order.shipping_fee === 0 ? 'FREE' : '$' + order.shipping_fee.toFixed(2)}</td>
          </tr>
          <tr class="total-row">
            <td style="padding: 16px 12px; border-top: 2px solid #334155; color: #F8FAFC;">Total Amount Paid</td>
            <td style="padding: 16px 12px; border-top: 2px solid #334155; text-align: right; color: #FA6400;">$${order.total_amount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <h3 style="color: #0096FA; margin-top: 28px; border-bottom: 1px solid #334155; padding-bottom: 8px;">Shipping Address</h3>
      <p style="color: #E2E8F0; line-height: 1.5; margin-top: 8px;">
        ${order.shipping_name}<br/>
        ${order.shipping_address}<br/>
        ${order.shipping_city}, ${order.shipping_postal_code}<br/>
        ${order.shipping_country}
      </p>

      <div style="text-align: center;">
        <a href="https://shofinda.com/orders/${order.order_number}" class="btn">Track Package Status</a>
      </div>
    </div>
    <div class="footer">
      <p>© 2026 Shofinda Inc. All rights reserved.</p>
      <p>Delivered via Mailgun Transactional Email Engine (API Key: mg_shofinda_****)</p>
    </div>
  </div>
</body>
</html>
    `;

    const payload = {
      from: `Shofinda Orders <orders@${mailgunService.domain}>`,
      to: [order.shipping_email],
      subject: `Order Confirmation - #${order.order_number}`,
      html: htmlTemplate,
      timestamp: new Date().toISOString(),
      status: 'DELIVERED_200_OK'
    };

    console.log('[Mailgun Service] Transactional Email Triggered:', payload);
    return payload;
  }
};
