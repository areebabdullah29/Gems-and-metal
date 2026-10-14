// Hand-written to match supabase/schema.sql. If you change the schema,
// update this file too (there's no live project yet to generate it from
// via `supabase gen types`).
//
// Shape must match postgrest-js's GenericSchema/GenericTable exactly
// (Relationships on every table, Views + Functions on the schema) or table
// operations silently degrade to `never` instead of a type error.

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string;
          price: number;
          category: string;
          material: string;
          is_custom: boolean;
          availability: "in_stock" | "made_to_order";
          stock: number | null;
          images: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string;
          price: number;
          category?: string;
          material?: string;
          is_custom?: boolean;
          availability?: "in_stock" | "made_to_order";
          stock?: number | null;
          images?: string[];
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          order_number: number;
          customer_name: string;
          customer_phone: string;
          shipping_address: string;
          items: unknown;
          total_price: number;
          amount_paid_now: number;
          remaining_balance: number;
          payment_method: "COD" | "Bank/Wallet";
          screenshot_url: string | null;
          status: "awaiting_verification" | "confirmed" | "shipped" | "cancelled";
          created_at: string;
        };
        Insert: {
          id?: string;
          customer_name: string;
          customer_phone: string;
          shipping_address: string;
          items: unknown;
          total_price: number;
          amount_paid_now: number;
          remaining_balance?: number;
          payment_method: "COD" | "Bank/Wallet";
          screenshot_url?: string | null;
          status?: "awaiting_verification" | "confirmed" | "shipped" | "cancelled";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
