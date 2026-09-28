import Link from "next/link";

export default function NotFound() { return <div className="not-found"><div><h1>404</h1><p>That page is outside the library.</p><Link className="button button-primary" href="/">BACK TO FITLOG</Link></div></div>; }
