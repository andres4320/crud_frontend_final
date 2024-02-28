import { Departament } from './departament.model';
import { Country } from "./country.model";


export interface Municipality{
    id?: number;
    name: string;
    departaments_id: number;
    departament?: Departament;
    country_id?: number;
    country?: Country;
}