'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ServicesScene = dynamic(() => import('../components/ui/ServicesScene'), {
  ssr: false,
  loading: () => <div className="h-screen w-full flex items-center justify-center text-xl">Loading Services...</div>,
});

export default function ServicesPage() {
  return (
    <main className="w-full h-screen bg-[#FBEAEA] text-black">
      <Suspense fallback={<div>Loading...</div>}>
        <ServicesScene />
      </Suspense>
    </main>
  );
}
