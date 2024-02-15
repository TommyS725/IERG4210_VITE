import { CategoryKey} from "./category"

export type Product = {
    pid: number;
    pname: string;
    price: number;
    image: string;
    description: string;
    category:CategoryKey;
    remaining:number;
}


