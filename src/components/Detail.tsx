import { BedDouble, Bath, Maximize, MapPin, Building2, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Property } from "../types";
import { LINE_ID } from "../data";
import { formatPrice, getLineUrl } from "../utils";

interface DetailProps {
  property: Property;
  onBack: () => void;
}

const LineIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.298.077.756.037 1.061l-.203 1.251c-.052.316-.241 1.187 1.042.647 1.284-.54 6.911-4.069 9.423-6.965C23.111 14.542 24 12.518 24 10.304zM10.435 13.568H8.56a.434.434 0 0 1-.433-.434V6.866c0-.239.195-.434.433-.434.24 0 .435.195.435.434v5.834h1.44a.434.434 0 0 1 .434.434.434.434 0 0 1-.434.434zm3.003-.434c0 .239-.195.434-.435.434-.239 0-.434-.195-.434-.434V6.866c0-.239.195-.434.434-.434.24 0 .435.195.435.434v6.268zm3.504 0c0 .239-.194.434-.434.434-.24 0-.434-.195-.434-.434V9.69a19.789 19.789 0 0 1-.161-1.077l-1.921 4.793a.473.473 0 0 1-.397.251h-.088a.438.438 0 0 1-.382-.249L11.233 8.6c-.033.407-.058.826-.058 1.078v3.456c0 .239-.195.434-.435.434-.239 0-.434-.195-.434-.434V6.866c0-.239.195-.434.434-.434.218 0 .408.162.457.37L13.14 11.6c.032-.407.058-.826.058-1.078V6.866c0-.239.195-.434.434-.434.24 0 .434.195.434.434v6.268zM7.279 8.243c0 .239-.195.434-.434.434H5.405v1.378h1.44a.434.434 0 0 1 .434.434.434.434 0 0 1-.434.434H5.405v1.377h1.44a.434.434 0 0 1 .434.434.434.434 0 0 1-.434.434H4.97a.434.434 0 0 1-.434-.434V6.866c0-.239.195-.434.434-.434h1.875c.239 0 .434.195.434.434s-.195.434-.434.434H5.405v1.377h1.44c.24 0 .434.195.434.435z" />
  </svg>
);

export default function Detail({ property, onBack }: DetailProps) {
  const [mainImageIdx, setMainImageIdx] = useState(0);

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"];

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Header */}
      <header className="bg-cream py-6 px-6 md:px-12 border-b border-gold/20 flex justify-center z-10 animate-fade-up">
        <div className="w-full max-w-[1200px] flex justify-between items-center">
          <h1 className="text-3xl font-serif text-navy tracking-tight font-semibold">ทรัพย์ดีมีบอก</h1>
          <button 
            onClick={() => window.open(getLineUrl(property.title, property.price, property.location, LINE_ID), "_blank")}
            className="hidden md:flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white px-5 py-2 rounded-full font-medium transition-colors text-sm"
          >
            <LineIcon className="w-4 h-4"/> แอดไลน์
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 md:px-12 py-8 max-w-[1200px] mx-auto w-full animate-fade-up delay-100">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 text-gold hover:text-navy transition-colors mb-6 font-medium"
        >
          <ChevronLeft className="w-5 h-5"/> กลับ
        </button>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Photos */}
          <div className="w-full lg:w-2/3 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 h-[40vh] sm:h-[60vh] bg-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <img 
                src={images[mainImageIdx]} 
                alt={property.title} 
                className="w-full h-full object-cover animate-fade-up"
                key={mainImageIdx} // Force animation re-trigger on change
              />
            </div>
            {images.length > 1 && (
              <div className="flex sm:flex-col gap-4 overflow-x-auto sm:overflow-y-auto w-full sm:w-32 sm:h-[60vh] pb-2 sm:pb-0 scrollbar-hide">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setMainImageIdx(idx)}
                    className={`w-24 sm:w-full aspect-[4/3] rounded-lg overflow-hidden shrink-0 border-2 transition-all ${mainImageIdx === idx ? 'border-gold' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <h1 className="text-4xl lg:text-5xl font-serif text-navy font-semibold mb-3 leading-tight">{property.title}</h1>
            <p className="text-charcoal/60 flex items-center gap-1.5 mb-6 text-lg">
              <MapPin className="w-5 h-5" />
              {property.location}
            </p>

            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="text-4xl font-serif text-gold font-semibold tracking-tight">
                {property.price.toLocaleString("th-TH")}
                <span className="text-xl text-charcoal font-sans ml-2 font-normal">
                  {property.listingType === "เช่า" ? "บาท / เดือน" : "บาท"}
                </span>
              </span>
            </div>

            <div className="mb-10">
              <span className="inline-block px-4 py-1.5 bg-gold text-white font-medium rounded-full">
                {property.listingType}
              </span>
            </div>

            <div className="border-t border-b border-gold/20 py-6 mb-10 flex flex-col gap-4">
              {(property.propertyType === "คอนโด" || property.propertyType === "บ้านเดี่ยว" || property.propertyType === "ทาวน์โฮม") && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal/60 flex items-center gap-2 w-32"><BedDouble className="w-5 h-5"/> ห้องนอน</span>
                    <span className="text-navy font-medium text-right flex-1">{property.bedrooms} ห้องนอน</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal/60 flex items-center gap-2 w-32"><Bath className="w-5 h-5"/> ห้องน้ำ</span>
                    <span className="text-navy font-medium text-right flex-1">{property.bathrooms} ห้องน้ำ</span>
                  </div>
                </>
              )}
              <div className="flex items-center justify-between">
                <span className="text-charcoal/60 flex items-center gap-2 w-32"><Maximize className="w-5 h-5"/> พื้นที่ใช้สอย</span>
                <span className="text-navy font-medium text-right flex-1">{property.area} ตร.ม.</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-charcoal/60 flex items-center gap-2 w-32"><Building2 className="w-5 h-5"/> ประเภทอสังหา</span>
                <span className="text-navy font-medium text-right flex-1">{property.propertyType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-charcoal/60 flex items-center gap-2 w-32"><MapPin className="w-5 h-5"/> ที่ตั้ง</span>
                <span className="text-navy font-medium text-right flex-1">{property.location}</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-serif text-navy font-semibold mb-4">รายละเอียด</h2>
            <div className="text-charcoal/80 leading-relaxed max-w-prose whitespace-pre-wrap mb-10">
              {property.description}
            </div>

            <button 
              onClick={() => window.open(getLineUrl(property.title, property.price, property.location, LINE_ID), "_blank")}
              className="w-full flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white py-4 rounded-xl font-medium transition-colors text-lg"
            >
              <LineIcon className="w-6 h-6"/> แอดไลน์คุยกับเอเยนต์
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
