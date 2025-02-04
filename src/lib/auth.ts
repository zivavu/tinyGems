import { client } from '@/server/db';
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  image?: string;
  platforms: {
    spotify?: {
      id: string;
      username: string;
      accessToken: string;
      refreshToken: string;
    };
    google?: {
      id: string;
      email: string;
      accessToken: string;
      refreshToken: string;
    };
    github?: {
      id: string;
      username: string;
      accessToken: string;
    };
  };
}

interface SpotifyProfile {
  id: string;
  email: string;
  display_name: string;
  images?: { url: string }[];
}

interface GoogleProfile {
  sub: string;
  email: string;
  name: string;
  picture: string;
}

interface GithubProfile {
  id: number;
  email: string;
  name: string | null;
  login: string;
  avatar_url: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

interface Session {
  user: {
    id?: string;
    email?: string;
    name?: string;
    image?: string;
  };
  expires: string;
}

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: true,
    verifyEmail: true,
    passwordMinLength: 8,
    passwordMaxLength: 100,
  },
  socialProviders: {
    spotify: {
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      scopes: ['user-read-email', 'user-read-private', 'playlist-read-private', 'playlist-read-collaborative', 'user-library-read'],
      profile(profile: SpotifyProfile, tokens: AuthTokens) {
        return {
          id: profile.id,
          email: profile.email,
          name: profile.display_name,
          image: profile.images?.[0]?.url,
          platforms: {
            spotify: {
              id: profile.id,
              username: profile.display_name,
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
            },
          },
        };
      },
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      scopes: ['email', 'profile'],
      profile(profile: GoogleProfile, tokens: AuthTokens) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          platforms: {
            google: {
              id: profile.sub,
              email: profile.email,
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
            },
          },
        };
      },
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile: GithubProfile, tokens: AuthTokens) {
        return {
          id: profile.id.toString(),
          email: profile.email,
          name: profile.name || profile.login,
          image: profile.avatar_url,
          platforms: {
            github: {
              id: profile.id.toString(),
              username: profile.login,
              accessToken: tokens.accessToken,
            },
          },
        };
      },
    },
  },
  callbacks: {
    async session({ session, user }: { session: Session; user: UserProfile }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          platforms: user.platforms,
        },
      };
    },
  },
});
