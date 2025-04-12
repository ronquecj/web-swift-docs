import { LoginForm } from '@/components/login-form';
import { AlertDestructive } from '@/components/alert-destructive/AlertDestructive';

import logo from '../../logo_sanroque.png';

export default function Page({ onError, onErrorMessage }) {
  return (
    <div
      className="flex h-screen w-full items-center justify-center px-4 "
      style={{ flexDirection: 'column', gap: 30 }}
    >
      <img src={logo} width={80} alt="logo" />
      <LoginForm onError={onError} onErrorMessage={onErrorMessage} />
    </div>
  );
}
