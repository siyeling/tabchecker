import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
    return (
        <Html lang="ja">
            <Head />
            <body
                className='min-w-[256px]'
            >
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}