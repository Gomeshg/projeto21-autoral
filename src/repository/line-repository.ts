import prisma from "../database/prisma.js";
import { Line } from "../protocols/contracts.js";

async function findLineByDate(date: Date): Promise<Line[]> {
  return await prisma.line.findMany({
    where: {
      date,
    },
    include: {
      user: {
        select: {
          name: true,
          isBanished: true,
        },
      },
    },
  });
}

async function findLineByUserId(userId: number): Promise<Line> {
  return await prisma.line.findUnique({
    where: {
      userId,
    },
  });
}

async function findLineByLineId(id: number): Promise<Line> {
  return await prisma.line.findUnique({
    where: {
      id,
    },
  });
}

async function findAllLines(): Promise<Line[]> {
  return await prisma.line.findMany({});
}

async function createLine(line: Line) {
  return await prisma.line.create({
    data: line,
  });
}

async function updateLine(id: number, updatedLine: Line) {
  return await prisma.line.update({
    where: {
      id,
    },
    data: updatedLine,
  });
}

async function deleteLine(id: number) {
  return await prisma.line.delete({
    where: {
      id,
    },
  });
}

const lineRepository = {
  findLineByDate,
  findLineByUserId,
  findLineByLineId,
  findAllLines,
  createLine,
  updateLine,
  deleteLine,
};

export default lineRepository;
