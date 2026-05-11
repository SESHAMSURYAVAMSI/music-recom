export default function SkeletonCard() {
  return (
    <div className="min-w-[220px] animate-pulse">
      <div className="shimmer h-[330px] rounded-2xl bg-zinc-900" />

      <div className="mt-3 h-4 w-32 rounded bg-zinc-800" />
    </div>
  );
}