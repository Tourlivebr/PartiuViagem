import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { searchTerm } = await request.json();
    
    if (!searchTerm) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const allDestinos = await getCollection('destinos');
    
    const filteredDestinos = allDestinos.filter(destino => {
      const titleMatch = destino.data.title.toLowerCase().includes(searchTerm.toLowerCase());
      const dateMatch = destino.data.tripDates.some(date => 
        date.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return titleMatch || dateMatch;
    });

    return new Response(JSON.stringify(filteredDestinos.map(destino => ({
      slug: destino.slug,
      title: destino.data.title,
      tripDates: destino.data.tripDates,
      url: `/destinos/${destino.slug}`
    }))), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error processing search:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};