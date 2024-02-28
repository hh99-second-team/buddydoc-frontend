import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { PostCreateType, SignUpType, UserModifyType } from '../types/commonTypes';

// 환경 변수에서 API 루트 경로 가져오기
const API_ROOT = process.env.REACT_APP_API_ROOT;

// 토큰 가져오기
const token = localStorage.getItem('accessToken');

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_ROOT, // API 루트 경로를 기본 URL로 설정
  timeout: 5000, // 요청 타임아웃 설정 (예: 5초)
  headers: {
    'Content-Type': 'application/json', // JSON 형식의 요청을 보낼 것임을 명시
    'Access-Control-Allow-Origin': '*',
    Authorization: token ? `Bearer ${token}` : '', // 토큰이 존재하는 경우에만 헤더에 추가
  },
});

// API 호출 메서드 정의
const api = {
  /** 게시물 목록 조회 */
  getPost: async (lastPostId: number, postType?: 'study' | 'project') => {
    const response = await axiosInstance.get('/post', { params: { lastPostId, postType } });
    return response.data;
  },

  /** 게시물 검색 */
  getPostSearch: async (lastPostId: number, search: string) => {
    const response = await axiosInstance.get(`/post/search`, { params: { lastPostId, search } });
    return response.data;
  },

  /** 게시물 상세 정보 조회 */
  getPostDetail: async (postId: string) => {
    const response = await axiosInstance.get(`/post/${postId}`);
    return response.data.data[0];
  },

  /** 게시물 작성 */
  createPost: async (post: PostCreateType) => {
    const response = await axiosInstance.post('/post', {
      ...post,
      memberCount: Number(post.memberCount),
    });

    return response.data;
  },

  /** 게시물 수정 */
  updatePost: async (postId: string, post: PostCreateType) => {
    const response = await axiosInstance.put(`/post/${postId}`, {
      ...post,
      memberCount: Number(post.memberCount),
    });

    return response.data;
  },

  /** 게시물 삭제 */
  deletePost: async (postId: string) => {
    const response = await axiosInstance.delete(`/post/${postId}`);
    return response.data;
  },

  /** 참여 신청하기 */
  createApplication: async (postId: string, noti_message: string) => {
    const response = await axiosInstance.post(`/post/${postId}/noti`, { noti_message });
    return response.data;
  },

  /** 북마크 */
  updateBookmark: async (postId: number) => {
    const response = await axiosInstance.post(`/post/${postId}/bookmarks`);
    return response.data;
  },

  /** 회원가입 */
  signup: async (userData: SignUpType) => {
    const response: AxiosResponse<SignUpType> = await axiosInstance.post('/signup', userData);
    return response.data;
  },

  /** 카카오 로그인 */
  kakaoLogin: async () => {
    // 사용자를 카카오 로그인 페이지로 리디렉션합니다.
    window.location.href = `${API_ROOT}/oauth/callback/kakao`;
  },

  /** 네이버 로그인 */
  naverLogin: async () => {
    // 사용자를 네이버 로그인 페이지로 리디렉션합니다.
    window.location.href = `${API_ROOT}/oauth/callback/naver`;
  },

  /** 구글 로그인 */
  googleLogin: async () => {
    // 사용자를 구글 로그인 페이지로 리디렉션합니다.
    window.location.href = `${API_ROOT}/oauth/callback/google`;
  },

  /** 내 정보 조회 */
  getMyInfo: async () => {
    const response = await axiosInstance.get('/user/my-info');
    return response.data;
  },

  /** 내 정보 관심 목록 */
  getMyBookmarks: async () => {
    const response = await axiosInstance.get('/user/my-bookmarks');
    return response.data;
  },

  /** 내 정보 참여 스터디 목록 */
  getMyStudylists: async () => {
    const response = await axiosInstance.get('/user/my-studylists');
    return response.data;
  },

  /** 내 정보 작성 게시글 목록 */
  getMyPosts: async () => {
    const response = await axiosInstance.get('/user/my-posts');
    return response.data;
  },

  /** 내 정보 수정 */
  updateMyInfo: async (info: UserModifyType) => {
    const response = await axiosInstance.put('/user/my-info', { info });
    return response.data;
  },
};

export default api;
