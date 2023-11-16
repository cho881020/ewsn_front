export default interface Posting {
  postings: {
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
  }[];
  total: number;
}
