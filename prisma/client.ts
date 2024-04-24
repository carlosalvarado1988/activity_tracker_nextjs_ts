/*
NOTE: to use Prisma client instance in development for nextjs (because it reloads twice), we need to add additional code to prevent the refresh to create too many instances in every import in dev mode.
[see documentation](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)  

So the simple code: 
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default prisma;
Bocomes like this:
*/

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
