import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { format } from 'date-fns';

export const config = {
  runtime: 'edge',
};

const font = fetch(
  new URL('../../assets/NotoSansCJKjp-Medium.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function og(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fontData = await font;

  const title = searchParams.get('title');
  let date = '';
  date = format(new Date(searchParams.get('date') || 0), 'MMMM dd, yyyy');
  const category = searchParams.get('category');
  const tags = [];
  for (const tag of (searchParams.get('tags') || '').split(',')) {
    tags.push(
      <div
        style={{
          background: '#e9f7fb',
          margin: '0 8px',
          padding: '10px 18px',
          borderRadius: '999px',
        }}
      >
        {tag}
      </div>
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: '#e9f7fb',
          width: '100%',
          height: '100%',
          padding: '56px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            height: '100%',
            background: 'white',
            borderRadius: '24px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '64px',
              background: '#404548',
              borderRadius: '24px 24px 0 0',
              fontSize: '32px',
              color: 'white',
              position: 'relative',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                marginLeft: '8px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: '#dc3535',
                  borderRadius: '100%',
                  marginLeft: '16px',
                }}
              />
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: '#ffc107',
                  borderRadius: '100%',
                  marginLeft: '16px',
                }}
              />
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: '#198754',
                  borderRadius: '100%',
                  marginLeft: '16px',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="https://github.com/laddge.png"
                alt="laddge"
                height="32px"
                style={{
                  marginRight: '16px',
                  borderRadius: '5px',
                }}
              />
              Laddge&apos;s Blog
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              minHeight: '33%',
              maxHeight: '40%',
              marginTop: '16px',
              padding: '24px 48px',
              fontSize: '56px',
              textAlign: 'center',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              fontSize: '40px',
              color: '#767676',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {date}
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              marginTop: '24px',
              fontSize: '30px',
              color: '#767676',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="30" style={{ marginRight: '16px' }} fill="#767676"><path d="M447.1 96h-172.1L226.7 50.75C214.7 38.74 198.5 32 181.5 32H63.1c-35.35 0-64 28.66-64 64v320c0 35.34 28.65 64 64 64h384c35.35 0 64-28.66 64-64V160C511.1 124.7 483.3 96 447.1 96zM463.1 416c0 8.824-7.178 16-16 16h-384c-8.822 0-16-7.176-16-16V96c0-8.824 7.178-16 16-16h117.5c4.273 0 8.293 1.664 11.31 4.688L255.1 144h192c8.822 0 16 7.176 16 16V416z"/></svg>
            {category}
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              marginTop: '20px',
              fontSize: '24px',
              color: '#1a7999',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {tags}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'NotoSansJP',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );
}
