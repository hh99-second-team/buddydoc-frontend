/** 게시물 카드 데이터 형식 */
export interface PostCardType {
  postId: number;
  post_userId: number;
  users: {
    userNickname: string;
  };
  postType: string;
  postTitle: string;
  createdAt: Date;
  updatedAt: Date;
  deadLine: Date;
  startDate: Date;
  memberCount: number;
  period: string;
  position: string[];
  skillList: string[];
  preference: number;
  bookmark: boolean;
  views: number;
}

/** 게시물 작성 / 수정 데이터 형식 */
export interface PostCreateType {
  postType: string;
  postTitle: string;
  position: string[];
  skillList: string[];
  content: string;
  deadLine: Date;
  startDate: Date;
  period: string;
  memberCount: number;
}

/** 게시물 상세 정보 데이터 형식 */
export interface PostDetailType {
  postId: number;
  postType: string;
  user: {
    userId: number;
    nickname: string;
  };
  title: string;
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
  bookmarked: boolean;
  views: number;
}

/** 유저 정보 데이터 형식 */
export interface UserType {
  userId: number;
  userNickname: string;
  position: string;
  skills: string[];
}

/** 유저 수정 데이터 형식 */
export interface UserModifyType {
  userNickname: string;
  position: string;
  skills: string[];
}

/** 회원가입 시 입력 타입 */
export interface SignUpType {
  userNickname: string;
  position: string;
  career: string;
  skills: string[];
}
