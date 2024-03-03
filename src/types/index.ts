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
}

/** 유저 수정 데이터 형식 */
export interface UserModifyType {
  userNickname: string;
  position: string;
  skillList: string[];
}

/** 회원가입 시 입력 타입 */
export interface SignUpType {
  userNickname: string;
  position: string;
  career: string;
  skillList: string[];
}
