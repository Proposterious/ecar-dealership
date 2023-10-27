import "next-auth";
declare module 'bcrypt'; declare module 'prisma';

declare module "next-auth" {
    interface User {
        fullName: string | null
        phoneNumber: string | null
    }

    interface Session extends DefaultSession {
        user?: User;
    }
}

