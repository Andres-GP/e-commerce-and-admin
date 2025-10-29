export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CART_SERVICE_URL}`, {
    method: "GET",
  });

  const data = await res.json();
  return Response.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_CART_SERVICE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return Response.json(data);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "guest";
  const productId = searchParams.get("productId");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CART_SERVICE_URL}?userId=${userId}&productId=${productId}`,
    { method: "DELETE" }
  );

  const data = await res.json();
  return Response.json(data);
}
