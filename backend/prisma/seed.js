// backend/prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const adminPw = await bcrypt.hash('admin123', 10);
  const studentPw = await bcrypt.hash('student123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@coursify.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@coursify.com',
      password: adminPw,
      role: 'admin',
    },
  });

  await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      name: 'Student',
      email: 'student@example.com',
      password: studentPw,
      role: 'user',
    },
  });

  await prisma.course.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Intro to Web Development',
      description: 'HTML, CSS, JS fundamentals and project-based learning.',
      price: 0,
    },
  });

  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
