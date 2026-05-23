import { ComponentSchema } from "../builder/type";
import { Announcement } from "./Announcement";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { NotFound } from "./NotFound";
import { WhatsAppButton } from "./WhatsAppButton";

export const AppGlobalsComponents: Record<string, ComponentSchema> = {
    navbar: Navbar,
    footer: Footer,
    announcement: Announcement,
    not_found: NotFound,
    whatsAppButton: WhatsAppButton
} 