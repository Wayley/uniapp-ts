export type DateTimeType = number | string;
export type DateTime = {
  YYYY: DateTimeType;
  MM: DateTimeType;
  DD: DateTimeType;
  HH: DateTimeType;
  mm: DateTimeType;
  ss: DateTimeType;
  SSS: DateTimeType;
};
export enum DateTimeCategory {
  YYYY,
  MM,
  DD,
  HH,
  mm,
  ss,
  SSS,
}
export class DateUtil {
  static getDateTime(date?: Date, withPlaceholder?: boolean): DateTime {
    date = date ?? new Date();
    withPlaceholder = withPlaceholder ?? true;
    const YYYY: number = date.getFullYear();
    const MM: number = date.getMonth() + 1;
    const DD: number = date.getDate();
    const HH: number = date.getHours();
    const mm: number = date.getMinutes();
    const ss: number = date.getSeconds();
    const SSS: number = date.getMilliseconds();
    const dateTime: DateTime = withPlaceholder
      ? {
          YYYY: `${YYYY}`,
          MM: `00${MM}`.slice(-2),
          DD: `00${DD}`.slice(-2),
          HH: `00${HH}`.slice(-2),
          mm: `00${mm}`.slice(-2),
          ss: `00${ss}`.slice(-2),
          SSS: `000${SSS}`.slice(-3),
        }
      : { YYYY, MM, DD, HH, mm, ss, SSS };

    return dateTime;
  }

  static format(date?: Date, dateTimeCategoryList?: DateTimeCategory[], dateConnector?: string, timeConnector?: string, msConnector?: string, dateTimeConnector?: string): string {
    date = date ?? new Date();
    dateTimeCategoryList = dateTimeCategoryList ?? [DateTimeCategory.YYYY, DateTimeCategory.MM, DateTimeCategory.DD, DateTimeCategory.HH, DateTimeCategory.mm, DateTimeCategory.ss, DateTimeCategory.SSS];
    dateConnector = dateConnector ?? '-';
    timeConnector = timeConnector ?? ':';
    msConnector = msConnector ?? '.';
    dateTimeConnector = dateTimeConnector ?? ' ';

    const dateTime: DateTime = this.getDateTime(date, true);
    let arr: Array<DateTimeType> = new Array<DateTimeType>(7);
    dateTimeCategoryList.forEach((dateTimeType) => {
      if (dateTimeType == DateTimeCategory.YYYY) arr[0] = dateTime.YYYY;
      if (dateTimeType == DateTimeCategory.MM) arr[1] = dateTime.MM;
      if (dateTimeType == DateTimeCategory.DD) arr[2] = dateTime.DD;
      if (dateTimeType == DateTimeCategory.HH) arr[3] = dateTime.HH;
      if (dateTimeType == DateTimeCategory.mm) arr[4] = dateTime.mm;
      if (dateTimeType == DateTimeCategory.ss) arr[5] = dateTime.ss;
      if (dateTimeType == DateTimeCategory.SSS) arr[6] = dateTime.SSS;
    });
    const result = [
      arr
        .slice(0, 3)
        .filter((x) => x ?? false)
        .join(dateConnector),
      [
        arr
          .slice(3, 6)
          .filter((x) => x ?? false)
          .join(timeConnector),
        arr.slice(-1)[0],
      ]
        .filter((x) => x ?? false)
        .join(msConnector),
    ].join(dateTimeConnector);
    return result;
  }
}
