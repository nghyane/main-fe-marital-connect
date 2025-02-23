export interface Expert {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  title: string;
  about: string;
  experience: number;
  location: string;
  availability_status: 'online' | 'offline' | 'away';
  specialties: string[];
  services: Service[];
  education: Education[];
  certifications: Certification[];
}

interface Service {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: number;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  year: string;
  expiry_date: string;
} 