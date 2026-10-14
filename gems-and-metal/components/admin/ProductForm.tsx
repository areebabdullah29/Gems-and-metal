"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import type { FormState } from "@/app/admin/actions";
import type { Product } from "@/lib/products";

const initialState: FormState = { error: null };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-ink px-7 py-3 text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:bg-silver-900 disabled:opacity-60"
    >
      {pending ? "Saving..." : label}
    </button>
  );
}

export default function ProductForm({
  action,
  product,
  submitLabel,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  product?: Product;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, initialState);
  const [preview, setPreview] = useState<string | null>(product?.image ?? null);

  return (
    <form action={formAction} className="flex flex-col gap-6" encType="multipart/form-data">
      <div>
        <label htmlFor="name" className="text-xs uppercase tracking-[0.15em] text-ink-soft">
          Product Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={product?.name}
          className="mt-2 w-full border border-line bg-paper-raised px-4 py-3 text-sm text-ink outline-none focus:border-ink"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="text-xs uppercase tracking-[0.15em] text-ink-soft">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            required
            defaultValue={product?.price}
            className="mt-2 w-full border border-line bg-paper-raised px-4 py-3 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label htmlFor="category" className="text-xs uppercase tracking-[0.15em] text-ink-soft">
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            required
            placeholder="Rings, Necklaces, Earrings..."
            defaultValue={product?.category}
            className="mt-2 w-full border border-line bg-paper-raised px-4 py-3 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="material" className="text-xs uppercase tracking-[0.15em] text-ink-soft">
            Material
          </label>
          <input
            id="material"
            name="material"
            type="text"
            required
            placeholder="Sterling Silver (925)"
            defaultValue={product?.material}
            className="mt-2 w-full border border-line bg-paper-raised px-4 py-3 text-sm text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label
            htmlFor="availability"
            className="text-xs uppercase tracking-[0.15em] text-ink-soft"
          >
            Availability
          </label>
          <select
            id="availability"
            name="availability"
            defaultValue={product?.availability ?? "in_stock"}
            className="mt-2 w-full border border-line bg-paper-raised px-4 py-3 text-sm text-ink outline-none focus:border-ink"
          >
            <option value="in_stock">In Stock</option>
            <option value="made_to_order">Made to Order</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-3 border border-line bg-paper-raised px-4 py-3">
        <input
          id="isCustom"
          name="isCustom"
          type="checkbox"
          defaultChecked={product?.isCustom ?? false}
          className="h-4 w-4"
        />
        <span className="text-sm text-ink">
          Custom order
          <span className="block text-xs text-ink-soft">
            Requires a 50% advance payment at checkout instead of full payment up front.
          </span>
        </span>
      </label>

      <div>
        <label htmlFor="description" className="text-xs uppercase tracking-[0.15em] text-ink-soft">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={product?.description}
          className="mt-2 w-full border border-line bg-paper-raised px-4 py-3 text-sm text-ink outline-none focus:border-ink"
        />
      </div>

      <div>
        <label htmlFor="image" className="text-xs uppercase tracking-[0.15em] text-ink-soft">
          Product Image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
          className="mt-2 w-full border border-line bg-paper-raised px-4 py-3 text-sm text-ink outline-none file:mr-4 file:border-0 file:bg-silver-100 file:px-3 file:py-1.5 file:text-xs file:uppercase file:tracking-wide"
        />
        {preview && (
          <div className="relative mt-4 aspect-square w-40 overflow-hidden bg-silver-100">
            <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
          </div>
        )}
      </div>

      {state.error && <p className="text-sm text-red-700">{state.error}</p>}

      <div className="flex items-center gap-4">
        <SubmitButton label={submitLabel} />
        <Link href="/admin" className="text-xs uppercase tracking-[0.15em] text-ink-soft hover:text-ink">
          Cancel
        </Link>
      </div>
    </form>
  );
}
