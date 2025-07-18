export async function POST(req: Request) {
  const { url } = await req.json();
  const apiKey = "ba696766d6d78cd52749d198690505d4658835b0";

  try {
    const apiURL = `https://arolinks.com/api?api=${apiKey}&url=${encodeURIComponent(url)}`;
    const response = await fetch(apiURL);
    const data = await response.json();

    return Response.json({
      shortenedUrl: data.shortenedUrl || url,
      status: data.status,
    });
  } catch {
    return Response.json({ shortenedUrl: url, status: "error" });
  }
}