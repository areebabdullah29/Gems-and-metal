export default function EmptyState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center border border-dashed border-line px-8 py-20 text-center">
      <p className="font-display text-xl text-ink">{title}</p>
      <p className="mt-3 max-w-sm text-sm text-ink-soft">{message}</p>
    </div>
  );
}
