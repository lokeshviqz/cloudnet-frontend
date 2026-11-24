import { NavLink } from "react-router-dom";
import "./Header.css";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/docs", label: "Docs" },
  { to: "/plans", label: "Plans" },
  { to: "/login", label: "Login" },
  { to: "/register", label: "Register" },
];

export function Header() {
  return (
    <header className="site-header">
      <NavLink to="/" className="brand" end>
        CloudNetIQ
      </NavLink>
      <nav className="site-nav" aria-label="Primary">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
