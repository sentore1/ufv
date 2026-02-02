import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang');
    const filePath = path.join(process.cwd(), 'messages', `${lang}.json`);
    const content = await readFile(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    return NextResponse.json({}, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const { language, data } = await request.json();
    const filePath = path.join(process.cwd(), 'messages', `${language}.json`);
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save translations' }, { status: 500 });
  }
}
