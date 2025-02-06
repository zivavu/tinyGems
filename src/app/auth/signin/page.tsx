'use client';

import { iconsMap } from '@/features/gems/utils/platformIconsMap';
import { Button } from '@/features/shared/components/buttons/Button';
import { Typography } from '@/features/shared/components/Typography';
import { authClient } from '@/lib/authClient';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const registerSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await authClient.signIn.email(data);
      toast.success('Welcome back!');
    } catch (err) {
      toast.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      toast.success('Account created successfully! Please check your email to verify your account.');
    } catch (err) {
      toast.error('This email might already be registered');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'spotify' | 'google' | 'github') => {
    try {
      setIsLoading(true);
      await authClient.signIn.social({
        provider,
        callbackURL: '/',
      });
      toast.success(`Successfully signed in with ${provider}`);
    } catch (err) {
      toast.error(`${provider} sign in failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Typography variant="h2">Welcome to tinyGems</Typography>
          <Typography variant="p" className="mt-2 text-gray-600 dark:text-gray-400">
            Share and discover underground artists
          </Typography>
        </div>

        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <TabList className="flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800 mb-6">
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${
                selected
                  ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white'
                  : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900 dark:text-gray-400'
              }`
              }
            >
              Login
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${
                selected
                  ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white'
                  : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900 dark:text-gray-400'
              }`
              }
            >
              Register
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <div>
                  <input
                    {...loginForm.register('email')}
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  {loginForm.formState.errors.email && (
                    <Typography variant="small" className="mt-1 text-red-500">
                      {loginForm.formState.errors.email.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <input
                    {...loginForm.register('password')}
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  {loginForm.formState.errors.password && (
                    <Typography variant="small" className="mt-1 text-red-500">
                      {loginForm.formState.errors.password.message}
                    </Typography>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Sign In'}
                </Button>
              </form>
            </TabPanel>

            <TabPanel>
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                <div>
                  <input
                    {...registerForm.register('name')}
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  {registerForm.formState.errors.name && (
                    <Typography variant="small" className="mt-1 text-red-500">
                      {registerForm.formState.errors.name.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <input
                    {...registerForm.register('email')}
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  {registerForm.formState.errors.email && (
                    <Typography variant="small" className="mt-1 text-red-500">
                      {registerForm.formState.errors.email.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <input
                    {...registerForm.register('password')}
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  {registerForm.formState.errors.password && (
                    <Typography variant="small" className="mt-1 text-red-500">
                      {registerForm.formState.errors.password.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <input
                    {...registerForm.register('confirmPassword')}
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  {registerForm.formState.errors.confirmPassword && (
                    <Typography variant="small" className="mt-1 text-red-500">
                      {registerForm.formState.errors.confirmPassword.message}
                    </Typography>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Sign Up'}
                </Button>
              </form>
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500 dark:bg-gray-900">Or continue with</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => handleSocialSignIn('spotify')}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={iconsMap.spotify} className="w-5 h-5" />
            Continue with Spotify
          </Button>

          <Button
            onClick={() => handleSocialSignIn('google')}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faGoogle} className="w-5 h-5" />
            Continue with Google
          </Button>

          <Button
            onClick={() => handleSocialSignIn('github')}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            Continue with GitHub
          </Button>
        </div>
      </div>
    </main>
  );
}
