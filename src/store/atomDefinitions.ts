import { atom } from 'recoil';

/** 로그인 모달 */
export const isLoginOpenState = atom({
  key: 'isLoginOpen',
  default: false,
});

/** 회원가입 모달 */
export const isSignupOpenState = atom({
  key: 'isSignupOpen',
  default: false,
});
