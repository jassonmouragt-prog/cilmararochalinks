import {
  ArrowUpRight, BriefcaseBusiness, CalendarDays, Globe2, Instagram,
  Mail, MapPin, MessageCircle, Phone, Sparkles, type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/config/types";

const icons: Record<IconName, LucideIcon> = {
  instagram: Instagram,
  whatsapp: MessageCircle,
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
  calendar: CalendarDays,
  sparkles: Sparkles,
  "arrow-up-right": ArrowUpRight,
  globe: Globe2,
  briefcase: BriefcaseBusiness,
};

export function Icon({ name, size = 20, strokeWidth = 1.65, className }: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const Component = icons[name];
  return <Component aria-hidden="true" size={size} strokeWidth={strokeWidth} className={className} />;
}
