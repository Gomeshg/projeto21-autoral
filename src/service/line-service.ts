import {
  unauthorizedError,
  badRequestError,
  notFoundError,
  conflictError,
} from "../errors/errors.js";
import { NewLine, Line } from "../protocols/contracts.js";
import lineRepository from "../repository/line-repository.js";
import {
  prices,
  convert_string_date_in_date,
  convert_string_time_in_date,
  create_end_time,
} from "../utils/utils.js";

async function getLine(stringDate: string): Promise<Line[]> {
  const date = convert_string_date_in_date(stringDate);
  const line = await lineRepository.findLineByDate(date);

  return line;
}

async function postLine(userId: number, newLine: NewLine): Promise<void> {
  const initTime = convert_string_time_in_date(newLine.initTime, newLine.date);
  const line: Line = {
    type: newLine.type,
    value: prices[newLine.type],
    date: convert_string_date_in_date(newLine.date),
    initTime: initTime,
    endTime: create_end_time(initTime, newLine.avgDuration),
    userId: userId,
  };

  const lineAlreadyExists = await lineRepository.findLineByUserId(userId);
  if (lineAlreadyExists) {
    throw conflictError("Line Already Exists");
  }

  await lineRepository.createLine(line);
}

async function putLine(
  userId: number,
  lineId: number,
  newUpdatedLine: NewLine
): Promise<void> {
  const lineAlreadyExists = await lineRepository.findLineByLineId(lineId);

  if (!lineAlreadyExists) {
    throw notFoundError();
  }

  if (lineAlreadyExists.userId !== userId) {
    throw unauthorizedError();
  }

  const initTime = convert_string_time_in_date(
    newUpdatedLine.initTime,
    newUpdatedLine.date
  );
  const updatedLine: Line = {
    type: newUpdatedLine.type,
    value: prices[newUpdatedLine.type],
    date: convert_string_date_in_date(newUpdatedLine.date),
    initTime: initTime,
    endTime: create_end_time(initTime, newUpdatedLine.avgDuration),
    userId: userId,
  };

  await lineRepository.updateLine(lineId, updatedLine);
}

async function deleteLine(userId: number, lineId: number): Promise<void> {
  const lineAlreadyExists = await lineRepository.findLineByLineId(lineId);

  if (!lineAlreadyExists) {
    throw notFoundError();
  }

  if (lineAlreadyExists.userId !== userId) {
    throw unauthorizedError();
  }

  await lineRepository.deleteLine(lineId);
}

const lineService = {
  getLine,
  postLine,
  putLine,
  deleteLine,
};

export default lineService;
