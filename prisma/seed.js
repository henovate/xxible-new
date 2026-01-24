const { prisma } = require("./prismaClient");
const bcrypt = require("bcrypt");

async function main() {
  const email = "hello@xxible.com";
  const plainPassword = process.env.ADMIN_PASSWORD; // set in .env

  if (!plainPassword || plainPassword.length < 8) {
    throw new Error("ADMIN_PASSWORD is missing or too short in .env (min 8 chars).");
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);


  await prisma.user.upsert({
    where: { email },
    // If user already exists, update password to the latest hash
    update: {
      password: hashedPassword,
      role: "ADMIN",
    },
    create: {
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const admin = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, role: true, createdAt: true },
  });

  console.log("✅ Admin seeded/updated:", admin);
  console.log("🔐 Admin password loaded from ADMIN_PASSWORD env var (not printed).");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
