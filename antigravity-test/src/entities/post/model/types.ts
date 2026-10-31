export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface PostFilterParams {
  userId?: number;
  search?: string;
}
