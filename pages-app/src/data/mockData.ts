import type { Book, Follow, List, Review, User } from "@/types";

export const users: User[] = [
  {
    id: "user_alex",
    username: "alexreader",
    email: "alex@example.com",
    bio: "Urban fantasy addict. Always chasing lyrical prose and character-driven stories.",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=60",
    followers: ["user_brooke", "user_cam"],
    following: ["user_brooke", "user_cam"],
  },
  {
    id: "user_brooke",
    username: "brooke_reads",
    email: "brooke@example.com",
    bio: "Recovering lit major. Nonfiction before breakfast, poetry before bed.",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=60",
    followers: ["user_alex"],
    following: ["user_alex"],
  },
  {
    id: "user_cam",
    username: "cam.codes.books",
    email: "cam@example.com",
    bio: "Engineer by day, sci-fi evangelist by night.",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb7c107c6f4?auto=format&fit=crop&w=200&q=60",
    followers: ["user_alex"],
    following: ["user_alex"],
  },
];

export const books: Book[] = [
  {
    id: "book_fantasy_garden",
    title: "Gardens of the Moonglow",
    author: "L. C. Carrington",
    coverImage:
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=400&q=60",
    genre: "Fantasy",
    description:
      "An intricate epic about fallen empires, celestial magic, and messy friendships set against floating archipelagos.",
    publicationDate: "2023-08-15",
  },
  {
    id: "book_space_rift",
    title: "Signal in the Rift",
    author: "Diego Harper",
    coverImage:
      "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=400&q=60",
    genre: "Science Fiction",
    description:
      "A crew of misfit scientists decodes an impossible signal that could rewrite humanity's place in the universe.",
    publicationDate: "2022-11-02",
  },
  {
    id: "book_memoir_stillness",
    title: "Stillness Between Notes",
    author: "Marin Akoto",
    coverImage:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=400&q=60",
    genre: "Memoir",
    description:
      "A jazz pianist reflects on creativity, chronic illness, and the healing power of improv.",
    publicationDate: "2021-05-22",
  },
  {
    id: "book_mystery_dust",
    title: "Dust & Echoes",
    author: "Nia de Souza",
    coverImage:
      "https://images.unsplash.com/photo-1455885666463-075c8dfd0408?auto=format&fit=crop&w=400&q=60",
    genre: "Mystery",
    description:
      "A dual-timeline mystery unraveling an artist's disappearance in a desert ghost town.",
    publicationDate: "2024-01-10",
  },
  {
    id: "book_romance_atlas",
    title: "Atlas of Small Wonders",
    author: "Priya Raman",
    coverImage:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=60",
    genre: "Romance",
    description:
      "Two climate analysts fall for each other while mapping environmental joy.",
    publicationDate: "2020-03-18",
  },
];

export const reviews: Review[] = [
  {
    id: "review_001",
    userId: "user_alex",
    bookId: "book_fantasy_garden",
    rating: 5,
    text: "Carrington's prose is so lush that I kept rereading passages just to stay in the world a little longer.",
    createdAt: "2024-09-12T10:15:00.000Z",
  },
  {
    id: "review_002",
    userId: "user_brooke",
    bookId: "book_memoir_stillness",
    rating: 4,
    text: "Tender and sharp, with meditations on creativity that lingered for days.",
    createdAt: "2024-09-08T08:30:00.000Z",
  },
  {
    id: "review_003",
    userId: "user_cam",
    bookId: "book_space_rift",
    rating: 5,
    text: "Big ideas balanced with found-family warmth. The last chapter wrecked me in the best way.",
    createdAt: "2024-09-02T19:45:00.000Z",
  },
  {
    id: "review_004",
    userId: "user_alex",
    bookId: "book_mystery_dust",
    rating: 3,
    text: "Loved the vibe, but the mystery threads felt a touch undercooked.",
    createdAt: "2024-08-28T21:05:00.000Z",
  },
  {
    id: "review_005",
    userId: "user_brooke",
    bookId: "book_romance_atlas",
    rating: 4,
    text: "Hopeful and earnest. Made me want to start a wonder journal immediately.",
    createdAt: "2024-07-14T15:20:00.000Z",
  },
];

export const lists: List[] = [
  {
    id: "list_cozy_storm",
    userId: "user_alex",
    title: "Atmospheric Autumn Reads",
    description: "Stories that smell like rain on pavement and sound like distant thunder.",
    bookIds: ["book_fantasy_garden", "book_mystery_dust"],
  },
  {
    id: "list_space_hearts",
    userId: "user_cam",
    title: "Soft Sci-Fi Comforts",
    description: "Space adventures with emotional core and gentle stakes.",
    bookIds: ["book_space_rift", "book_romance_atlas"],
  },
  {
    id: "list_creative_pulse",
    userId: "user_brooke",
    title: "Creativity Fuel",
    description: "Thoughtful nonfiction that recharges the artistic soul.",
    bookIds: ["book_memoir_stillness", "book_romance_atlas"],
  },
];

export const follows: Follow[] = [
  { followerId: "user_alex", followingId: "user_brooke" },
  { followerId: "user_alex", followingId: "user_cam" },
  { followerId: "user_brooke", followingId: "user_alex" },
  { followerId: "user_cam", followingId: "user_alex" },
];
