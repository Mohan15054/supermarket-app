import React from "react";
import Card from "./card";
import "./cardlist.css";

export default function CardList({ cards }) {
  return (
    <div className="card-list">
      {cards.map((card, idx) => (
        <Card
          key={idx}
          title={card.title}
          description={card.description}
          imageUrl={card.imageUrl}
        />
      ))}
    </div>
  );
}
