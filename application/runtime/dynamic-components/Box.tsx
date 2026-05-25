import { ReactNode } from 'react';
import { ComponentGlobalSchemaSettingsMapType, ComponentSchemaSettings, ComponentSettingsSchema, valdiateComponentSetting } from "./core";
import { BaseProps } from './type';

export interface BoxProps extends BaseProps {
    children?: ReactNode;
}

export interface ComponentBoxSchemaSettings {
    "box-tp"?: "container"
}

// here you will define what should be the customization option for given component
// you can add style along with settings to dynamically render of compoentn using 
// schema, 
export const ComponentBoxSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    "box-tp": {
        as: "containerType",
        // its the porps meaning it will act like setting
        tp: "prop",
        opt: ["container"]
    },
}


function parseBoxSetting(settingsList: any, settingValue: string, settingConfig: ComponentSettingsSchema) {
    settingsList = { ...settingsList }
    if (settingConfig?.as === "containerType") {
        settingsList.containerType = settingValue
    }

    return settingsList
}

// settings parser for button, like button-type, onCLick
export function parseBoxComponentSettings(settings: ComponentSchemaSettings): ComponentSchemaSettings {
    let newSettings = { ...settings }

    for (let setting in settings) {
        let settingName = setting as keyof ComponentGlobalSchemaSettingsMapType
        let settingValue = settings[setting]
        let settingConfig = ComponentBoxSchemaSettingsMap?.[settingName]

        const config = Array.isArray(settingConfig) ? settingConfig[0] : settingConfig;

        // validate the compoennt vlaue against regx or options avaible,
        // 
        // other removal will be done by global settings
        // if the seeting is not avaible in the registered setting than ignore this, 
        if (!config || !valdiateComponentSetting(config, settingValue)) {
            continue
        }

        // delete the field after the use, so that unwamted things are never used
        // NOTE: here if the prop like style or any html tags are used than thesea re also remvoed
        // so when you upgrade system like allow user to add custom style than think of improvemnt
        delete newSettings[setting]

        ////////////////////////////////////////////////////////////////////////////
        if (config?.tp === "prop") {
            newSettings = parseBoxSetting(newSettings, settingValue, config)
        }

        continue
    }

    return newSettings
}


export default function ABox({
    children,
    id,
    containerType,
    style,
}: {
    children: ReactNode,
    id: string,
    containerType: ComponentBoxSchemaSettings["box-tp"],
    style?: React.CSSProperties,
}) {

    return (
        <div id={id} style={style}>
            {children}
        </div>
    );
}