import { Departament } from '../models/departament.model';

export interface Municipality{
    id?: number;
    name: string;
    departament_id: number;
    departament?: Departament;
}