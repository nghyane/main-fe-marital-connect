'use client';

import { createContext, useContext } from 'react';
import { Expert } from './type';

// Tạo context với giá trị mặc định undefined
const ExpertContext = createContext<Expert | undefined>(undefined);

// Provider component
export function ExpertProvider({ 
  expertData, 
  children 
}: { 
  expertData: Expert; 
  children: React.ReactNode;
}) {
  return (
    <ExpertContext.Provider value={expertData}>
      {children}
    </ExpertContext.Provider>
  );
}

// Custom hook để sử dụng expert context
export function useExpert() {
  const context = useContext(ExpertContext);
  
  if (context === undefined) {
    throw new Error('useExpert must be used within an ExpertProvider');
  }
  
  return context;
} 