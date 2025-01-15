import { NextResponse } from 'next/server';
import { z } from 'zod';

export const gemSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().min(1).max(1000),
	type: z.enum(['music', 'drawing', 'handcraft']),
});

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const validated = gemSchema.parse(body);

		// Your database logic here

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
	}
}
