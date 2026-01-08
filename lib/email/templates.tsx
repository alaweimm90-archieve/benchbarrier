/**
 * Email Templates
 * Brutalist-themed transactional email templates
 */

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

interface OrderConfirmationData {
  orderNumber: string
  customerName: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  subtotal: number
  tax: number
  shipping: number
  total: number
  shippingAddress?: {
    name: string
    line1: string
    line2?: string
    city: string
    state: string
    postal_code: string
    country: string
  }
}

export function orderConfirmationEmail(data: OrderConfirmationData): EmailTemplate {
  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Courier New', monospace;
      background-color: #0a0a0a;
      color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      background-color: #3b82f6;
      color: #0a0a0a;
      padding: 24px;
      text-align: center;
      border: 4px solid #0a0a0a;
      margin-bottom: 32px;
    }
    .header h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .content {
      background-color: #1a1a1a;
      border: 4px solid #3b82f6;
      padding: 32px;
      margin-bottom: 24px;
    }
    .order-number {
      font-size: 18px;
      font-weight: 700;
      color: #3b82f6;
      margin-bottom: 24px;
      text-transform: uppercase;
    }
    .section {
      margin-bottom: 32px;
    }
    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: #3b82f6;
      text-transform: uppercase;
      margin-bottom: 16px;
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 8px;
    }
    .item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #333;
    }
    .item:last-child {
      border-bottom: none;
    }
    .item-name {
      font-weight: 600;
    }
    .item-details {
      color: #999;
      font-size: 14px;
    }
    .item-price {
      font-weight: 700;
      color: #3b82f6;
    }
    .totals {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 2px solid #3b82f6;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 14px;
    }
    .total-row.final {
      font-size: 20px;
      font-weight: 900;
      color: #3b82f6;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 2px solid #3b82f6;
    }
    .address {
      line-height: 1.6;
      color: #ccc;
    }
    .footer {
      text-align: center;
      color: #666;
      font-size: 12px;
      padding: 24px;
      border-top: 2px solid #333;
    }
    .button {
      display: inline-block;
      background-color: #3b82f6;
      color: #0a0a0a;
      padding: 16px 32px;
      text-decoration: none;
      font-weight: 900;
      text-transform: uppercase;
      border: 4px solid #0a0a0a;
      margin: 24px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏋️ BenchBarrier</h1>
    </div>
    
    <div class="content">
      <div class="order-number">
        Order #${data.orderNumber}
      </div>
      
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
        Hey ${data.customerName},<br><br>
        Thanks for your order! We're getting your gear ready to ship. You'll receive a shipping confirmation email once your order is on its way.
      </p>
      
      <div class="section">
        <div class="section-title">Order Items</div>
        ${data.items.map(item => `
          <div class="item">
            <div>
              <div class="item-name">${item.name}</div>
              <div class="item-details">Qty: ${item.quantity}</div>
            </div>
            <div class="item-price">${formatPrice(item.price * item.quantity)}</div>
          </div>
        `).join('')}
      </div>
      
      ${data.shippingAddress ? `
      <div class="section">
        <div class="section-title">Shipping Address</div>
        <div class="address">
          ${data.shippingAddress.name}<br>
          ${data.shippingAddress.line1}<br>
          ${data.shippingAddress.line2 ? `${data.shippingAddress.line2}<br>` : ''}
          ${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.postal_code}<br>
          ${data.shippingAddress.country}
        </div>
      </div>
      ` : ''}
      
      <div class="totals">
        <div class="total-row">
          <span>Subtotal</span>
          <span>${formatPrice(data.subtotal)}</span>
        </div>
        <div class="total-row">
          <span>Tax</span>
          <span>${formatPrice(data.tax)}</span>
        </div>
        <div class="total-row">
          <span>Shipping</span>
          <span>${data.shipping === 0 ? 'FREE' : formatPrice(data.shipping)}</span>
        </div>
        <div class="total-row final">
          <span>TOTAL</span>
          <span>${formatPrice(data.total)}</span>
        </div>
      </div>
      
      <div style="text-align: center;">
        <a href="https://benchbarrier.vercel.app/orders/${data.orderNumber}" class="button">
          Track Order
        </a>
      </div>
    </div>
    
    <div class="footer">
      <p>Questions? Email us at support@benchbarrier.com</p>
      <p>© 2026 BenchBarrier. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `

  const text = `
BenchBarrier - Order Confirmation

Order #${data.orderNumber}

Hey ${data.customerName},

Thanks for your order! We're getting your gear ready to ship.

ORDER ITEMS:
${data.items.map(item => `- ${item.name} (Qty: ${item.quantity}) - ${formatPrice(item.price * item.quantity)}`).join('\n')}

${data.shippingAddress ? `
SHIPPING ADDRESS:
${data.shippingAddress.name}
${data.shippingAddress.line1}
${data.shippingAddress.line2 || ''}
${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.postal_code}
${data.shippingAddress.country}
` : ''}

SUMMARY:
Subtotal: ${formatPrice(data.subtotal)}
Tax: ${formatPrice(data.tax)}
Shipping: ${data.shipping === 0 ? 'FREE' : formatPrice(data.shipping)}
TOTAL: ${formatPrice(data.total)}

Track your order: https://benchbarrier.vercel.app/orders/${data.orderNumber}

Questions? Email us at support@benchbarrier.com

© 2026 BenchBarrier. All rights reserved.
  `

  return {
    subject: `Order Confirmation #${data.orderNumber} - BenchBarrier`,
    html: html.trim(),
    text: text.trim(),
  }
}

