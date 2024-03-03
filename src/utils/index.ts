import moment from 'moment';

/** 글 작성 시간 계산 함수 */
export const getDayMinuteCounter = (date?: Date): number | string => {
  if (!date) {
    return '';
  }

  const today = moment();
  const postingDate = moment(date);
  const dayDiff = postingDate.diff(today, 'days');
  const hourDiff = postingDate.diff(today, 'hours');
  const minutesDiff = postingDate.diff(today, 'minutes');

  if (dayDiff === 0 && hourDiff === 0) {
    // 작성한지 1시간도 안지났을때
    const minutes = Math.ceil(-minutesDiff);
    return minutes + '분 전'; // '분' 로 표시
  }

  if (dayDiff === 0 && hourDiff <= 24) {
    // 작성한지 1시간은 넘었지만 하루는 안지났을때,
    const hour = Math.ceil(-hourDiff);
    return hour + '시간 전'; // '시간'으로 표시
  }

  return -dayDiff + '일 전'; // '일'로 표시
};

/** D-day 계산 함수 */
export const getDDayCounter = (date?: Date): string => {
  if (!date) {
    return '';
  }

  const today: Date = new Date();
  const deadline: Date = new Date(date);
  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  const timeDifference: number = today.getTime() - deadline.getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  const daysPassed = Math.ceil(timeDifference / oneDay);

  return daysPassed > 0 ? '마감' : daysPassed < 0 ? 'D-' + Math.abs(daysPassed) : '오늘마감';
};

/** 날짜 차이 반환 함수 */
export const getDayDiff = (date: Date): number => {
  const today: Date = new Date();
  const deadline: Date = new Date(date);
  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  const timeDifference: number = today.getTime() - deadline.getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  const daysPassed = Math.ceil(timeDifference / oneDay);

  return daysPassed;
};

/** 날짜 YYYY.MM.DD 형식으로 로 변환하기 */
export const getDateFomat = (date?: Date): number | string => {
  return moment(date).format('YYYY.MM.DD');
};
