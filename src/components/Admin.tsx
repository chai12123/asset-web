import { useState, FormEvent, ChangeEvent } from "react";
import { Property, ListingType, PropertyType, Status } from "../types";
import { formatPriceAdmin, compressImage } from "../utils";
import { Plus, Pencil, Trash2, LogOut, ArrowLeft, Image as ImageIcon, X } from "lucide-react";

interface AdminProps {
  properties: Property[];
  onPropertiesChange: (properties: Property[]) => void;
  onExit: () => void;
}

export default function Admin({ properties, onPropertiesChange, onExit }: AdminProps) {
  const [view, setView] = useState<"pin" | "dashboard" | "form">("pin");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const handlePinSubmit = (e: FormEvent) => {
    e.preventDefault();
    // basic front gate, not real security
    if (pin === "1234") {
      setView("dashboard");
    } else {
      setPinError("รหัส PIN ไม่ถูกต้อง");
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("คุณต้องการลบข้อมูลทรัพย์นี้ใช่หรือไม่?")) {
      const updated = properties.filter(p => p.id !== id);
      onPropertiesChange(updated);
    }
  };

  const currentViewProps = {
    properties,
    onEdit: (p: Property) => {
      setEditingProperty(p);
      setView("form");
    },
    onAdd: () => {
      setEditingProperty(null);
      setView("form");
    },
    onDelete: handleDelete,
    onExit,
  };

  if (view === "pin") {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6 animate-fade-up">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gold/20 max-w-sm w-full">
          <h1 className="text-2xl font-serif text-navy text-center mb-6">ทรัพย์ดีมีบอก — หลังบ้าน</h1>
          <form onSubmit={handlePinSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-charcoal/70 mb-1">รหัส PIN 4 หลัก</label>
              <input 
                type="password" 
                maxLength={4}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError("");
                }}
                className="w-full bg-cream/50 border border-gray-200 text-center tracking-widest text-lg rounded-lg focus:ring-gold focus:border-gold block p-3 outline-none"
                placeholder="••••"
              />
              {pinError && <p className="text-red-500 text-sm mt-2">{pinError}</p>}
            </div>
            <button type="submit" className="w-full bg-navy text-white hover:bg-navy/90 py-3 rounded-lg font-medium transition-colors">
              เข้าสู่ระบบ
            </button>
            <button type="button" onClick={onExit} className="text-charcoal/50 hover:text-charcoal text-sm mt-2">
              กลับสู่หน้าหลัก
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (view === "dashboard") {
    return <AdminDashboard {...currentViewProps} />;
  }

  return (
    <AdminForm 
      property={editingProperty}
      onSave={(p) => {
        if (editingProperty) {
          onPropertiesChange(properties.map(existing => existing.id === p.id ? p : existing));
        } else {
          onPropertiesChange([p, ...properties]);
        }
        setView("dashboard");
      }}
      onCancel={() => setView("dashboard")}
    />
  );
}

// Subcomponents

