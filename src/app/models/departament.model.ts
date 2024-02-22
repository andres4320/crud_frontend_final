import { Country } from "./country.model";

export interface Departament {
    id?: number;
    name: string;
    country_id: number;
    country?: Country;
}