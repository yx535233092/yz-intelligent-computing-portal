import { NextRequest, NextResponse } from 'next/server';

function POST(req: NextRequest) {
  console.log('return data ', req.body);
  const searchParams = req.nextUrl.searchParams;
  return NextResponse.json({
    message: 'success',
  });
  // fetch('http://39.175.132.230:35034/speech-to-text', {
  //   method: 'POST',
  //   body: req.body,
  // });
}
export { POST };
