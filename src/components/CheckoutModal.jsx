import React, { useState } from 'react';
import { X, Check, Lock, CreditCard, Truck, User, ArrowLeft, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  user, 
  discountPercentage, 
  onCompleteOrder,
  onOpenAuthModal
}) {
  const [step, setStep] = useState(1);

  // Form State Step 1
  const [formData, setFormData] = useState({
    fullName: user ? user.full_name : '',
    email: user ? user.email : '',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    postalCode: '94107',
    country: 'United States'
  });

  // Step 2 Shipping Method
  const [shippingMethod, setShippingMethod] = useState('standard'); // standard, express, overnight

  // Step 3 Payment Details
  const [paymentMethod, setPaymentMethod] = useState('card'); // card, google_pay
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4242 •••• •••• 4242',
    expDate: '12/28',
    cvv: '888',
    cardHolder: user ? user.full_name : 'Alex Vance'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * (discountPercentage / 100));
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);

  const shippingFees = {
    standard: subtotal >= 100 ? 0 : 7.99,
    express: 15.00,
    overnight: 29.00
  };

  const selectedShippingFee = shippingFees[shippingMethod];
  const tax = discountedSubtotal * 0.08; // 8% estimated tax
  const totalAmount = discountedSubtotal + selectedShippingFee + tax;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order placement delay
    setTimeout(() => {
      setIsProcessing(false);
      onCompleteOrder({
        subtotal: discountedSubtotal,
        tax,
        shippingFee: selectedShippingFee,
        totalAmount,
        shippingName: formData.fullName,
        shippingEmail: formData.email,
        shippingAddress: formData.address,
        shippingCity: formData.city,
        shippingPostalCode: formData.postalCode,
        shippingCountry: formData.country,
        paymentMethod,
        items: cartItems
      });
    }, 1800);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      
      <div 
        className="animate-fade-in"
        style={{
          background: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '24px',
          maxWidth: '960px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))'
        }}
      >
        {/* Header Close */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: '#0F172A', border: '1px solid #334155', color: '#94A3B8', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={18} />
        </button>

        {/* Left Step Form */}
        <div style={{ padding: '2rem' }}>
          
          {/* Step Wizard Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid #334155', paddingBottom: '1rem' }}>
            {[
              { num: 1, title: 'Shipping' },
              { num: 2, title: 'Delivery' },
              { num: 3, title: 'Payment' }
            ].map((s) => (
              <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: step >= s.num ? 1 : 0.4 }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: step > s.num ? '#10B981' : (step === s.num ? '#0096FA' : '#334155'),
                  color: '#FFF',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {step > s.num ? <Check size={16} /> : s.num}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: step === s.num ? '#0096FA' : '#FFF' }}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>

          {/* STEP 1: SHIPPING DETAILS */}
          {step === 1 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#FFF' }}>1. Contact & Shipping Address</h3>
                {!user && (
                  <button 
                    onClick={onOpenAuthModal} 
                    style={{ background: 'rgba(0, 150, 250, 0.1)', border: 'none', color: '#0096FA', fontSize: '0.75rem', fontWeight: '700', padding: '0.3rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    Google Autofill
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94A3B8', fontWeight: '600', marginBottom: '0.3rem' }}>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Jane Doe"
                    style={{ width: '100%', background: '#0F172A', border: errors.fullName ? '1px solid #EF4444' : '1px solid #334155', borderRadius: '8px', padding: '0.6rem', color: '#FFF', fontSize: '0.875rem' }}
                  />
                  {errors.fullName && <span style={{ fontSize: '0.75rem', color: '#EF4444' }}>{errors.fullName}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94A3B8', fontWeight: '600', marginBottom: '0.3rem' }}>Email Address (Receipt will be sent via Mailgun)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jane@example.com"
                    style={{ width: '100%', background: '#0F172A', border: errors.email ? '1px solid #EF4444' : '1px solid #334155', borderRadius: '8px', padding: '0.6rem', color: '#FFF', fontSize: '0.875rem' }}
                  />
                  {errors.email && <span style={{ fontSize: '0.75rem', color: '#EF4444' }}>{errors.email}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94A3B8', fontWeight: '600', marginBottom: '0.3rem' }}>Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Innovation Way"
                    style={{ width: '100%', background: '#0F172A', border: errors.address ? '1px solid #EF4444' : '1px solid #334155', borderRadius: '8px', padding: '0.6rem', color: '#FFF', fontSize: '0.875rem' }}
                  />
                  {errors.address && <span style={{ fontSize: '0.75rem', color: '#EF4444' }}>{errors.address}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94A3B8', fontWeight: '600', marginBottom: '0.3rem' }}>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      style={{ width: '100%', background: '#0F172A', border: errors.city ? '1px solid #EF4444' : '1px solid #334155', borderRadius: '8px', padding: '0.6rem', color: '#FFF', fontSize: '0.875rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94A3B8', fontWeight: '600', marginBottom: '0.3rem' }}>Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      style={{ width: '100%', background: '#0F172A', border: errors.postalCode ? '1px solid #EF4444' : '1px solid #334155', borderRadius: '8px', padding: '0.6rem', color: '#FFF', fontSize: '0.875rem' }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  className="btn-primary"
                  style={{ marginTop: '1rem', width: '100%', justifyContent: 'center', padding: '0.75rem' }}
                >
                  <span>Continue to Shipping Method</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SHIPPING METHOD */}
          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#FFF', marginBottom: '1.25rem' }}>2. Select Shipping Method</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  { id: 'standard', name: 'Standard Delivery', time: '3 - 5 Business Days', fee: shippingFees.standard },
                  { id: 'express', name: 'Express Air Shipping', time: '1 - 2 Business Days', fee: shippingFees.express },
                  { id: 'overnight', name: 'Overnight Courier Priority', time: 'Next Morning Delivery', fee: shippingFees.overnight }
                ].map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setShippingMethod(option.id)}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      background: '#0F172A',
                      border: shippingMethod === option.id ? '2px solid #0096FA' : '1px solid #334155',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Truck size={20} color={shippingMethod === option.id ? '#0096FA' : '#94A3B8'} />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#FFF' }}>{option.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{option.time}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: '800', color: option.fee === 0 ? '#10B981' : '#0096FA' }}>
                      {option.fee === 0 ? 'FREE' : `$${option.fee.toFixed(2)}`}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => setStep(1)}
                  className="btn-outline"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <ArrowLeft size={18} /> Back
                </button>
                <button
                  onClick={handleNextStep}
                  className="btn-primary"
                  style={{ flex: 2, justifyContent: 'center' }}
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT & FINAL REVIEW */}
          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#FFF', marginBottom: '1.25rem' }}>3. Secure Payment</h3>

              {/* Payment Tabs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <button
                  onClick={() => setPaymentMethod('card')}
                  style={{
                    padding: '0.65rem',
                    borderRadius: '10px',
                    background: paymentMethod === 'card' ? 'rgba(0, 150, 250, 0.2)' : '#0F172A',
                    border: paymentMethod === 'card' ? '2px solid #0096FA' : '1px solid #334155',
                    color: '#FFF',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <CreditCard size={16} /> Credit Card
                </button>
                <button
                  onClick={() => setPaymentMethod('google_pay')}
                  style={{
                    padding: '0.65rem',
                    borderRadius: '10px',
                    background: paymentMethod === 'google_pay' ? 'rgba(250, 100, 0, 0.2)' : '#0F172A',
                    border: paymentMethod === 'google_pay' ? '2px solid #FA6400' : '1px solid #334155',
                    color: '#FFF',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Sparkles size={16} color="#FA6400" /> Google Pay
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', background: '#0F172A', padding: '1rem', borderRadius: '14px', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '600' }}>Card Number</label>
                    <input
                      type="text"
                      value={cardDetails.cardNumber}
                      onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                      style={{ width: '100%', background: '#1E293B', border: '1px solid #334155', borderRadius: '8px', padding: '0.55rem', color: '#FFF', fontSize: '0.85rem', marginTop: '0.2rem' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '600' }}>Expiration Date</label>
                      <input
                        type="text"
                        value={cardDetails.expDate}
                        onChange={(e) => setCardDetails({ ...cardDetails, expDate: e.target.value })}
                        style={{ width: '100%', background: '#1E293B', border: '1px solid #334155', borderRadius: '8px', padding: '0.55rem', color: '#FFF', fontSize: '0.85rem', marginTop: '0.2rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '600' }}>Security CVV</label>
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        style={{ width: '100%', background: '#1E293B', border: '1px solid #334155', borderRadius: '8px', padding: '0.55rem', color: '#FFF', fontSize: '0.85rem', marginTop: '0.2rem' }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ background: '#0F172A', padding: '1.25rem', borderRadius: '14px', border: '1px solid #334155', textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: '700', marginBottom: '0.4rem' }}>
                    Google Pay Ready
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                    Click below to authorize instantaneous payment using your Google Cloud Account credentials.
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => setStep(2)}
                  className="btn-outline"
                  style={{ flex: 1, justifyContent: 'center' }}
                  disabled={isProcessing}
                >
                  <ArrowLeft size={18} /> Back
                </button>
                
                <button
                  onClick={handlePlaceOrder}
                  className="btn-secondary"
                  style={{ flex: 2, justifyContent: 'center', padding: '0.85rem', fontSize: '1rem' }}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <Lock size={18} /> Pay ${totalAmount.toFixed(2)}
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Right Summary Panel */}
        <div style={{ padding: '2rem', background: '#0F172A', borderTopRightRadius: '24px', borderBottomRightRadius: '24px', borderLeft: '1px solid #334155', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
              Order Summary ({cartItems.reduce((a, b) => a + b.quantity, 0)} Items)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '220px', overflowY: 'auto', marginBottom: '1.25rem' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img src={item.imageUrl} alt="" style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#FFF', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Qty: {item.quantity}</div>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0096FA' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', borderTop: '1px solid #334155', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                <span>Subtotal</span>
                <span style={{ color: '#FFF' }}>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FA6400', fontWeight: '700' }}>
                  <span>Promo Discount ({discountPercentage}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                <span>Estimated Shipping</span>
                <span style={{ color: selectedShippingFee === 0 ? '#10B981' : '#FFF' }}>
                  {selectedShippingFee === 0 ? 'FREE' : `$${selectedShippingFee.toFixed(2)}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                <span>Estimated Tax (8%)</span>
                <span style={{ color: '#FFF' }}>${tax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '800', color: '#FFF', paddingTop: '0.75rem', borderTop: '1px solid #334155', marginTop: '0.5rem' }}>
                <span>Total Due</span>
                <span style={{ color: '#FA6400' }}>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94A3B8', fontSize: '0.75rem' }}>
            <ShieldCheck size={18} color="#10B981" />
            <span>256-Bit SSL Encrypted & Supabase DB Protected</span>
          </div>

        </div>

      </div>
    </div>
  );
}
