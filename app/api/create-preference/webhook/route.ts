import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("WEBHOOK:");
    console.log(body);

    if (body.type === "payment") {
      const paymentId = body.data.id;

      console.log("PAYMENT ID:", paymentId);

      // DEMO:
      // aprobar última inversión pending

      const { data: investments } = await supabase
        .from("investments")
        .select("*")
        .eq("status", "pending")
        .limit(1);

      if (
        investments &&
        investments.length > 0
      ) {
        const investment = investments[0];

        await supabase
          .from("investments")
          .update({
            status: "approved",
          })
          .eq("id", investment.id);

        console.log(
          "INVERSIÓN APROBADA:",
          investment.id
        );
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: true,
      },
      {
        status: 500,
      }
    );
  }
}