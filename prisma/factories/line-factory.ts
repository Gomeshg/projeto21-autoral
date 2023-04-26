import prisma from "../../src/database/prisma";
import { Line, NewLine } from "../../src/protocols/contracts";
import lineService from "../../src/service/line-service";
import {
  convert_string_date_in_date,
  convert_string_time_in_date,
  create_end_time,
  prices,
} from "../../src/utils/utils";

export async function createLine(userId: number, newLine: NewLine) {
  await lineService.postLine(userId, newLine);

  const initTime = convert_string_time_in_date(newLine.initTime, newLine.date);
  const endTime = create_end_time(initTime, newLine.avgDuration);
  const line: Line = {
    type: newLine.type,
    value: prices[newLine.type],
    date: convert_string_date_in_date(newLine.date),
    initTime: initTime,
    endTime: endTime,
    userId: userId,
  };

  await prisma.line.create({
    data: line,
  });
}
