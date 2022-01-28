import "../styles/globals.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.webp" />
      </Head>

      <div className="main-wrapper">
        <nav>
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <Component {...pageProps} />

        <footer>
          <ul className="social-links">
            <li className="social-button">
              <a
                href="https://github.com/POWRFULCOW89"
                target="_blank"
                rel="noreferrer"
                aria-label="Link to Diego Melo's GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li className="social-button">
              <a
                href="https://mx.linkedin.com/in/diego-melo-mx"
                rel="noreferrer"
                target="_blank"
                aria-label="Link to Diego Melo's LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
          <div className="divider"></div>
          <p className="footer-author">© 2022 Diego Melo</p>
        </footer>
      </div>
    </>
  );
}

export default MyApp;
