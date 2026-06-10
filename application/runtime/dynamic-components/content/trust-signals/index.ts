import { ComponentRegistryEntry } from "../../type";
import Component from "./ClientComponent";
import {
    ComponentTrustSignalsSchemaSettingsMap,
    parseTrustSignalsComponentSettings
} from "./settings";

export const ATrustSignalsBlockComponent: ComponentRegistryEntry = {
    acceptsChildren: true,
    name: "Trust Signals Block",
    icon: "ShieldAlert",
    category: "content",
    desc: "A horizontal banner displaying customer trust signals (shipping, warranty, secure checkout).",
    settings: ComponentTrustSignalsSchemaSettingsMap,
    parse: parseTrustSignalsComponentSettings,
    component: Component
};
