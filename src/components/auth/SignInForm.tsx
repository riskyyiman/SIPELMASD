import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
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
  const [] = useState('staff');
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

    try {
      // 1) Login ke backend
      const backendResponse = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (backendResponse.ok) {
        const data = await backendResponse.json();

        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.user.name);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('role', data.user.role);

        const dest = data.user.role === 'admin' ? '/home' : data.user.role === 'petugas' ? '/' : '/';

        navigate(dest);
        return;
      }
      // Reload user untuk memastikan displayName sudah ter-update
      await auth.currentUser?.reload();
      const user = auth.currentUser;

      localStorage.setItem('name', user?.displayName || user?.email || 'User');
      localStorage.setItem('email', user?.email || '');
      localStorage.setItem('provider', 'firebase');

      // Default fallback role (jika tidak diketahui): arahkan ke dashboard umum
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Login gagal. Email atau password salah.');
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
