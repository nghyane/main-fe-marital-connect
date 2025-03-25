export type User = {
  id: number;
  email: string;
  name: string;
  email_verified: boolean;
  account_status: string;
  createdAt: string;
  updatedAt: string;
  role: {
    name: string;
  };
  profile?: {
    id: number;
    user_id: number;
    bio: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    profile_image: string;
    created_at: string;
    updated_at: string;
    preferences: {
      language: string;
      theme: string;
      notification_preferences: {
        email: boolean;
        sms: boolean;
      };
    };
    social_links: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
};

export type UserResponse = {
  data: User;
  message: string;
}; 