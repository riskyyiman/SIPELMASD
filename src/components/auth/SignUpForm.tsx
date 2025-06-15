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
  const [role, setRole] = useState('masyarakat'); // New role state
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!isChecked) {
      alert('You must agree to the terms and privacy policy.');
      return;
    }

    try {
      if (role === 'masyarakat') {
        // Firebase register
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: `${firstName} ${lastName}`,
        });
        navigate('/');
      } else {
        // Admin / Petugas via Backend
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
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">Sign Up</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Enter your details to create your account!</p>
          </div>

          <div className="w-full mb-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
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

          <div className="relative py-3 sm:py-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">Or</span>
            </div>
          </div>

          <form onSubmit={handleSignUp}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label>
                    First Name <span className="text-error-500">*</span>
                  </Label>
                  <Input placeholder="Your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                  <Label>
                    Last Name <span className="text-error-500">*</span>
                  </Label>
                  <Input placeholder="Your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>

              <div>
                <Label>
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div>
                <Label>
                  Password <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                    {showPassword ? <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" /> : <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />}
                  </span>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <Label>
                  Register as <span className="text-error-500">*</span>
                </Label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white">
                  <option value="masyarakat">Masyarakat</option>
                  <option value="admin">Admin</option>
                  <option value="petugas">Petugas</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                  By creating an account, you agree to our <span className="text-gray-800 dark:text-white/90">Terms</span> and <span className="text-gray-800 dark:text-white/90">Privacy Policy</span>.
                </span>
              </div>

              <div>
                <Button type="submit" className="w-full" size="sm">
                  Sign Up
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Already have an account?{' '}
              <Link to="/signin" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
