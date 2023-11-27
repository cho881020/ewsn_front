export interface Replies {
  id: number;
  content: string;
  createdAt: string;
  isDelete: boolean;
  isRestrict: boolean;
  postingId: number;
  replyId?: number;
  userId: 1;
  user: {
    id: number;
    nickName: string;
    politicalOrientationId: number;
  };
  comments: Replies[];
  userReplyLikes: {
    userId: number;
    likeType: string;
  }[];
}

export interface Posting {
  category: {
    createdAt: string;
    id: number;
    name: string;
    updatedAt: string;
  };
  user: {
    nickName: string;
  };
  categoryId: number;
  content: string;
  createdAt: string;
  hits: number;
  id: number;
  updatedAt: string;
  userId: number;
  politicalOrientationId: number;
  title: string;
  politicalOrientation: {
    createdAt: string;
    id: number;
    name: string;
    updatedAt: string;
  };
  replies: Replies[];
  isDelete: boolean;
  isFixed: boolean;
  isRestrict: boolean;
  userPostLikes: {
    id: number;
    userId: number;
    likeType: string;
  }[];
}

export interface Postings {
  postings: Posting[];
  total: number;
}
