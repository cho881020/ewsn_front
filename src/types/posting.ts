export default interface Posting {
  category: {
    createdAt: string;
    id: number;
    name: string;
    updatedAt: string;
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
}
