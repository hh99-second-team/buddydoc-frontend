import { axios } from './axios';
import { PostCreateType, SignUpType, UserType } from '../types';

const API_ROOT = process.env.REACT_APP_API_ROOT;

const api = {
  /** 게시물 목록 조회 */
  getPost: async (lastPostId: string, isEnd?: boolean, postType?: '스터디' | '프로젝트') => {
    const response = await axios.get('/post', {
      params: { orderBy: 'createdAt', lastPostId, isEnd: isEnd ? '1' : '0', postType },
    });

    return response.data.posts;
  },

  /** 게시물 검색 */
  getPostSearch: async (pageCursor: string, search: string) => {
    const response = await axios.get(`/post/search`, { params: { pageCursor, search } });

    return response.data.posts;
  },

  /** 게시물 상세 정보 조회 */
  getPostDetail: async (postId: string) => {
    const response = await axios.get(`/post/${postId}`);

    return response.data.post;
  },

  /** 게시물 작성 */
  createPost: async (post: PostCreateType) => {
    const response = await axios.post('/post', {
      ...post,
      memberCount: Number(post.memberCount),
    });

    return response.data;
  },

  /** 게시물 수정 */
  updatePost: async (postId: string, post: PostCreateType) => {
    const response = await axios.put(`/post/${postId}`, {
      ...post,
      memberCount: Number(post.memberCount),
    });

    return response.data;
  },

  /** 게시물 삭제 */
  deletePost: async (postId: string) => {
    const response = await axios.delete(`/post/${postId}`);
    return response.data;
  },

  /** 참여 신청하기 */
  createApplication: async (postId: string, applicationInfo: { position: string; noti_message: string }) => {
    const response = await axios.post(`/post/${postId}/noti`, applicationInfo);
    return response.data;
  },

  /** 북마크 */
  updateBookmark: async (postId: number) => {
    const response = await axios.post(`/post/${postId}/bookmarks`);
    return response.data;
  },

  /** 회원가입 */
  signup: async (userData: SignUpType) => {
    const response = await axios.post('/signup', userData);
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
    const response = await axios.get('/user/my-info');
    return response.data.result;
  },

  /** 내 정보 참여 스터디 목록 */
  getMyStudylists: async () => {
    const response = await axios.get('/user/my-studylists');
    return response.data.result;
  },

  /** 내 신청 목록 */
  getMyNotilists: async () => {
    const response = await axios.get('/user/my-noti');
    return response.data.result;
  },

  /** 내 정보 관심 목록 */
  getMyBookmarks: async () => {
    const response = await axios.get('/user/my-bookmarks');
    return response.data.result;
  },

  /** 내 정보 작성 게시글 목록 */
  getMyPosts: async () => {
    const response = await axios.get('/user/my-posts');
    return response.data.result;
  },

  /** 신청자 목록 */
  getApplication: async (postId: number) => {
    const response = await axios.get(`/user/my-posts/${postId}`);
    return response.data.result;
  },

  /** 내 정보 수정 */
  updateMyInfo: async (info: UserType) => {
    const response = await axios.put('/user/my-info', info);
    return response.data;
  },

  /** 내 작성글에 신청한 신청자 상태 저장 */
  createApplicantStatus: async (postId: number, notiId: number, notiStatus: '대기 중' | '승인' | '거절') => {
    const response = await axios.post(`/user/my-posts/${postId}`, {
      notiId,
      notiStatus: notiStatus === '대기 중' ? 'pending' : notiStatus === '승인' ? 'accept' : 'reject',
    });
    return response.data;
  },

  getChatRoomList: async () => {
    const response = await axios.get('/chat/rooms');
    return response.data;
  },
};

export default api;
