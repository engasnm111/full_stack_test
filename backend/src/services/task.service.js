import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTasks = async (status) => {
  return await prisma.task.findMany({
    where: {
      deletedAt: null,
      ...(status && { status }),
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const createTask = async (data) => {
  return await prisma.task.create({ data });
};

export const updateTask = async (id, data) => {
  const task = await prisma.task.findFirst({ where: { id, deletedAt: null } });
  if (!task) throw new Error('Task not found');

  return await prisma.task.update({ where: { id }, data });
};

export const softDeleteTask = async (id) => {
  const task = await prisma.task.findFirst({ where: { id, deletedAt: null } });
  if (!task) throw new Error('Task not found');

  // Soft Delete
  return await prisma.task.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};
