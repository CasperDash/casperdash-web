import dayjs from 'dayjs';

export const formatReadableDate = (date: string) => {
  return dayjs(date).format('MMMM D, YYYY h:mm A');
};
