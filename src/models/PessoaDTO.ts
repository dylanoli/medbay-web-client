import Address from "./Address";
import { RoleEnum } from "./UserDTO";



export interface Profile {
    address: Address;
    birth: string;
    createdAt: Date;
    document: string;
    gender: string;
    id: number;
    metaData: any[];
    name: string;
}

export interface MedaData {
    createdAt: Date;
    id: number;
    key: string;
    profile: Profile;
    value: string;
}

export interface Privilege {
    createdAt: Date;
    id: number;
    name: string;
}

export class Role {
    createdAt: string = '';
    id: number = 0;
    name: RoleEnum = 'ROLE_PACIENTE';
    privileges: Privilege[] = [];
}

export default class {
    address: Address = new Address();
    birth: string = '';
    document: string = '';
    gender: 'MALE' | 'FEMALE' = 'MALE';
    id: number = 0;
    medaData: MedaData[] = [];
    name: string = '';
    password: string = '';
    role: Role = new Role();
    username: string = '';
}

