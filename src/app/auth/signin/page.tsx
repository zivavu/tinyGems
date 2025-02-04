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
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type AuthFormData = z.infer<typeof authSchema>;

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      setIsLoading(true);
      setError('');
      await authClient.signIn.email(data);
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'spotify' | 'google' | 'github') => {
    try {
      setIsLoading(true);
      setError('');
      await authClient.signIn.social({
        provider,
        callbackURL: '/dashboard',
      });
    } catch (err) {
      setError(`${provider} sign in failed. Please try again.`);
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

        <TabGroup>
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
              Sign In
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
              Sign Up
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  {errors.email && (
                    <Typography variant="small" className="mt-1 text-red-500">
                      {errors.email.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <input
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  {errors.password && (
                    <Typography variant="small" className="mt-1 text-red-500">
                      {errors.password.message}
                    </Typography>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Sign In'}
                </Button>
              </form>
            </TabPanel>

            <Tab.Panel>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Same form fields as sign in */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Sign Up'}
                </Button>
              </form>
            </Tab.Panel>
          </TabPanels>
        </TabGroup>

        {error && (
          <Typography variant="small" className="mt-4 text-center text-red-500">
            {error}
          </Typography>
        )}

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
