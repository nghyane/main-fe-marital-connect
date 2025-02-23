export type Education = {
    id: number;
    expert_id: number;
    degree: string;
    institution: string;
    year: string;
    created_at: string;
    updated_at: string;
};

export type Certification = {
    id: number;
    expert_id: number;
    name: string;
    issuer: string;
    year: string;
    expiry_date: string;
    created_at: string;
    updated_at: string;
};

export type Service = {
    id: number;
    expert_id: number;
    name: string;
    description: string;
    duration: string;
    price: number;
    created_at: string;
    updated_at: string;
    expertId: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
};

export enum AvailabilityStatus {
    ONLINE = 'online',
    OFFLINE = 'offline',
    BUSY = 'busy',
    AWAY = 'away'
}

export type Expert = {
    id: number;
    user_id: number;
    title: string;
    about: string;
    location: string;
    experience: number;
    availability_status: AvailabilityStatus;
    specialties: string[];
    education: Education[];
    certifications: Certification[];
    services: Service[];
    user: User;
};

export type ExpertResponse = {
    success: boolean;
    message: string | null;
    data: Expert;
};
