import React, { createContext, useContext, useState } from 'react';
import { User, OnboardingState, CartItem, RFQItem } from '@/types';
import { currentUser, cartItems as defaultCart } from '@/data/mockData';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  onboarding: OnboardingState;
  setOnboarding: (state: OnboardingState) => void;
  cart: CartItem[];
  setCart: (items: CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  rfqItems: RFQItem[];
  setRfqItems: (items: RFQItem[]) => void;
  isOnboarded: boolean;
  setIsOnboarded: (v: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(currentUser);
  const [onboarding, setOnboarding] = useState<OnboardingState>({ step: 0, completed: false });
  const [cart, setCart] = useState<CartItem[]>(defaultCart);
  const [rfqItems, setRfqItems] = useState<RFQItem[]>([]);
  const [isOnboarded, setIsOnboarded] = useState(true);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === item.productId);
      if (existing) {
        return prev.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  return (
    <UserContext.Provider value={{ user, setUser, onboarding, setOnboarding, cart, setCart, addToCart, removeFromCart, rfqItems, setRfqItems, isOnboarded, setIsOnboarded }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};
