import React, { useState } from 'react';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';

const SESSION_KEY = 'vsl_admin_authed';

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState<boolean>(
    () => sessionStorage.getItem(SESSION_KEY) === 'true'
  );

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthed(false);
  };

  return isAuthed ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onSuccess={() => setIsAuthed(true)} />
  );
}
