import dayjs from 'dayjs';

export const formatReadDate = (date: string | Date) => {
  return dayjs(date).format('MMMM D, YYYY h:mm A');
};
