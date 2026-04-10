/**
 * Top navigation shell: purely presentational (links do not route in this SPA).
 * Labels come from `constants` so you can swap copy in one place.
 */
import { navLinks } from "../constants";

const NavBar = () => {
  return (
    <header>
      <nav>
        <img
          className="nav-bar-logo"
          src="/logo.svg"
          alt="Apple logo"
          width={18}
          height={22}
          loading="eager"
          decoding="sync"
        />

        <ul className="nav-bar-links">
          {navLinks.map(({ label }) => (
            <li key={label}>
              <a href={label}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-bar-actions flex-center gap-3">
          <button type="button" aria-label="Search">
            <img
              className="nav-bar-icon"
              src="/search.svg"
              alt=""
              width={22}
              height={22}
              loading="eager"
              decoding="sync"
            />
          </button>
          <button type="button" aria-label="Shopping bag">
            <img
              className="nav-bar-icon"
              src="/cart.svg"
              alt=""
              width={22}
              height={22}
              loading="eager"
              decoding="sync"
            />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
