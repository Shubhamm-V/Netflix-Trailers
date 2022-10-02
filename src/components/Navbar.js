import { useEffect } from "react";
import classes from "./Navbar.module.css";
import { useState } from "react";
const Navbar = () => {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll",null);
    };
  }, []);
  return (
    <div className={`${classes.nav} ${show ? classes["nav-scroll"] : ""}`}>
      <img
        className={classes.nav_logo}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <img
        className={classes.nav_avatar}
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Netflix Logo"
      />
    </div>
  );
};

export default Navbar;
