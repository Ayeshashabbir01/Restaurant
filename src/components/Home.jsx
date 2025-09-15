import React from "react";
import { Link } from "react-scroll";
import "./Home.css";

function Home() {
  return (
    <section id="home" className="home !p-0 !m-0 bg-[url('/assets/images/hero-banner.jpg')] bg-center bg-cover">
      <div className="home-content bg-black/70 w-full p-16">
        <h1>
          Welcome to <span>Easy Serve</span>
        </h1>
        <p>
          Experience culinary excellence in an atmosphere of refined elegance
        </p>
        <div className="home-buttons">
          <Link
            to="reservations"
            spy={true}
            smooth={true}
            offset={-80}
            duration={400}
            className="btn"
          >
            Make Reservation
          </Link>
          <Link
            to="menu"
            spy={true}
            smooth={true}
            offset={-80}
            duration={400}
            className="btn"
          >
            View Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
