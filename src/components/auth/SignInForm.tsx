import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmail } from '../../firebase';
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from '../../icons';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import Checkbox from '../form/input/Checkbox';
import Button from '../ui/button/Button';

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      setLoading(false);
      return;
    }
    console.log('Attempting login with:', { email, password }); // Tambahkan ini

    try {
      // 1. Coba login sebagai user Firebase (masyarakat)
      await signInWithEmail(email, password); // <- gunakan helper dari firebase.ts
      await auth.currentUser?.reload();

      console.log('Firebase user:', auth.currentUser);

      const user = auth.currentUser;
      localStorage.setItem('name', user?.displayName || user?.email || 'User');
      localStorage.setItem('email', user?.email || '');
      localStorage.setItem('provider', 'firebase');
      localStorage.setItem('role', 'masyarakat');

      navigate('/');
    } catch (firebaseError) {
      // 2. Kalau gagal login Firebase, coba ke backend (admin/petugas)
      try {
        const backendResponse = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!backendResponse.ok) {
          const errText = await backendResponse.text();
          console.error('Backend Error:', errText);
          throw new Error('Login backend gagal');
        }

        const data = await backendResponse.json();

        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.user.name);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('provider', 'backend');

        // Navigasi
        if (data.user.role === 'admin' || data.user.role === 'petugas') {
          navigate('/home');
        } else {
          navigate('/');
        }
      } catch (backendError) {
        console.error('Login backend gagal:', backendError);
        setError('Login gagal. Email atau password salah.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <ChevronLeftIcon className="size-5" /> Back to Home
        </Link>
      </div>

      <div>
        <p>adminrisky@gmail.com</p>
        <p>user1@gmail.com</p>
        <p>user123</p>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 sm:text-title-md">Sign In</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Masukkan email dan password untuk masuk</p>
        </div>

        <form onSubmit={handleSignIn}>
          <div className="space-y-6">
            <div>
              <Label>
                Email <span className="text-error-500">*</span>
              </Label>
              <Input type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <Label>
                Password <span className="text-error-500">*</span>
              </Label>
              <div className="relative">
                <Input type={showPassword ? 'text' : 'password'} placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
                  {showPassword ? <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" /> : <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <span className="text-theme-sm text-gray-700 dark:text-gray-400">Keep me logged in</span>
              </div>
              <Link to="/reset-password" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                Forgot password?
              </Link>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button className="w-full" size="sm" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-gray-700 dark:text-gray-400 sm:text-start">
          Belum punya akun?{' '}
          <Link to="/signup" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
