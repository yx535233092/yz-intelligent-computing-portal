import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * 获取指定标签的文件列表
 * @param request 请求对象
 * @returns 文件列表
 */
export function GET(request: NextRequest) {
  try {
    const label = request.nextUrl.searchParams.get('label') || '';
    const filePath = path.join(process.cwd(), 'public', label);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        {
          error: '文件夹不存在',
        },
        { status: 404 }
      );
    }

    const files = fs.readdirSync(filePath);
    const pdfFiles = files
      .filter((filename) => filename.toLowerCase().endsWith('.pdf'))
      .map((filename) => {
        const fullPath = path.join(filePath, filename);
        const stat = fs.statSync(fullPath);

        return {
          name: filename,
          url: `/${label}/${filename}`,
          size: stat.size,
          lastModified: stat.mtime,
          type: 'pdf',
        };
      });

    return NextResponse.json({
      files: pdfFiles,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: '读取文件夹失败',
      },
      { status: 500 }
    );
  }
}
