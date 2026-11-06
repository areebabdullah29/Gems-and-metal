"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import type { FormState } from "@/app/admin/actions";
import type { Product } from "@/lib/products";
import { MAX_PRODUCT_IMAGES } from "@/lib/constants";

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
  const existingImages = product?.images ?? [];
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const keptCount = existingImages.length - removedImages.length;
  const remainingSlots = MAX_PRODUCT_IMAGES - keptCount - newPreviews.length;

  return (
    <form action={formAction} className="flex flex-col gap-6">
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
        <label htmlFor="sizes" className="text-xs uppercase tracking-[0.15em] text-ink-soft">
          Available Sizes (optional)
        </label>
        <input
          id="sizes"
          name="sizes"
          type="text"
          placeholder="6, 7, 8, 9, 10"
          defaultValue={product?.sizes.join(", ")}
          className="mt-2 w-full border border-line bg-paper-raised px-4 py-3 text-sm text-ink outline-none focus:border-ink"
        />
        <p className="mt-2 text-xs text-ink-soft">
          Comma-separated (e.g. ring sizes). Leave blank for products that don&apos;t need a
          size — buyers won&apos;t see a size selector for them.
        </p>
      </div>

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
        <p className="text-xs uppercase tracking-[0.15em] text-ink-soft">
          Product Images ({keptCount + newPreviews.length}/{MAX_PRODUCT_IMAGES})
        </p>

        {existingImages.length > 0 && (
          <div className="mt-3 grid grid-cols-4 gap-3">
            {existingImages.map((url) => {
              const marked = removedImages.includes(url);
              return (
                <div key={url} className="relative">
                  <div
                    className={`relative aspect-square overflow-hidden bg-silver-100 ${
                      marked ? "opacity-40" : ""
                    }`}
                  >
                    <Image src={url} alt="" fill className="object-cover" unoptimized />
                  </div>
                  <label className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft">
                    <input
                      type="checkbox"
                      name="removeImages"
                      value={url}
                      checked={marked}
                      onChange={(e) => {
                        setRemovedImages((prev) =>
                          e.target.checked ? [...prev, url] : prev.filter((u) => u !== url)
                        );
                      }}
                      className="h-3.5 w-3.5"
                    />
                    {marked ? "Will be removed" : "Remove"}
                  </label>
                </div>
              );
            })}
          </div>
        )}

        <label htmlFor="images" className="mt-4 block text-xs uppercase tracking-[0.15em] text-ink-soft">
          Add Images {remainingSlots > 0 ? `(up to ${remainingSlots} more)` : "(limit reached)"}
        </label>
        <input
          id="images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          disabled={remainingSlots <= 0}
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []).slice(0, Math.max(0, remainingSlots));
            setNewPreviews(files.map((f) => URL.createObjectURL(f)));
          }}
          className="mt-2 w-full border border-line bg-paper-raised px-4 py-3 text-sm text-ink outline-none file:mr-4 file:border-0 file:bg-silver-100 file:px-3 file:py-1.5 file:text-xs file:uppercase file:tracking-wide disabled:opacity-50"
        />
        {newPreviews.length > 0 && (
          <div className="mt-3 grid grid-cols-4 gap-3">
            {newPreviews.map((src, i) => (
              <div key={src + i} className="relative aspect-square overflow-hidden bg-silver-100">
                <Image src={src} alt="" fill className="object-cover" unoptimized />
              </div>
            ))}
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
