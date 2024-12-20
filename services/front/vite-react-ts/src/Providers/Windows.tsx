import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the context
interface WindowContextProps {
  screenSize: 'mobile' | 'wide' | 'big';
}

const WindowContext = createContext<WindowContextProps | undefined>(undefined);

// Define the provider component
interface WindowWrapperProps {
  children: ReactNode;
}

export const WindowWrapper: React.FC<WindowWrapperProps> = ({ children }) => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'wide' | 'big'>('mobile');

  const updateWindowDimensions = () => {
    const width = window.innerWidth;
    if (width <= 600) {
      setScreenSize('mobile');
    } else if (width > 600 && width <= 1200) {
      setScreenSize('wide');
    } else {
      setScreenSize('big');
    }
  };

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  return (
    <WindowContext.Provider value={{ screenSize }}>
      {children}
    </WindowContext.Provider>
  );
};

// Custom hook to use the WindowContext
export const useWindowContext = (): WindowContextProps => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindowContext must be used within a WindowProvider');
  }
  return context;
};