/*global chrome*/
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css"



const App = ({Component, pageProps}:AppProps) => {
    return (
        <>
            <body
                className="min-w-96"
            >
                <Component {...pageProps} />
            </body>
        </>
    )
}

export default App;