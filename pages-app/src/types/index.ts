export type User = {
  id: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
  followers: string[];
  following: string[];
};

export type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  genre: string;
  description: string;
  publicationDate: string;
};

export type Review = {
  id: string;
  userId: string;
  bookId: string;
  rating: number;
  text: string;
  createdAt: string;
};

export type List = {
  id: string;
  userId: string;
  title: string;
  description: string;
  bookIds: string[];
};

export type Follow = {
  followerId: string;
  followingId: string;
};

export type PopulatedReview = Review & {
  user: User;
  book: Book;
};

export type PopulatedList = List & {
  books: Book[];
  owner: User;
};

export type UserProfile = User & {
  reviews: PopulatedReview[];
  lists: PopulatedList[];
  stats: {
    reviewsCount: number;
    listsCount: number;
    followersCount: number;
    followingCount: number;
  };
};

export type BookDetail = {
  book: Book;
  averageRating: number;
  reviews: PopulatedReview[];
  relatedLists: PopulatedList[];
};

export type SearchResults = {
  books: Book[];
  users: User[];
};
