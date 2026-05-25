export type ListingType = "ขาย" | "เช่า";
export type PropertyType = "คอนโด" | "บ้านเดี่ยว" | "ทาวน์โฮม" | "ที่ดิน";
export type Status = "เผยแพร่" | "รอเผยแพร่" | "ปิดการขาย";

export interface Property {
  id: string;
  title: string;
  price: number;
  listingType: ListingType;
  propertyType: PropertyType;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  status: Status;
  images: string[];
  createdAt: string;
}

export type ViewState = "list" | "detail" | "admin-pin" | "admin-dashboard" | "admin-form";
