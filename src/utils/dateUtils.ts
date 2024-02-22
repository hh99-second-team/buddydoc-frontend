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
export const getDDayCounter = (date?: Date): number | string => {
  if (!date) {
    return '';
  }

  const today = moment();
  const postingDate = moment(date);
  const dayDiff = postingDate.diff(today, 'days');

  return 'D-' + dayDiff;
};

/** 날짜 YYYY.MM.DD 형식으로 로 변환하기 */
export const getDateFomat = (date?: Date): number | string => {
  return moment(date).format('YYYY.MM.DD');
};