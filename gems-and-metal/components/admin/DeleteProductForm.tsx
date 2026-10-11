"use client";

import { deleteProductAction } from "@/app/admin/actions";

export default function DeleteProductForm({
  id,
  productName,
}: {
  id: string;
  productName: string;
}) {
  const deleteWithId = deleteProductAction.bind(null, id);

  return (
    <form
      action={deleteWithId}
      onSubmit={(e) => {
        if (!confirm(`Delete "${productName}"? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="text-xs uppercase tracking-[0.15em] text-ink-soft transition-colors hover:text-red-700"
      >
        Delete
      </button>
    </form>
  );
}
