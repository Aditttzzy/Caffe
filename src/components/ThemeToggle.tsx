
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';

const ThemeToggle = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <Toggle 
      aria-label="Toggle theme"
      className="p-2 text-muted-foreground transition-colors hover:text-foreground"
      pressed={mode === 'dark'}
      onPressedChange={toggleMode}
    >
      {mode === 'dark' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
