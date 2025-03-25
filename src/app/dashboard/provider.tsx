'use client';

import { createContext, useContext, ReactNode, useEffect } from 'react';
import { UserResponse, User } from '@/types/user';
import { usePathname, useRouter } from 'next/navigation';

type UserContextType = {
  user: User;
};

const UserContext = createContext<UserContextType | null>(null);

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser phải được sử dụng trong UserProvider');
  }
  
  return context;
}

export function UserProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: UserResponse;
}) {
  const currentPath = usePathname();
  const router = useRouter();

  const isProfilePage = currentPath === '/dashboard/profile';


  useEffect(() => {
    if (!isProfilePage && initialUser.data.profile == null) {
      router.push('/dashboard/profile');
    }
    
  }, [isProfilePage, initialUser.data.profile]);

  return (
    <UserContext.Provider value={{ user: initialUser.data }}>
      {children}
    </UserContext.Provider>
  );
}
