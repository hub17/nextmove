import {
  Truck,
  MapPin,
  Package,
  CalendarClock,
  Route,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    icon: Truck,
    title: "Sprinter Van Freight",
    description:
      "For freight that fits safely inside a Mercedes-Benz Sprinter high-roof extended van.",
  },
  {
    icon: MapPin,
    title: "Local Pickup and Delivery",
    description:
      "City and regional deliveries, warehouse transfers, business-to-business deliveries, and last-mile support.",
  },
  {
    icon: Package,
    title: "Small Business Cargo Transport",
    description:
      "Boxed goods, parts, supplies, retail inventory, event materials, and similar non-refrigerated cargo.",
  },
  {
    icon: CalendarClock,
    title: "Scheduled Delivery Appointments",
    description:
      "For customers who need a planned pickup or delivery window instead of a same-minute dispatch.",
  },
  {
    icon: Route,
    title: "Planned Cargo Van Delivery",
    description:
      "Scheduled shipments that fit the vehicle and can be planned around pickup, route, and delivery availability.",
  },
  {
    icon: ClipboardList,
    title: "Special-Instruction Cargo Handling",
    description:
      "Shipments requiring careful loading, tie-downs, delivery notes, call-ahead instructions, or proof-of-delivery coordination.",
  },
];
