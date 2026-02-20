import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <p className={styles.subtitle}>
          You can find everything you want in our catalog
        </p>
        <button
          className={styles.ctaButton}
          onClick={() => navigate("/catalog")}
        >
          View Now
        </button>
      </div>
    </section>
  );
};

export default HomePage;
