import { Link } from "react-router-dom";
import "./PlaceholderPage.css";

type Props = {
  title: string;
  body: string;
};

export function PlaceholderPage({ title, body }: Props) {
  return (
    <main className="placeholder">
      <p className="eyebrow">CloudNetIQ</p>
      <h1>{title}</h1>
      <p>{body}</p>
      <Link to="/" className="back">
        ← Back to home
      </Link>
    </main>
  );
}
