import OpenAI from "openai";

const openai = new OpenAI({
    organization: process.env.ORG,
    project: process.env.PROJECT,
    apiKey: process.env.APIKEY
});

async function generateImage(prompt) {
  const image = await openai.images.generate({ model: "dall-e-3", prompt });
  return image.data;
}

export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || null;
  if (query) {
    const data = await generateImage(query)
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
    console.log(data)
  } else {
    return new Response(`Please input query`);
  }
}

export const runtime = 'nodejs';
