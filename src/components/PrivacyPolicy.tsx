interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicy({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-stone-900 p-6 text-stone-200 border border-stone-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-white text-xl font-bold"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4 text-amber-500">Privacy Policy</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p><strong>Effective Date:</strong> August 2026</p>
          <p>Solina Coffee ("we", "our", or "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal data when you visit our website.</p>
          
          <h3 className="text-base font-semibold text-amber-400 mt-4">1. Information We Collect</h3>
          <p>We may collect personal details such as your name, email address, and order details when you submit forms or place orders on our site. We also collect anonymized analytics data via cookies with your consent.</p>
          
          <h3 className="text-base font-semibold text-amber-400 mt-4">2. How We Use Your Information</h3>
          <p>Your information is strictly used to fulfill customer orders, respond to inquiries, and improve site user experience.</p>
          
          <h3 className="text-base font-semibold text-amber-400 mt-4">3. Data Protection</h3>
          <p>We implement security controls via Supabase Row Level Security to ensure your personal data is protected against unauthorized access.</p>

          <h3 className="text-base font-semibold text-amber-400 mt-4">4. Contact Us</h3>
          <p>For questions regarding your personal data or to request data deletion, contact us at privacy@solinacoffee.com.</p>
        </div>
      </div>
    </div>
  );
}