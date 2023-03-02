import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Rukyat User",
      email: "rukyat.user@example.com",
      password: "rukyatuser",
      year_of_birth: 1990,
      gender: "Male",
      phone_number: "1234567890",
      institution: "Example Agency",
      isAdmin: false,
    },
  });
  for (let i = 0; i < 10; i++) {
    const rukyat = {
      link_photo: "https://cdn.wallpapersafari.com/4/17/x3oI6d.jpg",
      description: `Rukyat Result - ${i + 1}`,
      taken_date: "2023-02-28",
      userId: user.id,
    };
    await prisma.rukyat.create({
      data: rukyat,
    });
  }
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
