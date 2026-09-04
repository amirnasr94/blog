export function Loading() {
  return (
    <div className="grid gap-6 grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="h-80 w-full bg-[#e5e7eb] animate-pulse rounded-lg"
        ></div>
      ))}
    </div>
  );
}
