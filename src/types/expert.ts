import { User } from "./user";

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

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  expert_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  year: string;
  expert_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Certification {
  id: number;
  expert_id: number;
  name: string;
  issuer: string;
  year: string;
  expiry_date: string;
  certificate_file_url: string | null;
  verification_status: 'approved' | 'pending' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface ExpertProfile {
  id: number;
  user_id: number;
  title: string;
  about: string;
  location: string;
  experience: number;
  google_meet_link: string;
  specialties: string[];
  availability_status: string;
  certifications: Certification[];
  education: Education[];
  services: Service[];
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface ExpertProfileResponse {
  data: ExpertProfile;
  message: string;
  success: boolean;
} 