import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SecuritySection from "@/components/SecuritySection";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <SecuritySection />
      </div>
      <Footer />
    </div>
  );
}
