import { books, follows, lists, reviews, users } from "@/data/mockData";
import type {
  Book,
  BookDetail,
  PopulatedList,
  PopulatedReview,
  Review,
  SearchResults,
  User,
  UserProfile,
} from "@/types";

const sortByDateDesc = (a: Review, b: Review) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

const averageRatingForBook = (bookId: string) => {
  const bookReviews = reviews.filter((review) => review.bookId === bookId);
  if (!bookReviews.length) return 0;
  const total = bookReviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((total / bookReviews.length) * 10) / 10;
};

const populateReview = (review: Review): PopulatedReview | null => {
  const user = users.find((candidate) => candidate.id === review.userId);
  const book = books.find((candidate) => candidate.id === review.bookId);

  if (!user || !book) return null;

  return {
    ...review,
    user,
    book,
  };
};

const populateList = (list: (typeof lists)[number]): PopulatedList => {
  const listBooks: Book[] = list.bookIds
    .map((bookId) => books.find((candidate) => candidate.id === bookId))
    .filter(Boolean) as Book[];

  const owner =
    users.find((candidate) => candidate.id === list.userId) ?? users[0];

  return {
    ...list,
    books: listBooks,
    owner,
  };
};

export const getHomeFeed = async (userId?: string): Promise<PopulatedReview[]> => {
  const followingIds = userId
    ? follows
        .filter((follow) => follow.followerId === userId)
        .map((follow) => follow.followingId)
    : [];

  const relevantReviews = reviews
    .filter((review) => {
      if (!userId) return true;
      return review.userId === userId || followingIds.includes(review.userId);
    })
    .sort(sortByDateDesc);

  return relevantReviews
    .map(populateReview)
    .filter(Boolean) as PopulatedReview[];
};

export const getBookDetail = async (bookId: string): Promise<BookDetail | null> => {
  const book = books.find((candidate) => candidate.id === bookId);
  if (!book) return null;

  const bookReviews = reviews
    .filter((review) => review.bookId === bookId)
    .sort(sortByDateDesc)
    .map(populateReview)
    .filter(Boolean) as PopulatedReview[];

  const relatedLists = lists
    .filter((list) => list.bookIds.includes(bookId))
    .map(populateList);

  return {
    book,
    averageRating: averageRatingForBook(bookId),
    reviews: bookReviews,
    relatedLists,
  };
};

export const getUserProfile = async (username: string): Promise<UserProfile | null> => {
  const user = users.find((candidate) => candidate.username === username);
  if (!user) return null;

  const userReviews = reviews
    .filter((review) => review.userId === user.id)
    .sort(sortByDateDesc)
    .map(populateReview)
    .filter(Boolean) as PopulatedReview[];

  const userLists = lists
    .filter((list) => list.userId === user.id)
    .map(populateList);

  return {
    ...user,
    reviews: userReviews,
    lists: userLists,
    stats: {
      reviewsCount: userReviews.length,
      listsCount: userLists.length,
      followersCount: user.followers.length,
      followingCount: user.following.length,
    },
  };
};

export const searchEntities = async (query: string): Promise<SearchResults> => {
  if (!query) {
    return {
      books: books.slice(0, 6),
      users: users.slice(0, 6),
    };
  }

  const lowerQuery = query.toLowerCase();

  return {
    books: books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery)
    ),
    users: users.filter((user) =>
      user.username.toLowerCase().includes(lowerQuery)
    ),
  };
};

export const getAllLists = async (): Promise<PopulatedList[]> => {
  return lists.map(populateList);
};

export const getMockUserByEmail = async (email: string): Promise<User | undefined> => {
  return users.find((candidate) => candidate.email === email);
};

export const getMockUserById = async (id: string): Promise<User | undefined> => {
  return users.find((candidate) => candidate.id === id);
};

export const getMockUserByUsername = async (
  username: string,
): Promise<User | undefined> => {
  return users.find((candidate) => candidate.username === username);
};
