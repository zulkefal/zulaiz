import {
  ArrowsClockwiseIcon,
  ChatsCircleIcon,
  EnvelopeSimpleIcon,
  PackageIcon,
  PhoneCallIcon,
  StarIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { Service } from "@/lib/site";

/* One icon family, one weight, for the whole site. */
const map: Record<Service["icon"], Icon> = {
  envelope: EnvelopeSimpleIcon,
  chats: ChatsCircleIcon,
  package: PackageIcon,
  arrows: ArrowsClockwiseIcon,
  phone: PhoneCallIcon,
  star: StarIcon,
};

export function ServiceIcon({
  name,
  className = "size-6",
}: {
  name: Service["icon"];
  className?: string;
}) {
  const Glyph = map[name];
  return <Glyph weight="duotone" className={className} aria-hidden />;
}
