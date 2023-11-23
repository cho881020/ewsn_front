import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const getDate = (date: string) => {
  const today = new Date();
  const resultDate = new Date(date);

  if ((+today - +resultDate) / (60 * 60 * 1000) <= 24) {
    return dayjs(new Date(date)).format("HH:mm");
  } else {
    return dayjs(new Date(date)).format("YYYY.MM.DD");
  }
};

export const getDateTime = (date: string) => {
  return dayjs(new Date(date)).format("YYYY.MM.DD HH:mm");
};

export const getDateTimeSecond = (date: string) => {
  return dayjs(new Date(date)).format("YYYY.MM.DD HH:mm:ss");
};
