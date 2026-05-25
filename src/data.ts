import { Property } from "./types";

export const AGENT = {
  name: "คุณศิริพร วงศ์ทรัพย์",
  title: "ที่ปรึกษาอสังหาริมทรัพย์",
  tagline: "ส่งมอบบ้านที่ใช่ ให้ตรงกับชีวิตคุณ",
  experience: "ประสบการณ์กว่า 10 ปี | ดูแลทรัพย์แล้วกว่า 300 รายการ",
  photoUrl: "/agent.jpg", // Empty so it uses placeholder
};

export const LINE_ID = "@REPLACE_ME";

export const SEED_PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "คอนโด เดอะ รีเซิร์ฟ สุขุมวิท 61",
    price: 16900000,
    listingType: "ขาย",
    propertyType: "คอนโด",
    location: "สุขุมวิท, กรุงเทพมหานคร",
    bedrooms: 2,
    bathrooms: 2,
    area: 72,
    description: "คอนโดระดับลักชัวรีใจกลางทองหล่อ ตกแต่งอย่างพิถีพิถัน สไตล์โมเดิร์นคลาสสิก พร้อมสิ่งอำนวยความสะดวกครบครัน สระว่ายน้ำส่วนตัว ฟิตเนส และระบบรักษาความปลอดภัยระดับพรีเมียม",
    status: "เผยแพร่",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "p2",
    title: "บ้านเดี่ยว บางกอก บูเลอวาร์ด รามอินทรา",
    price: 15900000,
    listingType: "ขาย",
    propertyType: "บ้านเดี่ยว",
    location: "รามอินทรา, กรุงเทพมหานคร",
    bedrooms: 4,
    bathrooms: 5,
    area: 250,
    description: "บ้านเดี่ยวหลังใหญ่ โครงการคุณภาพ บรรยากาศร่มรื่น ติดถนนเมนโครงการ ใกล้คลับเฮาส์และสระว่ายน้ำ เดินทางสะดวก ใกล้ทางด่วนและรถไฟฟ้า",
    status: "เผยแพร่",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687931-cebf584b4233?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "p3",
    title: "คอนโด บีทนิค สุขุมวิท 32",
    price: 65000,
    listingType: "เช่า",
    propertyType: "คอนโด",
    location: "พร้อมพงษ์, กรุงเทพมหานคร",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    description: "ห้องแต่งสวยหรู พร้อมอยู่ วิวเมืองเปิดโล่ง โครงการระดับ Super Luxury เดินทางสะดวกสบายใกล้ BTS ทองหล่อ",
    status: "เผยแพร่",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1de2d9d009?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "p4",
    title: "บ้านเดี่ยว นาราสิริ พหลโยธิน - สายไหม",
    price: 12900000,
    listingType: "ขาย",
    propertyType: "บ้านเดี่ยว",
    location: "สายไหม, กรุงเทพมหานคร",
    bedrooms: 3,
    bathrooms: 4,
    area: 210,
    description: "บ้านเดี่ยวดีไซน์ทันสมัย สภาพใหม่มาก ไม่เคยเข้าอยู่ ต่อเติมครัวไทยพร้อมใช้งาน โครงการเงียบสงบ เป็นส่วนตัวสูง",
    status: "เผยแพร่",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "p5",
    title: "คอนโด 28 ชิดลม",
    price: 45000000,
    listingType: "ขาย",
    propertyType: "คอนโด",
    location: "ชิดลม, กรุงเทพมหานคร",
    bedrooms: 2,
    bathrooms: 2,
    area: 98,
    description: "ที่สุดแห่งความหรูหรา คอนโดฟรีโฮลด์ย่านชิดลม ยูนิตหัวมุม วิวเมืองแบบพาโนรามา ตกแต่งพร้อมเฟอร์นิเจอร์นำเข้า",
    status: "เผยแพร่",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "p6",
    title: "คอนโด ไลฟ์ อโศก พระราม 9",
    price: 22000,
    listingType: "เช่า",
    propertyType: "คอนโด",
    location: "อโศก, กรุงเทพมหานคร",
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    description: "ห้องทิศตะวันออก แดดเช้าไม่ร้อน วิวสระและสวนชั้นส่วนกลาง เฟอร์นิเจอร์แต่งครบพร้อมเครื่องใช้ไฟฟ้า ส่วนกลางใหญ่มากจัดเต็ม",
    status: "เผยแพร่",
    images: [
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: new Date().toISOString(),
  }
];
