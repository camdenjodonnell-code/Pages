import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";

import type { Book } from "@/types";

type Props = {
  book: Book;
  averageRating?: number;
  href?: string;
};

export default function BookCard({ book, averageRating, href }: Props) {
  const content = (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
        <Image
          src={book.coverImage}
          alt={`${book.title} cover`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-5 py-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-900 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-sm text-slate-500">{book.author}</p>
        </div>
        <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
            {book.genre}
          </span>
          {typeof averageRating === "number" && averageRating > 0 ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
              <StarIcon className="h-4 w-4" />
              {averageRating.toFixed(1)}
            </span>
          ) : (
            <span className="text-xs text-slate-400">Not rated yet</span>
          )}
        </div>
      </div>
    </article>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="h-full">
      {content}
    </Link>
  );
}
