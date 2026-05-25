export function formatPrice(price: number, listingType: string): string {
  const formatted = price.toLocaleString("th-TH");
  if (listingType === "เช่า") {
    return `฿${formatted} / เดือน`;
  }
  return `฿${formatted}`;
}

export function formatPriceAdmin(price: number, listingType: string): string {
  const formatted = price.toLocaleString("th-TH");
  if (listingType === "เช่า") {
    return `${formatted} บาท/เดือน`;
  }
  return `${formatted} บาท`;
}

export function compressImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }

        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        resolve(dataUrl);
      };
      if (e.target && e.target.result) {
        img.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  });
}

export function getLineUrl(title: string, price: number, location: string, lineId: string = "@REPLACE_ME") {
  const formattedPrice = price.toLocaleString("th-TH");
  const message = `สนใจสอบถามทรัพย์: ${title} | ราคา ${formattedPrice} บาท | ${location}`;
  return `https://line.me/R/oaMessage/${lineId}/?${encodeURIComponent(message)}`;
}
