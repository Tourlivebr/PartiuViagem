import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
	}),
});

// Nova collection para destinos
const destinos = defineCollection({
	loader: glob({ base: './src/content/destinos', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		location: z.string(),
		country: z.string(),
		price: z.number(),
		currency: z.string().default('R$'),
		rating: z.number().min(0).max(5),
		reviewCount: z.number(),
		featuredImage: image(),
		galleryImages: z.array(image()).optional(),
		isPromo: z.boolean().default(false),
		order: z.number().optional(),
	}),
});

export const collections = { blog, destinos };
