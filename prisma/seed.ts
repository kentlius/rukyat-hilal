import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await hash("change-me-admin", 10);
  const userPassword = await hash("change-me-user", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin Rukyat Hilal",
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN",
      phoneNumber: "1234567890",
      institution: "Example Institution",
      yearOfBirth: 1990,
      gender: "Male",
    },
  });

  const hilals = [];
  for (let i = 1; i <= 10; i++) {
    hilals.push({
      url: "https://picsum.photos/300/200",
      description: `Hilal Result - ${i}`,
    });
  }

  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      name: "User Rukyat Hilal",
      email: "user@example.com",
      password: userPassword,
      role: "USER",
      phoneNumber: "6969696969",
      institution: "Example Institution",
      yearOfBirth: 2002,
      gender: "Female",
      hilals: {
        create: hilals,
      },
    },
  });

  console.log({ admin, user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
