import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function downloadVCard(contact: {
  fullName: string;
  role: string;
  email: string;
  location: string;
  url: string;
  telegram: string;
}) {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${contact.fullName}`,
    `N:Egamberdiyev;Akbarjon;;;`,
    `TITLE:${contact.role}`,
    `EMAIL;TYPE=INTERNET,WORK:${contact.email}`,
    `ADR;TYPE=WORK:;;${contact.location};;;Uzbekistan`,
    `URL:${contact.url}`,
    `X-SOCIALPROFILE;type=telegram:https://t.me/${contact.telegram.replace("@", "")}`,
    "NOTE:Spatial Personal Link Hub (2026 Edition)",
    "END:VCARD",
  ].join("\r\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${contact.fullName.replace(/\s+/g, "_")}.vcf`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
