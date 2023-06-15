export enum TimeEnum {
  ONE_SECOND = 1000,
  ONE_MINUTE = 60 * TimeEnum.ONE_SECOND,
  ONE_HOUR = 60 * TimeEnum.ONE_MINUTE,
  ONE_DAY = 24 * TimeEnum.ONE_HOUR,
  ONE_WEEK = 7 * TimeEnum.ONE_DAY,
  ONE_MONTH = 30 * TimeEnum.ONE_DAY,
  ONE_YEAR = 365 * TimeEnum.ONE_DAY,
}
