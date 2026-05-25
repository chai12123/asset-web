import { BedDouble, Bath, Maximize, MapPin, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { Property, PropertyType, ListingType } from "../types";
import { AGENT, LINE_ID } from "../data";
import { formatPrice, getLineUrl } from "../utils";

interface ListProps {
  properties: Property[];
  onPropertyClick: (id: string) => void;
  onAdminClick: () => void;
}

const LineIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.298.077.756.037 1.061l-.203 1.251c-.052.316-.241 1.187 1.042.647 1.284-.54 6.911-4.069 9.423-6.965C23.111 14.542 24 12.518 24 10.304zM10.435 13.568H8.56a.434.434 0 0 1-.433-.434V6.866c0-.239.195-.434.433-.434.24 0 .435.195.435.434v5.834h1.44a.434.434 0 0 1 .434.434.434.434 0 0 1-.434.434zm3.003-.434c0 .239-.195.434-.435.434-.239 0-.434-.195-.434-.434V6.866c0-.239.195-.434.434-.434.24 0 .435.195.435.434v6.268zm3.504 0c0 .239-.194.434-.434.434-.24 0-.434-.195-.434-.434V9.69a19.789 19.789 0 0 1-.161-1.077l-1.921 4.793a.473.473 0 0 1-.397.251h-.088a.438.438 0 0 1-.382-.249L11.233 8.6c-.033.407-.058.826-.058 1.078v3.456c0 .239-.195.434-.435.434-.239 0-.434-.195-.434-.434V6.866c0-.239.195-.434.434-.434.218 0 .408.162.457.37L13.14 11.6c.032-.407.058-.826.058-1.078V6.866c0-.239.195-.434.434-.434.24 0 .434.195.434.434v6.268zM7.279 8.243c0 .239-.195.434-.434.434H5.405v1.378h1.44a.434.434 0 0 1 .434.434.434.434 0 0 1-.434.434H5.405v1.377h1.44a.434.434 0 0 1 .434.434.434.434 0 0 1-.434.434H4.97a.434.434 0 0 1-.434-.434V6.866c0-.239.195-.434.434-.434h1.875c.239 0 .434.195.434.434s-.195.434-.434.434H5.405v1.377h1.44c.24 0 .434.195.434.435z" />
  </svg>
);

