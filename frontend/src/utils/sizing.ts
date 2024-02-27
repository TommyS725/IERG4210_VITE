

type SizeProperty = "width" | "height"| "min-width" | "min-height" | "max-width" | "max-height"|"size"

export interface Size {
    default: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    property?: SizeProperty[]|SizeProperty; //default is [width, height]
}

const propertyToPrefix = {
    "width": "w",
    "height": "h",
    "min-width": "min-w",
    "min-height": "min-h",
    "max-width": "max-w",
    "max-height": "max-h",
    "size": "size"
} satisfies Record<SizeProperty, string>;

const units = ["px", "%","rem","vh","vw"] as const;

function parseValue (value:string):string{
    if(units.some((unit)=>value.endsWith(unit))) return `[${value}]`;
    if(value.includes(".")) return `[${value}]`;
    return value;
  }



export function sizeToClassName(size: Size) {
    let { default: def, sm, md, lg, xl, property:_prop } = size;
    const property = _prop?Array.isArray(_prop)?_prop:[_prop]:["width", "height"] satisfies SizeProperty[];
    const breakpoints = { def,sm, md, lg, xl };
    const className = Object.entries(breakpoints).map(([key, value]) => {
        if(!value) return "";
        const prepend = key === "def" ? "" : key + ":";
        return property.map((prop) => prepend +  propertyToPrefix[prop] + "-" + parseValue(value)).join(" ");
    });
    return className.join(" ") ;
}