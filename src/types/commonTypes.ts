/** 게시물 카드 데이터 형식 */
export interface PostCardData {
  postId: number;
  post_userId: number;
  postType: string;
  createdAt: Date;
  updatedAt: Date;
  deadline: Date;
  postTitle: string;
  position: string;
  skillList: string[];
  users: {
    userNickname: string;
  };
  preference: number;
  views: number;
}

/** 게시물 상세 정보 데이터 형식 */
export interface PostDetailData {
  postId: number;
  postType: string;
  title: string;
  position: string;
  skillList: string[];
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    userId: number;
    nickname: string;
  };
  preference: number;
  views: number;
}
