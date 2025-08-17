import React from "react";
import "./card.css";

export default function Card({ title, description, imageUrl }) {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} loading="lazy" />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
