import prisma from "../database/prisma.js";
import { Line, UpdatedLine } from "../protocols/contracts.js";

async function findLineByDate(date: Date) {
  await prisma.line.findFirst({
    where: {
      date,
    },
  });
}

async function createLine(line: Line) {
  await prisma.line.create({
    data: line,
  });
}

async function updateLine(lineId: number, updatedLine: UpdatedLine) {
  await prisma.line.update({
    where: {
      id: lineId,
    },
    data: updatedLine,
  });
}

async function deleteLine(lineId: number) {
  await prisma.line.delete({
    where: {
      id: lineId,
    },
  });
}

const lineRepository = {
  findLineByDate,
  createLine,
  updateLine,
  deleteLine,
};

export default lineRepository;
