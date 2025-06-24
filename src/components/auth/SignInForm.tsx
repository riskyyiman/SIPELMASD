import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmail } from '../../firebase';
import { ChevronLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
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

    console.log('🔐 Attempting login:', { email, password });

    try {
      const adminResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      if (adminResponse.ok) {
        const adminData = await adminResponse.json();
        console.log('✅ Admin login success:', adminData);

        localStorage.setItem('token', adminData.token);
        localStorage.setItem('name', adminData.user.name);
        localStorage.setItem('email', adminData.user.email);
        localStorage.setItem('role', adminData.user.role);
        localStorage.setItem('provider', 'backend');

        navigate('/home');
        return;
      }

      // Jika user tidak ditemukan di backend → coba Firebase
      if (adminResponse.status === 404) {
        console.log('🔄 Trying Firebase user login...');
        await signInWithEmail(email, password);
        const user = auth.currentUser;

        if (!user) throw new Error('User tidak ditemukan di Firebase.');

        localStorage.setItem('name', user.displayName || user.email || 'User');
        localStorage.setItem('email', user.email || '');
        localStorage.setItem('provider', 'firebase');
        localStorage.setItem('role', 'user');

        navigate('/');
        return;
      }

      // Jika password salah atau error lain
      const errorRes = await adminResponse.json();
      throw new Error(errorRes.message || 'Login gagal');
    } catch (error) {
      console.error('❌ Full login error:', error);
      setError(error && typeof error === 'object' && 'message' in error ? (error as { message: string }).message : 'Login gagal. Periksa email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6  dark:bg-gray-900">
      <div className="w-full max-w-md mx-auto mt-4">
        <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
          <ChevronLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>

      <div className="flex items-center justify-center flex-1">
        <div className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <div className="mb-8 text-center sm:text-left">
            <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-100">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400">Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input id="email" type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>

              <div>
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" checked={isChecked} onChange={setIsChecked} className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500" />
                  <Label htmlFor="remember" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Remember me
                  </Label>
                </div>
                <Link to="/reset-password" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  Forgot password?
                </Link>
              </div>
            </div>

            {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-200">{error}</div>}

            <Button type="submit" className="w-full py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
