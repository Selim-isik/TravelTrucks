import { useState } from "react";
import { Link } from "react-router-dom";
import { IoStar, IoHeartOutline, IoHeart } from "react-icons/io5";
import { HiOutlineMapPin } from "react-icons/hi2";
import { LuWind, LuUtensils, LuTv } from "react-icons/lu";
import { TbHierarchy2 } from "react-icons/tb";
import { BsFuelPump } from "react-icons/bs";
import styles from "./CamperCard.module.css";

const CamperCard = ({ camper }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={camper.gallery[0].thumb}
          alt={camper.name}
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.header}>
          <h2 className={styles.name}>{camper.name}</h2>
          <div className={styles.priceWrapper}>
            <p className={styles.price}>€{Number(camper.price).toFixed(2)}</p>
            <button
              className={styles.heartBtn}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? (
                <IoHeart color="#E44848" size={24} />
              ) : (
                <IoHeartOutline size={24} />
              )}
            </button>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.rating}>
            <IoStar className={styles.starIcon} size={16} />
            <span className={styles.ratingText}>
              {camper.rating} ({camper.reviews.length} Reviews)
            </span>
          </div>
          <div className={styles.location}>
            <HiOutlineMapPin size={16} />
            <span>{camper.location}</span>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.badges}>
          <div className={styles.badge}>
            <TbHierarchy2 size={20} />
            <span>{capitalize(camper.transmission)}</span>
          </div>
          <div className={styles.badge}>
            <BsFuelPump size={20} />
            <span>{capitalize(camper.engine)}</span>
          </div>
          {camper.AC && (
            <div className={styles.badge}>
              <LuWind size={20} />
              <span>AC</span>
            </div>
          )}
          {camper.kitchen && (
            <div className={styles.badge}>
              <LuUtensils size={20} />
              <span>Kitchen</span>
            </div>
          )}
          {camper.TV && (
            <div className={styles.badge}>
              <LuTv size={20} />
              <span>TV</span>
            </div>
          )}
        </div>

        <Link
          to={`/catalog/${camper.id}`}
          target="_blank"
          className={styles.showMoreBtn}
        >
          Show more
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;
