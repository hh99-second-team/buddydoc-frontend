/** 게시물 데이터 형식 */
export interface PostData {
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