export default function List({ properties, onPropertyClick, onAdminClick }: ListProps) {
  const [filterType, setFilterType] = useState<string>("ทั้งหมด");
  const [filterListing, setFilterListing] = useState<string>("ทั้งหมด");
  const [filterPrice, setFilterPrice] = useState<string>("ทั้งหมด");
  const [search, setSearch] = useState<string>("");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (p.status !== "เผยแพร่") return false;
      if (filterType !== "ทั้งหมด" && p.propertyType !== filterType) return false;
      if (filterListing !== "ทั้งหมด" && p.listingType !== filterListing) return false;
      if (search) {
        const query = search.toLowerCase();
        if (!p.title.toLowerCase().includes(query) && !p.location.toLowerCase().includes(query)) return false;
      }
      if (filterPrice !== "ทั้งหมด") {
        if (filterPrice === "0-5m" && p.price > 5000000) return false;
        if (filterPrice === "5-10m" && (p.price <= 5000000 || p.price > 10000000)) return false;
        if (filterPrice === "10m+" && p.price <= 10000000) return false;
      }
      return true;
    });
  }, [properties, filterType, filterListing, filterPrice, search]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-cream py-6 px-6 md:px-12 border-b border-gold/20 flex justify-center z-10 animate-fade-up">
        <div className="w-full max-w-[1200px] flex justify-between items-center">
          <h1 className="text-3xl font-serif text-navy tracking-tight font-semibold">ทรัพย์ดีมีบอก</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-cream border-b border-gold/20 px-6 md:px-12 py-10 md:py-16 flex justify-center animate-fade-up delay-100 pb-16">
        <div className="w-full max-w-[1200px] flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div className="flex-1 max-w-xl">
            <p className="text-gold font-semibold tracking-wider text-sm mb-4">{AGENT.title}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-navy font-semibold leading-tight mb-5">
              {AGENT.tagline}
            </h2>
            <p className="text-charcoal/80 text-base md:text-lg mb-8 leading-relaxed">
              เราคัดสรรอสังหาริมทรัพย์ระดับพรีเมียม เพื่อส่งมอบประสบการณ์การอยู่อาศัยที่ดีที่สุดสำหรับคุณ พร้อมให้คำปรึกษาและดูแลทุกขั้นตอนอย่างใกล้ชิด
            </p>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div>
                <p className="font-semibold text-lg text-navy">{AGENT.name}</p>
                <p className="text-sm text-charcoal/60">{AGENT.experience}</p>
              </div>
              <a 
                href={`https://line.me/R/ti/p/${LINE_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white px-6 py-3 rounded-full font-medium transition-colors hover-lift"
              >
                <LineIcon /> แอดไลน์ปรึกษาฟรี
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-56 h-56 md:w-[320px] md:h-[320px] shrink-0 rounded-full border-4 border-gold/20 p-2 overflow-hidden shadow-lg bg-white/50">
              {AGENT.photoUrl ? (
                <img src={AGENT.photoUrl} alt="Agent" className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="w-full h-full rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <svg className="w-24 h-24 md:w-32 md:h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
              )}
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white py-6 px-6 md:px-12 border-b border-gray-100 sticky top-0 z-20 shadow-sm animate-fade-up delay-200">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row gap-4">
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="flex-1 bg-cream/50 border border-gray-200 text-charcoal text-sm rounded-lg focus:ring-gold focus:border-gold block p-3 outline-none"
          >
            <option value="ทั้งหมด">ประเภทอสังหา (ทั้งหมด)</option>
            <option value="คอนโด">คอนโด</option>
            <option value="บ้านเดี่ยว">บ้านเดี่ยว</option>
            <option value="ทาวน์โฮม">ทาวน์โฮม</option>
            <option value="ที่ดิน">ที่ดิน</option>
          </select>
          
          <select 
            value={filterListing}
            onChange={(e) => setFilterListing(e.target.value)}
            className="flex-1 bg-cream/50 border border-gray-200 text-charcoal text-sm rounded-lg focus:ring-gold focus:border-gold block p-3 outline-none"
          >
            <option value="ทั้งหมด">ขาย / เช่า (ทั้งหมด)</option>
            <option value="ขาย">ขาย</option>
            <option value="เช่า">เช่า</option>
          </select>

          <select 
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="flex-1 bg-cream/50 border border-gray-200 text-charcoal text-sm rounded-lg focus:ring-gold focus:border-gold block p-3 outline-none"
          >
            <option value="ทั้งหมด">ช่วงราคา (ทั้งหมด)</option>
            <option value="0-5m">ไม่เกิน 5 ล้านบาท</option>
            <option value="5-10m">5 - 10 ล้านบาท</option>
            <option value="10m+">10 ล้านบาทขึ้นไป</option>
          </select>

          <div className="flex-[2] relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-cream/50 border border-gray-200 text-charcoal text-sm rounded-lg focus:ring-gold focus:border-gold block w-full pl-10 p-3 outline-none" 
              placeholder="ค้นหาทำเล, ชื่อโครงการ, รหัสทรัพย์..."
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <main className="flex-1 bg-cream/30 p-6 md:p-12 animate-fade-up delay-300">
        <div className="w-full max-w-[1200px] mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-charcoal/50">
              ไม่พบทรัพย์ตรงกับเงื่อนไขการค้นหา
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property, idx) => (
                <div 
                  key={property.id} 
                  className="bg-white rounded-2xl shadow-sm border border-gold/10 hover-lift cursor-pointer flex flex-col h-full"
                  style={{ animationDelay: `${300 + (idx * 50)}ms` }}
                  onClick={() => onPropertyClick(property.id)}
                >
                  <div className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-t-2xl bg-gray-100">
                    {property.images[0] && (
                      <img 
                        src={property.images[0]} 
                        alt={property.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    )}
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-serif text-navy font-medium mb-1 line-clamp-1">{property.title}</h3>
                    <p className="text-sm text-charcoal/60 mb-4 flex items-center gap-1 shrink-0">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{property.location.split(',')[0]}</span>
                    </p>
                    
                    <div className="flex items-center justify-between gap-3 mb-5 shrink-0">
                      <span className="text-2xl font-serif text-gold font-semibold tracking-tight">
                        {formatPrice(property.price, property.listingType)}
                      </span>
                      <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full whitespace-nowrap">
                        {property.listingType}
                      </span>
                    </div>

                    <hr className="border-t border-gray-100 w-full shrink-0 mb-5" />

                    <div className="flex items-center gap-4 text-sm text-charcoal/70 mb-6 shrink-0">
                      {(property.propertyType === "คอนโด" || property.propertyType === "บ้านเดี่ยว" || property.propertyType === "ทาวน์โฮม") && (
                        <>
                          <div className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-gold" /> {property.bedrooms} ห้องนอน</div>
                          <div className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-gold" /> {property.bathrooms} ห้องน้ำ</div>
                        </>
                      )}
                      <div className="flex items-center gap-1.5"><Maximize className="w-4 h-4 text-gold" /> {property.area} ตร.ม.</div>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(getLineUrl(property.title, property.price, property.location, LINE_ID), "_blank");
                      }}
                      className="w-full mt-auto flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white py-3 rounded-lg font-medium transition-colors shrink-0"
                    >
                      <LineIcon /> แอดไลน์สอบถาม
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 px-6 md:px-12 flex justify-center text-sm text-charcoal/50">
        <div className="w-full max-w-[1200px] flex justify-between items-center">
          <div>© 2024 ทรัพย์ดีมีบอก. สงวนลิขสิทธิ์.</div>
          <button onClick={onAdminClick} className="hover:text-gold transition-colors underline underline-offset-4">หลังบ้าน</button>
        </div>
      </footer>
    </div>
  );
}
