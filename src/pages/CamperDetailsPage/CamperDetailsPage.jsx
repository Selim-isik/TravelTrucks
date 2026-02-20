import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoStar } from "react-icons/io5";
import { HiOutlineMapPin } from "react-icons/hi2";
import {
  LuWind,
  LuUtensils,
  LuTv,
  LuShowerHead,
  LuCalendar,
} from "react-icons/lu";
import { TbHierarchy2, TbGasStation } from "react-icons/tb";
import { BsFuelPump, BsDroplet } from "react-icons/bs";
import { MdRadio } from "react-icons/md";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { PiOven } from "react-icons/pi";
import styles from "./CamperDetailsPage.module.css";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("features");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchCamperDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`,
        );
        setCamper(data);
        document.title = "Details";
      } catch (error) {
        console.error("Error fetching camper details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCamperDetails();

    return () => {
      document.title = "TravelTrucks";
    };
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    e.target.reset();
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <IoStar key={i} color={i < rating ? "#FFC531" : "#F2F4F7"} size={16} />
      ));
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  if (isLoading) return <p className={styles.loading}>Loading details...</p>;
  if (!camper) return <p className={styles.error}>Camper not found!</p>;

  return (
    <div className={styles.pageContainer}>
      {showToast && (
        <div className={styles.toast}>Reservation sent successfully! 🚐✨</div>
      )}
      <div className={styles.headerContent}>
        <h1 className={styles.title}>{camper.name}</h1>
        <div className={styles.meta}>
          <div className={styles.ratingWrapper}>
            <IoStar className={styles.starIcon} size={16} />
            <span className={styles.ratingText}>
              {camper.rating}({camper.reviews.length} Reviews)
            </span>
          </div>
          <div className={styles.locationWrapper}>
            <HiOutlineMapPin size={16} />
            <span>{camper.location}</span>
          </div>
        </div>
        <p className={styles.price}>€{Number(camper.price).toFixed(2)}</p>
      </div>

      <div className={styles.gallery}>
        {camper.gallery.map((img, index) => (
          <div key={index} className={styles.imageWrapper}>
            <img src={img.original} alt={`${camper.name} ${index}`} />
          </div>
        ))}
      </div>

      <p className={styles.description}>{camper.description}</p>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabBtn} ${activeTab === "features" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === "reviews" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.leftColumn}>
          {activeTab === "features" ? (
            <div className={styles.featuresColumn}>
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
                {camper.bathroom && (
                  <div className={styles.badge}>
                    <LuShowerHead size={20} />
                    <span>Bathroom</span>
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
                {camper.radio && (
                  <div className={styles.badge}>
                    <MdRadio size={20} />
                    <span>Radio</span>
                  </div>
                )}
                {camper.refrigerator && (
                  <div className={styles.badge}>
                    <CgSmartHomeRefrigerator size={20} />
                    <span>Fridge</span>
                  </div>
                )}
                {camper.microwave && (
                  <div className={styles.badge}>
                    <PiOven size={20} />
                    <span>Microwave</span>
                  </div>
                )}
                {camper.gas && (
                  <div className={styles.badge}>
                    <TbGasStation size={20} />
                    <span>Gas</span>
                  </div>
                )}
                {camper.water && (
                  <div className={styles.badge}>
                    <BsDroplet size={20} />
                    <span>Water</span>
                  </div>
                )}
              </div>

              <h3 className={styles.detailsTitle}>Vehicle details</h3>
              <hr className={styles.divider} />

              <ul className={styles.detailsList}>
                <li>
                  <span>Form</span>
                  <span>{capitalize(camper.form)}</span>
                </li>
                <li>
                  <span>Length</span>
                  <span>{camper.length}</span>
                </li>
                <li>
                  <span>Width</span>
                  <span>{camper.width}</span>
                </li>
                <li>
                  <span>Height</span>
                  <span>{camper.height}</span>
                </li>
                <li>
                  <span>Tank</span>
                  <span>{camper.tank}</span>
                </li>
                <li>
                  <span>Consumption</span>
                  <span>{camper.consumption}</span>
                </li>
              </ul>
            </div>
          ) : (
            <div className={styles.reviewsList}>
              {camper.reviews.map((rev, index) => (
                <div key={index} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.avatar}>{rev.reviewer_name[0]}</div>
                    <div className={styles.reviewerMeta}>
                      <p className={styles.reviewerName}>{rev.reviewer_name}</p>
                      <div className={styles.stars}>
                        {renderStars(rev.reviewer_rating)}
                      </div>
                    </div>
                  </div>
                  <p className={styles.reviewComment}>{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.formColumn}>
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Book your campervan now</h3>
            <p className={styles.formSubtitle}>
              Stay connected! We are always ready to help you.
            </p>

            <form className={styles.bookingForm} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name*"
                required
                className={styles.input}
              />
              <input
                type="email"
                placeholder="Email*"
                required
                className={styles.input}
              />
              <div className={styles.dateInputWrapper}>
                <input
                  type="date"
                  placeholder="Booking date*"
                  required
                  className={styles.dateInput}
                />
                <LuCalendar className={styles.calendarIcon} size={20} />
              </div>
              <textarea
                placeholder="Comment"
                className={styles.textarea}
              ></textarea>
              <button type="submit" className={styles.sendBtn}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;
