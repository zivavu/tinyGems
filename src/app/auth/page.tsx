'use client';

import { platformIconsMap } from '@/features/gems/utils/platformIconsMap';
import { Button } from '@/features/shared/components/buttons/Button';
import { FormFieldErrorMessage } from '@/features/shared/components/forms/FormFieldErrorMessage';
import { Typography } from '@/features/shared/components/Typography';
import { authClient } from '@/lib/authClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
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
    await authClient.signIn.email(data, {
      onRequest: () => {
        setIsLoading(true);
      },
      onResponse: () => {
        setIsLoading(false);
      },
      onError: (ctx) => {
        setIsLoading(false);
        toast.error(ctx.error.message);
      },
    });
  };

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onResponse: () => {
          setIsLoading(false);
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const handleSocialSignIn = async (provider: 'spotify' | 'google' | 'github') => {
    await authClient.signIn.social(
      {
        provider,
        callbackURL: '/',
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onResponse: () => {
          setIsLoading(false);
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-12">
          <Typography variant="h2" className="text-gray-900 dark:text-white">
            Join tinyGems
          </Typography>
        </div>

        <div className="max-w-md mx-auto">
          <div className="space-y-3 mb-8">
            <SpotifyButton onClick={() => handleSocialSignIn('spotify')} isLoading={isLoading} />
            <GoogleButton onClick={() => handleSocialSignIn('google')} isLoading={isLoading} />
            <GithubButton onClick={() => handleSocialSignIn('github')} isLoading={isLoading} />
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <Typography variant="small" className="bg-white px-2 text-gray-500 dark:bg-gray-900">
                Or use your email
              </Typography>
            </div>
          </div>

          <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <TabList className="flex space-x-1 rounded-xl bg-gray-100 p-1.5 dark:bg-gray-800 mb-8">
              <Tab
                className={({ selected }) =>
                  `w-full rounded-lg py-3 text-sm font-medium leading-5 transition-colors cursor-pointer
              ${
                selected
                  ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/[0.12] dark:text-gray-400 dark:hover:text-white'
              }`
                }
              >
                Login
              </Tab>
              <Tab
                className={({ selected }) =>
                  `w-full rounded-lg py-3 text-sm font-medium leading-5 transition-colors cursor-pointer
                ${
                  selected
                    ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/[0.12] dark:text-gray-400 dark:hover:text-white'
                }`
                }
              >
                Register
              </Tab>
            </TabList>

            <TabPanels className="mt-4">
              <TabPanel>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <div>
                    <Input
                      {...loginForm.register('email')}
                      placeholder="Email"
                      autoComplete="email"
                      className="w-full rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <FormFieldErrorMessage error={loginForm.formState.errors.email?.message} />
                  </div>

                  <div>
                    <Input
                      {...loginForm.register('password')}
                      type="password"
                      placeholder="Password"
                      className="w-full rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <FormFieldErrorMessage error={loginForm.formState.errors.password?.message} />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Login'}
                  </Button>
                </form>
              </TabPanel>

              <TabPanel>
                <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                  <div>
                    <Input
                      {...registerForm.register('name')}
                      type="text"
                      placeholder="Name"
                      className="w-full rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <FormFieldErrorMessage error={registerForm.formState.errors.name?.message} />
                  </div>

                  <div>
                    <Input
                      {...registerForm.register('email')}
                      placeholder="Email"
                      autoComplete="email"
                      className="w-full rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <FormFieldErrorMessage error={registerForm.formState.errors.email?.message} />
                  </div>

                  <div>
                    <Input
                      {...registerForm.register('password')}
                      type="password"
                      placeholder="Password"
                      className="w-full rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <FormFieldErrorMessage error={registerForm.formState.errors.password?.message} />
                  </div>

                  <div>
                    <Input
                      {...registerForm.register('confirmPassword')}
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <FormFieldErrorMessage error={registerForm.formState.errors.confirmPassword?.message} />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Create account'}
                  </Button>
                </form>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </main>
  );
}

interface SocialButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export function SpotifyButton({ onClick, isLoading }: SocialButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="w-full bg-[#1DB954] hover:bg-[#1ed760] dark:bg-[#1DB954] dark:hover:bg-[#1ed760] text-white font-bold flex items-center justify-center gap-2"
    >
      <FontAwesomeIcon icon={platformIconsMap.spotify} className="w-5 h-5" />
      Continue with Spotify
    </Button>
  );
}

export function GoogleButton({ onClick, isLoading }: SocialButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="w-full h-10 bg-white hover:bg-gray-50 dark:bg-white dark:hover:bg-gray-50 text-gray-800 dark:text-gray-800 font-medium border border-gray-300 rounded-md flex items-center justify-center gap-2 px-4 transition-colors"
    >
      <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
        />
        <path
          fill="#FBBC05"
          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        />
      </svg>
      Sign in with Google
    </Button>
  );
}

export function GithubButton({ onClick, isLoading }: SocialButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="w-full h-10 bg-[#24292e] hover:bg-[#2f363d] dark:bg-[#24292e] dark:hover:bg-[#2f363d] text-white font-medium rounded-md flex items-center justify-center gap-2 px-4 transition-colors"
    >
      <FontAwesomeIcon icon={platformIconsMap.github} className="w-5 h-5" />
      Continue with GitHub
    </Button>
  );
}
