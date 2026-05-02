"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./PortfolioGallery.module.css";

export default function PortfolioGallery({ images, categories }) {
  const [filter, setFilter] = useState("All");

  const filteredImages =
    filter === "All"
      ? images
      : images.filter((img) => img.category === filter);

  return (
    <div>
      <div className={styles.filters}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterChip} ${
              filter === cat ? styles.active : ""
            }`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.masonry}>
        {filteredImages.map((img) => (
          <div key={img.id} className={styles.imageCard}>
            <Image
              src={img.url}
              alt={img.title || "Portfolio Image"}
              width={600}
              height={800}
              className={styles.image}
            />
            <div className={styles.overlay}>
              <h3 className={styles.imageTitle}>{img.title}</h3>
              <p className={styles.imageCategory}>{img.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
