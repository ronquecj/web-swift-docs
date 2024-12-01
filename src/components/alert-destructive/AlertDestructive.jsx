import { AlertCircle } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

export function AlertDestructive({ errorMessage }) {
  return (
    <Alert
      variant="destructive"
      className="w-[90%] max-w-sm fixed bottom-4 left-1/2 transform -translate-x-1/2 md:absolute md:bottom-10 md:right-10 md:left-auto md:transform-none p-4"
    >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
}
