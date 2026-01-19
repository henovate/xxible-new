const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "hello@xxible.com" },
    update: {},
    create: {
      email: "hello@xxible.com",
      password: "MyPass123",
    },
  });

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  console.log("Seeded users:", users);
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
