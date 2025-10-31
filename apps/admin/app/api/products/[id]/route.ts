import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCTS_SERVICE_URL}/${params.id}`
  );
  const data = await res.json();
  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCTS_SERVICE_URL}/${params.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCTS_SERVICE_URL}/${params.id}`,
    {
      method: "DELETE",
    }
  );
  const data = await res.json();
  return NextResponse.json(data);
}
