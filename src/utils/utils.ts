import Decimal from "decimal.js";

export const prices = {
  MAQUINA: new Decimal(20),
  MAQUINA_E_TESOURA: new Decimal(30),
  TESOURA: new Decimal(25),
  NAVALHA: new Decimal(40),
};

export function convert_string_date_in_date(stringDate: string): Date {
  let dateArray = stringDate.split("-");
  const year = Number(dateArray[2]);
  const month = Number(dateArray[1]) - 1;
  const day = Number(dateArray[0]);

  const date = new Date(year, month, day);

  return date;
}

export function convert_string_time_in_date(
  stringTime: string,
  stringDate: string
): Date {
  let timeArray = stringTime.split(":");
  const hour = Number(timeArray[0]);
  const minute = Number(timeArray[1]);

  let dateArray = stringDate.split("-");
  const year = Number(dateArray[2]);
  const month = Number(dateArray[1]) - 1;
  const day = Number(dateArray[0]);

  const date = new Date(year, month, day, hour, minute);
  return date;
}

export function create_end_time(initTime: Date, avgDuration: string): Date {
  let endTime = new Date(initTime);
  if (avgDuration === "30") {
    endTime.setMinutes(endTime.getMinutes() + 30);
  } else if (avgDuration === "60") {
    endTime.setHours(endTime.getHours() + 1);
  }

  return endTime;
}
