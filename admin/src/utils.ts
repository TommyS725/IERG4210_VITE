

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const $ = document.getElementById.bind(document);


export type Category ={
    name: string;
    cid: string;
}