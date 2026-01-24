import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { PillarsSection } from '@/components/sections/PillarsSection';
import { ApproachSection } from '@/components/sections/ApproachSection';
import { FieldsSection } from '@/components/sections/FieldsSection';
import { SignatureSection } from '@/components/sections/SignatureSection';
import { CTASection } from '@/components/sections/CTASection';
import { Loader } from '@/components/Loader';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      <div className="relative min-h-screen" style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <Navbar />
        
        <main className="relative z-10">
          <HeroSection />
          <PillarsSection />
          <ApproachSection />
          <FieldsSection />
          <SignatureSection />
          <CTASection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
