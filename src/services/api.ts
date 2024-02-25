import axios, { AxiosInstance, AxiosResponse } from 'axios';

// 환경 변수에서 API 루트 경로 가져오기
const API_ROOT = process.env.REACT_APP_API_ROOT;

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_ROOT, // API 루트 경로를 기본 URL로 설정
  timeout: 5000, // 요청 타임아웃 설정 (예: 5초)
  headers: {
    'Content-Type': 'application/json', // JSON 형식의 요청을 보낼 것임을 명시
  },
});

/** 게시물 데이터 형식 */
interface PostCardData {
  postId: number;
  title: string;
  userId: number;
  email: string;
  deadLine: string;
  type: string;
  views: number;
  bookMark: number;
}

/** 유저 정보 데이터 형식 */
interface UserData {
  email: string;
  name: string;
  nickname: string;
  position: string;
  career: string;
  skills: string[];
}

// API 호출 메서드 정의
const api = {
  /** GET 요청을 보내는 함수 */
  get: async (endpoint: string) => {
    try {
      const response = await axios.get(`${API_ROOT}/${endpoint}`);
      return response.data; // 응답 데이터를 반환합니다.
    } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
    }
  },

  /** 게시물 목록 조회 */
  getPost: async (lastPostId: number) => {
    const response = await axiosInstance.get('/post', { params: { lastPostId } });
    return response.data;
  },

  getPostDetail: async (postId: string) => {
    const response = await axiosInstance.get(`/post/${postId}`);
    return response.data.data[0];
  },

  /** 사용자 정보 가져오기 */
  getUser: async (userId: string) => {
    const response: AxiosResponse<UserData> = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  },

  /** 사용자 정보 업데이트 */
  updateUser: async (userId: string, userData: UserData) => {
    const response: AxiosResponse<UserData> = await axiosInstance.put(`/users/${userId}`, userData);
    return response.data;
  },

  /** 회원가입 */
  signup: async (userData: UserData) => {
    const response: AxiosResponse<UserData> = await axiosInstance.post('/signup', userData);
    return response.data;
  },

  /** 카카오 로그인 */
  kakaoLogin: async () => {
    // 사용자를 카카오 로그인 페이지로 리디렉션합니다.
    const response = window.open(`${API_ROOT}/oauth/callback/kakao`);
    console.log(response);
  },

  /** 네이버 로그인 */
  naverLogin: async () => {
    // 사용자를 네이버 로그인 페이지로 리디렉션합니다.
    window.open(`${API_ROOT}/oauth/callback/naver`);
  },

  /** 구글 로그인 */
  googleLogin: async () => {
    // 사용자를 구글 로그인 페이지로 리디렉션합니다.
    window.open(`${API_ROOT}/oauth/callback/google`);
  },
};

export default api;
