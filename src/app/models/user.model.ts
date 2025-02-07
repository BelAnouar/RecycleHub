export interface User {
    id?: number;
    email: string;
    name: string;
    address: string;
    phone: string;
    birthDate: Date;
    photoUrl?: string;
    role: 'user' | 'collector';
    city?: string;
  }