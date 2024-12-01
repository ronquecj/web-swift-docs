import { SignupForm } from '@/components/signup-form';
import { AlertDestructive } from '@/components/alert-destructive/AlertDestructive';

export default function Page({ onError, onErrorMessage }) {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      {/* <SignupForm onError={onError} onErrorMessage={onErrorMessage} /> */}
      <SignupForm />
    </div>
  );
}
