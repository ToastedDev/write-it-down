import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import { env } from "~/env.mjs";
import { db } from "./db";
import { users } from "./db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      username?: string;
      // ...other properties
      // role: UserRole;
    };
  }

  interface User {
    // ...other properties
    // role: UserRole;
    username?: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, token }) => {
      const user = (
        await db.select().from(users).where(eq(users.id, token.sub!))
      )[0];
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          name: user.name || token.name,
          username: user.username || token.username,
        },
      };
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.username = (profile as any).login || (profile as any).username;
        token.name = (profile as any).name || (profile as any).global_name;
      }
      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: "/login",
  },
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}
