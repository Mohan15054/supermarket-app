import React from "react";
import Card from "./card";
import { FixedSizeGrid } from "react-window";

export default function CardListGrid({ cards }) {
  const columnCount = 3;
  const rowCount = Math.ceil(cards.length / columnCount);
  const cardWidth = 340;
  const cardHeight = 420;

  return (
    <FixedSizeGrid
      columnCount={columnCount}
      rowCount={rowCount}
      columnWidth={cardWidth}
      rowHeight={cardHeight}
      width={cardWidth * columnCount}
      height={cardHeight * 3}
    >
      {({ columnIndex, rowIndex, style }) => {
        const cardIndex = rowIndex * columnCount + columnIndex;
        if (cardIndex >= cards.length) return null;
        const card = cards[cardIndex];
        return (
          <div style={style}>
            <Card
              key={cardIndex}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
            />
          </div>
        );
      }}
    </FixedSizeGrid>
  );
}
