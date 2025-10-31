export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const res = await fetch(`${process.env.NEXT_PUBLIC_REVIEW_SERVICE_URL}`);

  const data = await res.json();
  return Response.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_REVIEW_SERVICE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return Response.json(data);
}