interface AbandonedCartData {
  customerName: string
  cartItems: Array<{
    name: string
    price: number
    image?: string
  }>
  cartTotal: number
  cartUrl: string
}

export function abandonedCartEmail(data: AbandonedCartData): EmailTemplate {
  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Cart is Waiting</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Courier New', monospace;
      background-color: #0a0a0a;
      color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      background-color: #3b82f6;
      color: #0a0a0a;
      padding: 24px;
      text-align: center;
      border: 4px solid #0a0a0a;
      margin-bottom: 32px;
    }
    .header h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 900;
      text-transform: uppercase;
    }
    .content {
      background-color: #1a1a1a;
      border: 4px solid #3b82f6;
      padding: 32px;
      text-align: center;
    }
    .emoji {
      font-size: 64px;
      margin-bottom: 24px;
    }
    .message {
      font-size: 18px;
      line-height: 1.6;
      margin-bottom: 32px;
    }
    .cart-items {
      margin: 32px 0;
      text-align: left;
    }
    .cart-item {
      padding: 16px;
      border: 2px solid #333;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .item-name {
      font-weight: 700;
      color: #3b82f6;
    }
    .item-price {
      font-weight: 900;
      font-size: 18px;
    }
    .total {
      font-size: 24px;
      font-weight: 900;
      color: #3b82f6;
      margin: 24px 0;
    }
    .button {
      display: inline-block;
      background-color: #3b82f6;
      color: #0a0a0a;
      padding: 20px 40px;
      text-decoration: none;
      font-weight: 900;
      text-transform: uppercase;
      border: 4px solid #0a0a0a;
      font-size: 18px;
      margin: 24px 0;
    }
    .footer {
      text-align: center;
      color: #666;
      font-size: 12px;
      padding: 24px;
      margin-top: 32px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏋️ BenchBarrier</h1>
    </div>
    
    <div class="content">
      <div class="emoji">🛒</div>
      
      <div class="message">
        <strong>Hey ${data.customerName}!</strong><br><br>
        You left some awesome gear in your cart. Don't miss out on leveling up your fitness game!
      </div>
      
      <div class="cart-items">
        ${data.cartItems.map(item => `
          <div class="cart-item">
            <div class="item-name">${item.name}</div>
            <div class="item-price">${formatPrice(item.price)}</div>
          </div>
        `).join('')}
      </div>
      
      <div class="total">
        Total: ${formatPrice(data.cartTotal)}
      </div>
      
      <a href="${data.cartUrl}" class="button">
        Complete Your Order
      </a>
      
      <p style="margin-top: 32px; color: #999; font-size: 14px;">
        Free shipping on orders over $100 • 30-day returns • Lifetime warranty
      </p>
    </div>
    
    <div class="footer">
      <p>Not interested? <a href="#" style="color: #3b82f6;">Unsubscribe</a></p>
      <p>© 2026 BenchBarrier. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `

  const text = `
BenchBarrier - Your Cart is Waiting

Hey ${data.customerName}!

You left some awesome gear in your cart:

${data.cartItems.map(item => `- ${item.name} - ${formatPrice(item.price)}`).join('\n')}

Total: ${formatPrice(data.cartTotal)}

Complete your order: ${data.cartUrl}

Free shipping on orders over $100 • 30-day returns • Lifetime warranty

© 2026 BenchBarrier. All rights reserved.
  `

  return {
    subject: 'Your BenchBarrier Cart is Waiting 🛒',
    html: html.trim(),
    text: text.trim(),
  }
}

export function welcomeEmail(customerName: string): EmailTemplate {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to BenchBarrier</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Courier New', monospace;
      background-color: #0a0a0a;
      color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      background-color: #3b82f6;
      color: #0a0a0a;
      padding: 32px;
      text-align: center;
      border: 4px solid #0a0a0a;
      margin-bottom: 32px;
    }
    .header h1 {
      margin: 0 0 16px 0;
      font-size: 40px;
      font-weight: 900;
      text-transform: uppercase;
    }
    .content {
      background-color: #1a1a1a;
      border: 4px solid #3b82f6;
      padding: 32px;
    }
    .message {
      font-size: 16px;
      line-height: 1.8;
      margin-bottom: 32px;
    }
    .features {
      margin: 32px 0;
    }
    .feature {
      padding: 20px;
      border: 2px solid #3b82f6;
      margin-bottom: 16px;
      background-color: #0a0a0a;
    }
    .feature-title {
      font-size: 18px;
      font-weight: 900;
      color: #3b82f6;
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    .button {
      display: inline-block;
      background-color: #3b82f6;
      color: #0a0a0a;
      padding: 20px 40px;
      text-decoration: none;
      font-weight: 900;
      text-transform: uppercase;
      border: 4px solid #0a0a0a;
      font-size: 18px;
      margin: 24px 0;
    }
    .footer {
      text-align: center;
      color: #666;
      font-size: 12px;
      padding: 24px;
      margin-top: 32px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏋️ Welcome!</h1>
      <p style="margin: 0; font-size: 18px; font-weight: 700;">You're now part of the BenchBarrier family</p>
    </div>
    
    <div class="content">
      <div class="message">
        <strong>Hey ${customerName}!</strong><br><br>
        Welcome to BenchBarrier – where fitness meets innovation. We're stoked to have you here!<br><br>
        We're not just about selling gear. We're about helping you break through barriers and reach your fitness goals.
      </div>
      
      <div class="features">
        <div class="feature">
          <div class="feature-title">💪 Premium Quality</div>
          <p style="margin: 0; color: #ccc;">Military-grade equipment built to last a lifetime</p>
        </div>
        
        <div class="feature">
          <div class="feature-title">🚚 Free Shipping</div>
          <p style="margin: 0; color: #ccc;">On all orders over $100 – no hidden fees</p>
        </div>
        
        <div class="feature">
          <div class="feature-title">🎓 Student Discount</div>
          <p style="margin: 0; color: #ccc;">15% off for students – because gains shouldn't break the bank</p>
        </div>
        
        <div class="feature">
          <div class="feature-title">🔄 30-Day Returns</div>
          <p style="margin: 0; color: #ccc;">Not satisfied? Full refund, no questions asked</p>
        </div>
      </div>
      
      <div style="text-align: center;">
        <a href="https://benchbarrier.vercel.app/products" class="button">
          Shop Now
        </a>
      </div>
      
      <p style="margin-top: 32px; color: #999; font-size: 14px; text-align: center;">
        Questions? Hit us up at support@benchbarrier.com
      </p>
    </div>
    
    <div class="footer">
      <p>© 2026 BenchBarrier. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `

  const text = `
BenchBarrier - Welcome!

Hey ${customerName}!

Welcome to BenchBarrier – where fitness meets innovation. We're stoked to have you here!

We're not just about selling gear. We're about helping you break through barriers and reach your fitness goals.

WHAT YOU GET:
💪 Premium Quality - Military-grade equipment built to last
🚚 Free Shipping - On all orders over $100
🎓 Student Discount - 15% off for students
🔄 30-Day Returns - Full refund, no questions asked

Shop now: https://benchbarrier.vercel.app/products

Questions? Hit us up at support@benchbarrier.com

© 2026 BenchBarrier. All rights reserved.
  `

  return {
    subject: 'Welcome to BenchBarrier! 🏋️',
    html: html.trim(),
    text: text.trim(),
  }
}
