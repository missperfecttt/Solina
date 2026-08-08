interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Terms({ isOpen, onClose }: ModalProps) {
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
        <h2 className="text-2xl font-bold mb-4 text-amber-500">Terms of Service</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p><strong>Effective Date:</strong> August 2026</p>
          <p>Welcome to Solina Coffee. By accessing or using our website, you agree to comply with these Terms of Service.</p>

          <h3 className="text-base font-semibold text-amber-400 mt-4">1. Use of Service</h3>
          <p>You agree to use this website only for legitimate purposes, such as viewing our coffee menu and placing valid orders.</p>

          <h3 className="text-base font-semibold text-amber-400 mt-4">2. Intellectual Property</h3>
          <p>All content, graphics, and branding elements on this website belong exclusively to Solina Coffee and are protected by applicable copyright laws.</p>

          <h3 className="text-base font-semibold text-amber-400 mt-4">3. Limitation of Liability</h3>
          <p>Solina Coffee provides this site on an "as is" basis and is not responsible for minor technical downtime or operational disruptions.</p>
        </div>
      </div>
    </div>
  );
}