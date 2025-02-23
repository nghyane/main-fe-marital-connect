"use client";

import { create } from 'zustand'

interface UIState {
  isSidebarOpen: boolean
  theme: 'light' | 'dark'
  isLoading: boolean
  toast: {
    message: string | null
    type: 'success' | 'error' | 'info' | null
  }
  
  // Actions
  toggleSidebar: () => void
  setTheme: (theme: 'light' | 'dark') => void
  setLoading: (isLoading: boolean) => void
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
  clearToast: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  theme: 'light',
  isLoading: false,
  toast: {
    message: null,
    type: null,
  },

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  setTheme: (theme) => set({ theme }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  showToast: (message, type) => set({ toast: { message, type } }),
  
  clearToast: () => set({ toast: { message: null, type: null } }),
})) 