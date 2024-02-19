import { atom } from 'recoil';

/** 회원가입 모달 */
export const isSignupOpenState = atom({
  key: 'isSignupOpen',
  default: false,
});
