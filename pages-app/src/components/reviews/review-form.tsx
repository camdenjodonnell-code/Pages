"use client";

import { useState } from "react";

type Props = {
  bookTitle?: string;
  onSubmit?: (data: { rating: number; text: string }) => Promise<void> | void;
};

const RATING_OPTIONS = [5, 4, 3, 2, 1];

export default function ReviewForm({ bookTitle, onSubmit }: Props) {
  const [rating, setRating] = useState<number>(5);
  const [text, setText] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit({ rating, text });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      setHasSubmitted(true);
      setText("");
      setRating(5);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-slate-900">
          Write a review{bookTitle ? ` for ${bookTitle}` : ""}
        </h3>
        <p className="text-sm text-slate-500">
          Share what you loved (or didn&apos;t) about this book. Ratings are
          completely optional.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-slate-700">Your rating:</span>
        <div className="flex gap-2">
          {RATING_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRating(option)}
              className={`rounded-full border px-3 py-1 text-sm font-semibold transition ${
                rating === option
                  ? "border-amber-500 bg-amber-100 text-amber-700"
                  : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="review" className="sr-only">
          Review text
        </label>
        <textarea
          id="review"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="What stuck with you? Favorite characters? Big feelings?"
          className="min-h-[120px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {hasSubmitted && (
          <span className="text-sm font-medium text-emerald-600">
            Thanks! Your review is saved locally for now.
          </span>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Saving..." : "Post review"}
        </button>
      </div>
    </form>
  );
}
