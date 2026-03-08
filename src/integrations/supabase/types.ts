export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      auctions: {
        Row: {
          bid_count: number | null
          bid_increment: number
          category: string | null
          certifications: string[] | null
          condition: Database["public"]["Enums"]["product_condition"] | null
          created_at: string
          current_bid: number | null
          description: string | null
          end_time: string
          id: string
          images: string[] | null
          location: string | null
          reserve_price: number | null
          sectors: Database["public"]["Enums"]["sector_type"][] | null
          seller_id: string
          seller_name: string | null
          start_time: string
          starting_bid: number
          status: Database["public"]["Enums"]["auction_status"] | null
          title: string
          updated_at: string
        }
        Insert: {
          bid_count?: number | null
          bid_increment?: number
          category?: string | null
          certifications?: string[] | null
          condition?: Database["public"]["Enums"]["product_condition"] | null
          created_at?: string
          current_bid?: number | null
          description?: string | null
          end_time: string
          id?: string
          images?: string[] | null
          location?: string | null
          reserve_price?: number | null
          sectors?: Database["public"]["Enums"]["sector_type"][] | null
          seller_id: string
          seller_name?: string | null
          start_time: string
          starting_bid: number
          status?: Database["public"]["Enums"]["auction_status"] | null
          title: string
          updated_at?: string
        }
        Update: {
          bid_count?: number | null
          bid_increment?: number
          category?: string | null
          certifications?: string[] | null
          condition?: Database["public"]["Enums"]["product_condition"] | null
          created_at?: string
          current_bid?: number | null
          description?: string | null
          end_time?: string
          id?: string
          images?: string[] | null
          location?: string | null
          reserve_price?: number | null
          sectors?: Database["public"]["Enums"]["sector_type"][] | null
          seller_id?: string
          seller_name?: string | null
          start_time?: string
          starting_bid?: number
          status?: Database["public"]["Enums"]["auction_status"] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      bids: {
        Row: {
          amount: number
          auction_id: string
          created_at: string
          id: string
          user_id: string
          user_name: string | null
        }
        Insert: {
          amount: number
          auction_id: string
          created_at?: string
          id?: string
          user_id: string
          user_name?: string | null
        }
        Update: {
          amount?: number
          auction_id?: string
          created_at?: string
          id?: string
          user_id?: string
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bids_auction_id_fkey"
            columns: ["auction_id"]
            isOneToOne: false
            referencedRelation: "auctions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          conversation_id?: string
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          id: string
          items: Json
          payment_id: string | null
          payment_status: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          total: number
          type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          items?: Json
          payment_id?: string | null
          payment_status?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total: number
          type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          items?: Json
          payment_id?: string | null
          payment_status?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total?: number
          type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          id: string
          order_id: string | null
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          razorpay_signature: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          id?: string
          order_id?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          id?: string
          order_id?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand: string | null
          category: string
          certifications: string[] | null
          compatible_with: string[] | null
          condition: Database["public"]["Enums"]["product_condition"] | null
          created_at: string
          description: string | null
          id: string
          images: string[] | null
          in_stock: boolean | null
          location: string | null
          model: string | null
          price: number
          quantity: number | null
          rental_daily: number | null
          rental_deposit: number | null
          rental_insurance_per_day: number | null
          rental_monthly: number | null
          rental_weekly: number | null
          sectors: Database["public"]["Enums"]["sector_type"][] | null
          specs: Json | null
          subcategory: string | null
          supplier_id: string | null
          supplier_name: string | null
          supplier_rating: number | null
          sustainability: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          brand?: string | null
          category: string
          certifications?: string[] | null
          compatible_with?: string[] | null
          condition?: Database["public"]["Enums"]["product_condition"] | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          in_stock?: boolean | null
          location?: string | null
          model?: string | null
          price?: number
          quantity?: number | null
          rental_daily?: number | null
          rental_deposit?: number | null
          rental_insurance_per_day?: number | null
          rental_monthly?: number | null
          rental_weekly?: number | null
          sectors?: Database["public"]["Enums"]["sector_type"][] | null
          specs?: Json | null
          subcategory?: string | null
          supplier_id?: string | null
          supplier_name?: string | null
          supplier_rating?: number | null
          sustainability?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          brand?: string | null
          category?: string
          certifications?: string[] | null
          compatible_with?: string[] | null
          condition?: Database["public"]["Enums"]["product_condition"] | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          in_stock?: boolean | null
          location?: string | null
          model?: string | null
          price?: number
          quantity?: number | null
          rental_daily?: number | null
          rental_deposit?: number | null
          rental_insurance_per_day?: number | null
          rental_monthly?: number | null
          rental_weekly?: number | null
          sectors?: Database["public"]["Enums"]["sector_type"][] | null
          specs?: Json | null
          subcategory?: string | null
          supplier_id?: string | null
          supplier_name?: string | null
          supplier_rating?: number | null
          sustainability?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          city: string | null
          company_address: string | null
          company_name: string | null
          country: string | null
          created_at: string
          credit_limit: number | null
          display_name: string | null
          email: string | null
          gstin: string | null
          id: string
          pan: string | null
          phone: string | null
          sectors: Database["public"]["Enums"]["sector_type"][] | null
          state: string | null
          updated_at: string
          user_id: string
          verified: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          city?: string | null
          company_address?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string
          credit_limit?: number | null
          display_name?: string | null
          email?: string | null
          gstin?: string | null
          id?: string
          pan?: string | null
          phone?: string | null
          sectors?: Database["public"]["Enums"]["sector_type"][] | null
          state?: string | null
          updated_at?: string
          user_id: string
          verified?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          city?: string | null
          company_address?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string
          credit_limit?: number | null
          display_name?: string | null
          email?: string | null
          gstin?: string | null
          id?: string
          pan?: string | null
          phone?: string | null
          sectors?: Database["public"]["Enums"]["sector_type"][] | null
          state?: string | null
          updated_at?: string
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      rental_bookings: {
        Row: {
          created_at: string
          daily_rate: number
          delivery_type: string | null
          deposit: number | null
          end_date: string
          id: string
          insurance: boolean | null
          insurance_cost: number | null
          location: string | null
          product_id: string | null
          start_date: string
          status: Database["public"]["Enums"]["order_status"] | null
          subtotal: number
          tax: number | null
          total: number
          tracking_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          daily_rate: number
          delivery_type?: string | null
          deposit?: number | null
          end_date: string
          id?: string
          insurance?: boolean | null
          insurance_cost?: number | null
          location?: string | null
          product_id?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal: number
          tax?: number | null
          total: number
          tracking_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          daily_rate?: number
          delivery_type?: string | null
          deposit?: number | null
          end_date?: string
          id?: string
          insurance?: boolean | null
          insurance_cost?: number | null
          location?: string | null
          product_id?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal?: number
          tax?: number | null
          total?: number
          tracking_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rental_bookings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_searches: {
        Row: {
          alert_enabled: boolean | null
          created_at: string
          filters: Json | null
          id: string
          query: string
          user_id: string
        }
        Insert: {
          alert_enabled?: boolean | null
          created_at?: string
          filters?: Json | null
          id?: string
          query: string
          user_id: string
        }
        Update: {
          alert_enabled?: boolean | null
          created_at?: string
          filters?: Json | null
          id?: string
          query?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "buyer" | "seller" | "equipment_owner"
      auction_status: "upcoming" | "live" | "ended" | "cancelled"
      order_status: "pending" | "active" | "completed" | "cancelled"
      product_condition: "new" | "refurbished" | "used"
      sector_type:
        | "manufacturing"
        | "construction"
        | "energy_mining"
        | "renewable_energy"
        | "data_centers"
        | "semiconductor"
        | "ev_battery"
        | "oil_gas"
        | "automotive"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "buyer", "seller", "equipment_owner"],
      auction_status: ["upcoming", "live", "ended", "cancelled"],
      order_status: ["pending", "active", "completed", "cancelled"],
      product_condition: ["new", "refurbished", "used"],
      sector_type: [
        "manufacturing",
        "construction",
        "energy_mining",
        "renewable_energy",
        "data_centers",
        "semiconductor",
        "ev_battery",
        "oil_gas",
        "automotive",
      ],
    },
  },
} as const
