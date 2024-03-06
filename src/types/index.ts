/** 게시물 카드 데이터 형식 */
export interface PostCardType {
  postId: number;
  post_userId: number;
  postType: '스터디' | '프로젝트';
  postTitle: string;
  createdAt: Date;
  updatedAt: Date;
  deadLine: Date;
  startDate: Date;
  memberCount: number;
  position: string[];
  skillList: string[];
  preference: number;
  bookmark: boolean;
  isEnd: string;
  views: number;
  users: {
    userNickname: string;
    profileImage: string;
  };
}

/** 게시물 작성 / 수정 데이터 형식 */
export interface PostCreateType {
  postType: '스터디' | '프로젝트';
  postTitle: string;
  position: string[];
  skillList: string[];
  content: string;
  deadLine: Date;
  startDate: Date;
  period: string;
  memberCount: string;
}

/** 게시물 상세 정보 데이터 형식 */
export interface PostDetailType {
  postId: number;
  postType: '스터디' | '프로젝트';
  user: {
    userId: number;
    userNickname: string;
    profileImage: string;
  };
  postTitle: string;
  position: string[];
  skillList: string[];
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deadLine: Date;
  startDate: Date;
  memberCount: number;
  period: string;
  preference: number;
  isBookmarked: boolean;
  views: number;
}

/** 유저 정보 데이터 형식 */
export interface UserType {
  userId: number;
  userNickname: string;
  position: string;
  skillList: string[];
  profileImage: string;
  career: string;
}

/** 회원가입 시 입력 타입 */
export interface SignUpType {
  userNickname: string;
  position: string;
  career: string;
  skillList: string[];
}

/** 현재 참여 목록 */
export interface JoinType {
  postId: number;
  postType: '스터디' | '프로젝트';
  postTitle: string;
  memberCount: number;
  startDate: Date;
}

/** 내 신청 목록 */
export interface ApplyType {
  postId: number;
  postType: '스터디' | '프로젝트';
  postTitle: string;
  memberCount: number;
  notiStatus: 'reject' | 'pending' | 'accept';
  startDate: Date;
  createdAt: Date;
}

/** 내 관심 목록 */
export interface LikeType {
  postId: number;
  postTitle: string;
  postType: '스터디' | '프로젝트';
  deadLine: Date;
  memberCount: number;
}

/** 내 작성글 목록 */
export interface WriteType {
  postId: number;
  postTitle: string;
  postType: '스터디' | '프로젝트';
  createdAt: Date;
  deadLine: Date;
}

/** 신청자 목록 */
export interface ApplicationType {
  notiId: number;
  noti_userId: number;
  userNickname: string;
  noti_message: string;
  position: string;
  notiStatus: 'reject' | 'pending' | 'accept';
}

/** 채팅방 목록 */
export interface ChatRoomType {
  postId: number;
  memberCount: number;
  posts: {
    postTitle: string;
    postType: '스터디' | '프로젝트';
  };
}
