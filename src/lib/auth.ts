import 'server-only';

import { client } from '@/server/db';
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { username } from 'better-auth/plugins';

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
  likes?: Array<{
    itemId: string;
    type: 'song' | 'album' | 'artist';
    createdAt: Date;
  }>;
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
  plugins: [username()],
  user: {
    additionalFields: {
      likedSongIds: {
        type: 'string[]',
        required: false,
        defaultValue: [],
      },
      likedAlbumIds: {
        type: 'string[]',
        required: false,
        defaultValue: [],
      },
      likedArtistIds: {
        type: 'string[]',
        required: false,
        defaultValue: [],
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 100,
  },

  socialProviders: {
    spotify: {
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
