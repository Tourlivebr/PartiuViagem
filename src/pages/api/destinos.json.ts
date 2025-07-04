import { getCollection } from 'astro:content';

export async function GET() {
  try {
    const destinos = await getCollection('destinos');
    const destinosData = destinos.map(destino => ({
      title: destino.data.title,
      location: destino.data.location,
      price: destino.data.price,
      slug: destino.slug,
      country: destino.data.country
    }));

    return new Response(JSON.stringify(destinosData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao buscar destinos:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar destinos' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}