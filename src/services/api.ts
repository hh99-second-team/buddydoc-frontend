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
interface PostData {
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
  /** 게시물 목록 조회 */
  getPost: async () => {
    const response = await axiosInstance.get('/post');
    return response.data;
  },

  /** 사용자 정보 가져오기 */
  getUser: async (userId: string): Promise<UserData> => {
    const response: AxiosResponse<UserData> = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  },

  /** 사용자 정보 업데이트 */
  updateUser: async (userId: string, userData: UserData): Promise<UserData> => {
    const response: AxiosResponse<UserData> = await axiosInstance.put(`/users/${userId}`, userData);
    return response.data;
  },

  signup: async (userData: UserData): Promise<UserData> => {
    const response: AxiosResponse<UserData> = await axiosInstance.post('/signup', userData);
    return response.data;
  },
};

export default api;
