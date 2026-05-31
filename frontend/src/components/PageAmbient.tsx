import React from 'react';

/** Fixed ambient gradients — same tones as globe & particles */
export const PageAmbient: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
    <div className="absolute inset-0 bg-[#03030c]" />
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(100%,900px)] h-[70vh] opacity-100"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0, 240, 255, 0.06) 0%, transparent 70%)',
      }}
    />
    <div
      className="absolute bottom-0 right-0 w-[60vw] h-[50vh] max-w-2xl"
      style={{
        background:
          'radial-gradient(ellipse 70% 60% at 100% 100%, rgba(189, 0, 255, 0.05) 0%, transparent 65%)',
      }}
    />
    <div
      className="absolute top-1/3 left-0 w-[40vw] h-[40vh]"
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 0% 50%, rgba(255, 0, 127, 0.03) 0%, transparent 60%)',
      }}
    />
  </div>
);

export default PageAmbient;
