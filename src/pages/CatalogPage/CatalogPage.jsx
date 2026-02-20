import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import { resetItems } from "../../redux/campers/slice";
import CamperCard from "../../components/CamperCard/CamperCard";
import styles from "./CatalogPage.module.css";
import { LuWind, LuUtensils, LuTv } from "react-icons/lu";
import { TbHierarchy2, TbGridDots } from "react-icons/tb";
import { BsGrid1X2, BsGrid3X3Gap } from "react-icons/bs";
import { PiShower } from "react-icons/pi";
import { HiOutlineMapPin } from "react-icons/hi2";
import { ImSpinner2 } from "react-icons/im";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, isLoading, hasMore } = useSelector((state) => state.campers);

  const [page, setPage] = useState(1);
  const [location, setLocation] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [vehicleType, setVehicleType] = useState("");

  useEffect(() => {
    document.title = "Catalog";
    return () => {
      document.title = "TravelTrucks";
    };
  }, []);

  useEffect(() => {
    dispatch(fetchCampers({ page, limit: 4 }));
  }, [dispatch, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const toggleEquipment = (item) => {
    setEquipment((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const handleSearch = () => {
    dispatch(resetItems());
    setPage(1);

    const filters = {};
    if (location) filters.location = location;
    if (vehicleType) filters.form = vehicleType;
    if (equipment.includes("AC")) filters.AC = true;
    if (equipment.includes("automatic")) filters.transmission = "automatic";
    if (equipment.includes("kitchen")) filters.kitchen = true;
    if (equipment.includes("TV")) filters.TV = true;
    if (equipment.includes("bathroom")) filters.bathroom = true;

    dispatch(fetchCampers({ page: 1, limit: 4, filters }));
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.locationWrapper}>
          <label className={styles.label}>Location</label>
          <div className={styles.inputContainer}>
            <HiOutlineMapPin className={styles.mapIcon} />
            <input
              type="text"
              placeholder="City"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.locationInput}
            />
          </div>
        </div>

        <div className={styles.filtersWrapper}>
          <p className={styles.filterTitle}>Filters</p>

          <h3 className={styles.sectionTitle}>Vehicle equipment</h3>
          <hr className={styles.divider} />
          <div className={styles.filterGrid}>
            <button
              className={`${styles.filterBtn} ${equipment.includes("AC") ? styles.active : ""}`}
              onClick={() => toggleEquipment("AC")}
            >
              <LuWind size={32} />
              <span>AC</span>
            </button>
            <button
              className={`${styles.filterBtn} ${equipment.includes("automatic") ? styles.active : ""}`}
              onClick={() => toggleEquipment("automatic")}
            >
              <TbHierarchy2 size={32} />
              <span>Automatic</span>
            </button>
            <button
              className={`${styles.filterBtn} ${equipment.includes("kitchen") ? styles.active : ""}`}
              onClick={() => toggleEquipment("kitchen")}
            >
              <LuUtensils size={32} />
              <span>Kitchen</span>
            </button>
            <button
              className={`${styles.filterBtn} ${equipment.includes("TV") ? styles.active : ""}`}
              onClick={() => toggleEquipment("TV")}
            >
              <LuTv size={32} />
              <span>TV</span>
            </button>
            <button
              className={`${styles.filterBtn} ${equipment.includes("bathroom") ? styles.active : ""}`}
              onClick={() => toggleEquipment("bathroom")}
            >
              <PiShower size={32} />
              <span>Bathroom</span>
            </button>
          </div>

          <h3 className={styles.sectionTitle}>Vehicle type</h3>
          <hr className={styles.divider} />
          <div className={styles.filterGrid}>
            <button
              className={`${styles.filterBtn} ${vehicleType === "panelTruck" ? styles.active : ""}`}
              onClick={() => setVehicleType("panelTruck")}
            >
              <BsGrid1X2 size={32} />
              <span>Van</span>
            </button>
            <button
              className={`${styles.filterBtn} ${vehicleType === "fullyIntegrated" ? styles.active : ""}`}
              onClick={() => setVehicleType("fullyIntegrated")}
            >
              <BsGrid3X3Gap size={32} />
              <span>Fully Integrated</span>
            </button>
            <button
              className={`${styles.filterBtn} ${vehicleType === "alcove" ? styles.active : ""}`}
              onClick={() => setVehicleType("alcove")}
            >
              <TbGridDots size={32} />
              <span>Alcove</span>
            </button>
          </div>

          <button className={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
        </div>
      </aside>

      <section className={styles.content}>
        <div className={styles.list}>
          {items.length > 0
            ? items.map((camper) => (
                <CamperCard key={camper.id} camper={camper} />
              ))
            : !isLoading && (
                <p className={styles.noResults}>
                  No campers found. Try different filters! 🚐
                </p>
              )}
        </div>

        {isLoading && (
          <div className={styles.loaderWrapper}>
            <ImSpinner2 className={styles.spinner} />
            <p>Loading campers...</p>
          </div>
        )}

        {hasMore && !isLoading && items.length > 0 && (
          <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </section>
    </div>
  );
};

export default CatalogPage;
