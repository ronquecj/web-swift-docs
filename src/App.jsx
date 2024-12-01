import Login from '@/app/login/page';
import { AlertDestructive } from '@/components/alert-destructive/AlertDestructive';
import { useState } from 'react';

import './App.css';

function App() {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  console.log(hasError, errorMessage);

  return (
    <div className="static h-screen flex flex-col">
      <Login onError={setHasError} onErrorMessage={setErrorMessage} />

      {hasError && <AlertDestructive errorMessage={errorMessage} />}
    </div>
  );
}

export default App;
