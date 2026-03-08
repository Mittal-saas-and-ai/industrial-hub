import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { type, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = "";
    let userPrompt = "";

    if (type === "product-suggestions") {
      systemPrompt = "You are an industrial product recommendation engine. Based on the user's recent activity and product context, suggest 3-5 highly relevant products or bundles.";
      userPrompt = `Given this product context: ${JSON.stringify(context)}. Return JSON with suggestions array, each having: title, reason, estimatedPrice, category.`;
    } else if (type === "predictive-pricing") {
      systemPrompt = "You are an industrial market pricing analyst. Analyze pricing trends and provide predictions.";
      userPrompt = `Analyze pricing for: ${JSON.stringify(context)}. Return JSON with: currentFairPrice, predictedTrend (up/down/stable), confidence (0-100), reasoning.`;
    } else if (type === "compatibility-check") {
      systemPrompt = "You are an industrial equipment compatibility expert. Check if parts/consumables are compatible with given machinery.";
      userPrompt = `Check compatibility: Machine: ${context.machine}, Part: ${context.part}. Return JSON with: compatible (boolean), confidence (0-100), notes, alternatives (array of strings).`;
    } else if (type === "carbon-calculator") {
      systemPrompt = "You are a sustainability analyst for industrial equipment. Calculate carbon savings from using refurbished/recycled items.";
      userPrompt = `Calculate carbon savings for: ${JSON.stringify(context)}. Return JSON with: co2SavedKg, treesEquivalent, percentReduction, recommendations (array).`;
    } else {
      return new Response(JSON.stringify({ error: "Unknown suggestion type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body: any = {
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    };

    // Use tool calling for structured output
    if (type === "product-suggestions") {
      body.tools = [{
        type: "function",
        function: {
          name: "return_suggestions",
          description: "Return product suggestions",
          parameters: {
            type: "object",
            properties: {
              suggestions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    reason: { type: "string" },
                    estimatedPrice: { type: "number" },
                    category: { type: "string" }
                  },
                  required: ["title", "reason", "estimatedPrice", "category"]
                }
              }
            },
            required: ["suggestions"]
          }
        }
      }];
      body.tool_choice = { type: "function", function: { name: "return_suggestions" } };
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits depleted" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const t = await response.text();
      console.error("AI suggest error:", response.status, t);
      throw new Error("AI service error");
    }

    const data = await response.json();
    
    // Extract from tool call or content
    let result;
    const choice = data.choices?.[0];
    if (choice?.message?.tool_calls?.[0]) {
      result = JSON.parse(choice.message.tool_calls[0].function.arguments);
    } else {
      // Try parsing content as JSON
      const content = choice?.message?.content || "";
      try {
        result = JSON.parse(content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());
      } catch {
        result = { raw: content };
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("suggest error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
