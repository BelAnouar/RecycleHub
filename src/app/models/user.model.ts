export interface User {
    id?: number;
    email: string;
    name: string;
    password:string;
    address: string;
    phone: string;
    birthDate: Date;
    photoUrl?: string;
    role: 'user' | 'collector';
    city?: string;
    points?:number;
  }