import { inferAdditionalFields, usernameClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { auth } from './auth';

export const authClient = createAuthClient({
  plugins: [usernameClient(), inferAdditionalFields<typeof auth>()],
});
