export default function Nav() {
  return (
    <nav className="nav">
      <ul className="nav__links">
        <li>
          <a className="draw-link" href="#team">
            Team
          </a>
        </li>
        <li>
          <a className="draw-link" href="#services">
            Services
          </a>
        </li>
        <li>
          <a className="draw-link" href="#stories">
            Stories
          </a>
        </li>
      </ul>

      <a href="#top" className="nav__logo" aria-label="Momentum Mentoring — home">
        <img src="/assets/svg/LT2.svg" alt="Momentum Mentoring" />
      </a>

      <a className="draw-link nav__contact" href="#contact">
        Contact
      </a>
    </nav>
  );
}
