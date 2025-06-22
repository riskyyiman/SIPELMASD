import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from '../../icons';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import Checkbox from '../form/input/Checkbox';
import Button from '../ui/button/Button';

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('masyarakat');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!firstName || !lastName || !email || !password) {
      alert('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    if (!isChecked) {
      alert('You must agree to the terms and privacy policy.');
      setIsSubmitting(false);
      return;
    }

    try {
      if (role === 'masyarakat') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: `${firstName} ${lastName}`,
        });
        navigate('/');
      } else {
        const res = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            role,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('token', data.token);
          navigate('/');
        } else {
          alert(data.message || 'Registration failed');
        }
      }
    } catch (error: any) {
      alert(error.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error: any) {
      alert(error.message || 'Google sign-in failed.');
    }
  };

  return (
    <div className="flex flex-col mt-60 min-h-screen py-12 sm:py-16 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 group">
              <ChevronLeftIcon className="w-5 h-5 mr-1 transition-transform group-hover:-translate-x-1" />
              Back to dashboard
            </Link>
          </div>

          <div className="px-8 py-10  bg-white rounded-xl shadow-sm dark:bg-gray-800 transition-all duration-300 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-gray-700/50">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white/90 sm:text-3xl">Sign Up</h1>
              <p className="text-gray-500 dark:text-gray-400">Enter your details to create your account!</p>
            </div>

            <div className="w-full mb-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full inline-flex items-center justify-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition-all bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10 active:scale-95"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path fill="#4285F4" d="M18.75 10.19a8.44 8.44 0 0 0-.19-1.78H10.18v3.25h4.92c-.1.81-.68 2.03-1.87 2.84l-.02.11 2.65 2.01h.18A8.56 8.56 0 0 0 18.75 10.2Z" />
                  <path fill="#34A853" d="M10.18 18.75c2.41 0 4.43-.8 5.91-2.12l-2.82-2.14c-.75.52-1.74.88-3.09.88-2.36 0-4.36-1.56-5.08-3.67H2.2l-.04.1A8.55 8.55 0 0 0 10.18 18.75Z" />
                  <path fill="#FBBC05" d="M5.1 11.73a5.36 5.36 0 0 1 0-3.46L2.2 6.07A8.52 8.52 0 0 0 1.25 10c0 1.41.34 2.74.95 3.93l2.9-2.2Z" />
                  <path fill="#EB4335" d="M10.18 4.63c1.68 0 2.79.73 3.43 1.34l2.54-2.45C14.61 2.11 12.59 1.25 10.18 1.25 6.69 1.25 3.67 3.21 2.2 6.07l2.89 2.2c.72-2.1 2.72-3.64 5.09-3.64Z" />
                </svg>
                Sign in with Google
              </button>
            </div>

            <div className="relative py-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-400 bg-white dark:bg-gray-800">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSignUp}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <Label>
                      First Name <span className="text-error-500">*</span>
                    </Label>
                    <Input placeholder="Your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="focus:ring-2 focus:ring-brand-500 focus:border-brand-500" />
                  </div>
                  <div>
                    <Label>
                      Last Name <span className="text-error-500">*</span>
                    </Label>
                    <Input placeholder="Your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="focus:ring-2 focus:ring-brand-500 focus:border-brand-500" />
                  </div>
                </div>

                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>
                  </Label>
                  <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="focus:ring-2 focus:ring-brand-500 focus:border-brand-500" />
                </div>

                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="focus:ring-2 focus:ring-brand-500 focus:border-brand-500" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                      {showPassword ? <EyeIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" /> : <EyeCloseIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label>
                    Register as <span className="text-error-500">*</span>
                  </Label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                  >
                    <option value="masyarakat">Masyarakat</option>
                    <option value="admin">Admin</option>
                    <option value="petugas">Petugas</option>
                  </select>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox checked={isChecked} onChange={setIsChecked} className="mt-1 focus:ring-2 focus:ring-brand-500" />
                  <span className="block text-sm font-normal text-gray-700 dark:text-gray-400">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 hover:underline">
                      Terms
                    </a>{' '}
                    and{' '}
                    <a href="#" className="font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </div>

                <div>
                  <Button type="submit" className="w-full py-3 transition-all hover:shadow-md active:scale-95" size="sm" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating account...' : 'Sign Up'}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/signin" className="font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
