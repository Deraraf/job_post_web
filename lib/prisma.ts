// lib/prisma.ts

// This file is the single source of truth for the Prisma client.
// It detects the runtime environment (Edge or Node.js) and exports
// the correct Prisma client instance.

import { PrismaClient as PrismaClientNode } from "@prisma/client";
import { PrismaClient as PrismaClientEdge } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

// Define a type for the extended client
type ExtendedPrismaClient = ReturnType<typeof createExtendedClient>;

// Function to create an extended client (reusable for both runtimes)
function createExtendedClient(client: PrismaClientNode | PrismaClientEdge) {
  return client.$extends(withAccelerate());
}

// Declare a global variable to hold the client instance
const globalForPrisma = globalThis as unknown as {
  prisma: ExtendedPrismaClient | undefined;
};

// Conditionally instantiate the correct client
const prisma = globalForPrisma.prisma ?? createPrismaClient();

function createPrismaClient() {
  // Check if we are in the Vercel Edge Runtime
  if (process.env.NEXT_RUNTIME === "edge") {
    console.log("Creating Edge-compatible Prisma Client");
    return createExtendedClient(new PrismaClientEdge());
  }

  // Otherwise, we are in the Node.js Runtime
  console.log("Creating Node.js-compatible Prisma Client");
  return createExtendedClient(new PrismaClientNode());
}

// Export the single, environment-aware instance
export { prisma };

// Ensure the client is reused in development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