function AdminDashboard({ properties, onAdd, onEdit, onDelete, onExit }: any) {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-white py-4 px-6 md:px-12 border-b border-gold/30 flex justify-between items-center z-10 sticky top-0 shadow-sm animate-fade-up">
        <h1 className="text-xl md:text-2xl font-serif text-navy font-semibold flex items-center gap-4">
          ทรัพย์ดีมีบอก <span className="text-gold/40">|</span> <span className="text-gray-500 text-lg">หลังบ้าน</span>
        </h1>
        <button onClick={onExit} className="flex items-center gap-1.5 text-charcoal/60 hover:text-navy transition-colors text-sm">
           ออกจากหลังบ้าน <LogOut className="w-4 h-4"/>
        </button>
      </header>

      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full animate-fade-up delay-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-serif text-navy font-semibold">จัดการทรัพย์</h2>
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 bg-gold hover:bg-[#b59556] text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5"/> เพิ่มทรัพย์ใหม่
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100 text-charcoal/60 text-sm font-medium">
                <th className="py-4 px-6 font-normal w-24">ภาพ</th>
                <th className="py-4 px-6 font-normal">ชื่อทรัพย์</th>
                <th className="py-4 px-6 font-normal">ราคา</th>
                <th className="py-4 px-6 font-normal">ประเภท</th>
                <th className="py-4 px-6 font-normal">สถานะ</th>
                <th className="py-4 px-6 font-normal text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {properties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-charcoal/50">ยังไม่มีข้อมูลทรัพย์</td>
                </tr>
              ) : properties.map((p: Property) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-cream/30 transition-colors">
                  <td className="py-3 px-6">
                    <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden">
                      {p.images[0] ? (
                        <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-4 h-4 text-gray-400"/></div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-serif text-navy font-medium line-clamp-1">{p.title}</div>
                    <div className="text-xs text-charcoal/50 mt-1 line-clamp-1">{p.location}</div>
                  </td>
                  <td className="py-4 px-6 text-charcoal/80">
                    {formatPriceAdmin(p.price, p.listingType)}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full whitespace-nowrap">
                      {p.listingType}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                      p.status === "เผยแพร่" ? "bg-green-50 text-green-600" :
                      p.status === "รอเผยแพร่" ? "bg-gray-100 text-gray-600" :
                      "bg-red-50 text-red-600"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => onEdit(p)}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-charcoal hover:bg-gray-50 transition-colors whitespace-nowrap"
                      >
                        <Pencil className="w-3.5 h-3.5" /> แก้ไข
                      </button>
                      <button 
                        onClick={() => onDelete(p.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-500 rounded-lg text-sm hover:bg-red-50 transition-colors whitespace-nowrap"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function AdminForm({ property, onSave, onCancel }: any) {
  const [formData, setFormData] = useState<Partial<Property>>(
    property || {
      title: "",
      price: "", // treat as string internally for empty input
      listingType: "ขาย",
      propertyType: "คอนโด",
      location: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      description: "",
      status: "เผยแพร่",
      images: []
    }
  );

  const [images, setImages] = useState<string[]>(property?.images || []);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files) as File[];
    
    setIsCompressing(true);
    const newImages = await Promise.all(files.map(f => compressImage(f)));
    setImages(prev => [...prev, ...newImages]);
    setIsCompressing(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const saveProperty: Property = {
      id: property?.id || Math.random().toString(36).substr(2, 9),
      title: formData.title || "",
      price: Number(formData.price) || 0,
      listingType: formData.listingType as ListingType,
      propertyType: formData.propertyType as PropertyType,
      location: formData.location || "",
      bedrooms: Number(formData.bedrooms) || 0,
      bathrooms: Number(formData.bathrooms) || 0,
      area: Number(formData.area) || 0,
      description: formData.description || "",
      status: formData.status as Status,
      images,
      createdAt: property?.createdAt || new Date().toISOString(),
    };
    onSave(saveProperty);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-white py-4 px-6 md:px-12 border-b border-gold/30 flex items-center z-10 sticky top-0 shadow-sm animate-fade-up">
        <button onClick={onCancel} className="mr-4 text-charcoal/50 hover:text-navy transition-colors">
          <ArrowLeft className="w-5 h-5"/>
        </button>
        <h1 className="text-xl md:text-2xl font-serif text-navy font-semibold">
          {property ? "แก้ไขข้อมูลทรัพย์" : "เพิ่มทรัพย์ใหม่"}
        </h1>
      </header>

      <main className="flex-1 p-6 md:p-12 max-w-4xl mx-auto w-full animate-fade-up delay-100">
        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-10 flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-navy mb-2">ชื่อทรัพย์ (ซอย ถนน หรือชื่อโครงการ)</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-cream/30 border border-gray-200 rounded-lg p-3 outline-none focus:ring-gold focus:border-gold"/>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-2">จุดประสงค์</label>
              <select value={formData.listingType} onChange={e => setFormData({...formData, listingType: e.target.value as ListingType})} className="w-full bg-cream/30 border border-gray-200 rounded-lg p-3 outline-none focus:ring-gold focus:border-gold">
                <option value="ขาย">ขาย</option>
                <option value="เช่า">เช่า</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy mb-2">ประเภทอสังหา</label>
              <select value={formData.propertyType} onChange={e => setFormData({...formData, propertyType: e.target.value as PropertyType})} className="w-full bg-cream/30 border border-gray-200 rounded-lg p-3 outline-none focus:ring-gold focus:border-gold">
                <option value="คอนโด">คอนโด</option>
                <option value="บ้านเดี่ยว">บ้านเดี่ยว</option>
                <option value="ทาวน์โฮม">ทาวน์โฮม</option>
                <option value="ที่ดิน">ที่ดิน</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-2">ราคา (บาท)</label>
              <input required type="number" min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-cream/30 border border-gray-200 rounded-lg p-3 outline-none focus:ring-gold focus:border-gold"/>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-2">ทำเลที่ตั้ง (เขต, จังหวัด)</label>
              <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-cream/30 border border-gray-200 rounded-lg p-3 outline-none focus:ring-gold focus:border-gold"/>
            </div>

            <div className="grid grid-cols-3 gap-4 md:col-span-2">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">ห้องนอน</label>
                <input type="number" min="0" value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: e.target.value})} className="w-full bg-cream/30 border border-gray-200 rounded-lg p-3 outline-none focus:ring-gold focus:border-gold"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">ห้องน้ำ</label>
                <input type="number" min="0" value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: e.target.value})} className="w-full bg-cream/30 border border-gray-200 rounded-lg p-3 outline-none focus:ring-gold focus:border-gold"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">พื้นที่ (ตร.ม.)</label>
                <input required type="number" min="0" step="0.1" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} className="w-full bg-cream/30 border border-gray-200 rounded-lg p-3 outline-none focus:ring-gold focus:border-gold"/>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-navy mb-2">รายละเอียดเพิ่มเติม</label>
              <textarea required rows={5} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-cream/30 border border-gray-200 rounded-lg p-3 outline-none focus:ring-gold focus:border-gold"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-2">สถานะ</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as Status})} className="w-full bg-cream/30 border border-gray-200 rounded-lg p-3 outline-none focus:ring-gold focus:border-gold">
                <option value="เผยแพร่">เผยแพร่</option>
                <option value="รอเผยแพร่">รอเผยแพร่</option>
                <option value="ปิดการขาย">ปิดการขาย</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-navy mb-2">รูปภาพ (บีบอัดอัตโนมัติ)</label>
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-navy hover:file:bg-gray-200 cursor-pointer pointer-events-auto"/>
              
              {isCompressing && <p className="text-sm text-gold mt-2">กำลังบีบอัดรูปภาพ...</p>}

              {images.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-6">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group">
                      <img src={img} alt="" className="w-full h-full object-cover"/>
                      <button type="button" onClick={() => setImages(images.filter((_, i) => i !== idx))} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-3 h-3"/>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-4 pt-8 border-t border-gray-100">
            <button type="button" onClick={onCancel} className="px-6 py-3 rounded-lg text-charcoal hover:bg-gray-100 transition-colors font-medium">
              ยกเลิก
            </button>
            <button type="submit" disabled={isCompressing} className="px-8 py-3 rounded-lg bg-navy text-white hover:bg-navy/90 focus:ring-4 focus:ring-navy/30 transition-all font-medium disabled:opacity-50">
              บันทึกข้อมูล
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
