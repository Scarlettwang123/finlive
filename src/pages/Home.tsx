import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SystemArchitecture from '@/components/SystemArchitecture';
import CoreProcess from '@/components/CoreProcess';
import SmartRouting from '@/components/SmartRouting';
import RolesSection from '@/components/RolesSection';
import PricingSection from '@/components/PricingSection';
import FooterCTA from '@/components/FooterCTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-navy-950 text-gray-200 relative">
      <div className="grain-overlay" />
      
      <div className="fixed inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-20 pointer-events-none z-0" />
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <SystemArchitecture />
        <CoreProcess />
        <SmartRouting />
        <RolesSection />
        <PricingSection />
        <FooterCTA />
      </div>
    </div>
  );
}
