import { defineCollection, z } from 'astro:content';

// Nova collection para destinos usando API legacy
const destinos = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		location: z.string(),
		country: z.string(),
		price: z.number(),
		currency: z.string().default('R$'),
		rating: z.number().min(0).max(5),
		reviewCount: z.number(),
		featuredImage: z.string(),
		galleryImages: z.array(z.string()).optional(),
		isPromo: z.boolean().default(false),
		order: z.number().optional(),
		tripDates: z.array(z.string()),
	}),
});

export const collections = { destinos };
