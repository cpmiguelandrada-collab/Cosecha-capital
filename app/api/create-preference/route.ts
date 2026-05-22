import { NextResponse } from "next/server";
import {
  MercadoPagoConfig,
  Preference,
} from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken:
    process.env.MP_ACCESS_TOKEN || "",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY:");
    console.log(body);

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
  id: "investment",
  title:
    body.title || "Inversión",
  quantity: 1,
  unit_price: Number(body.amount),
  currency_id: "ARS",
},
        ],
      },
    });

    console.log("RESPONSE:");
    console.log(response);

    return NextResponse.json({
      init_point:
        response.init_point ||
        response.sandbox_init_point,
    });
  } catch (error: any) {
    console.log("ERROR:");
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