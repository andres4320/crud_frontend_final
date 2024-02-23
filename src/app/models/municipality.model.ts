import { Departament } from './departament.model';

export interface Municipality{
    id?: number;
    name: string;
    departament_id: number;
    departament?: Departament;
}