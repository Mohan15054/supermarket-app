import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";
import CardList from "@/components/Cards/CardList";

export default function Home() {
  const cards = [
    {
      title: "Sample Product",
      description: "This is a description of the sample product.",
      imageUrl: "https://picsum.photos/200/300?random=1", // set random url for things
    },
    {
      title: "Sample Product_new",
      description: "This is a description of the sample product.",
      imageUrl: "https://picsum.photos/200/300?random=2",
    },
    {
      title: "Orange",
      description: "Fresh oranges available.",
      imageUrl: "https://picsum.photos/200/300?random=3",
    },
    {
      title: "Milk",
      description: "Dairy milk, 1 litre.",
      imageUrl: "https://picsum.photos/200/300?random=4",
    },
    {
      title: "Bread",
      description: "Whole wheat bread loaf.",
      imageUrl: "https://picsum.photos/200/300?random=5",
    },
    {
      title: "Cheese",
      description: "Aged cheddar cheese.",
      imageUrl: "https://picsum.photos/200/300?random=6",
    },
    {
      title: "Chicken",
      description: "Free-range chicken, 1 kg.",
      imageUrl: "https://picsum.photos/200/300?random=7",
    },
    {
      title: "Fish",
      description: "Salmon fillet, 200g.",
      imageUrl: "https://picsum.photos/200/300?random=8",
    },
    {
      title: "Eggs",
      description: "Organic eggs, dozen.",
      imageUrl: "https://picsum.photos/200/300?random=9",
    },
    {
      title: "Butter",
      description: "Unsalted butter, 250g.",
      imageUrl: "https://picsum.photos/200/300?random=10",
    },
    {
      title: "Yogurt",
      description: "Greek yogurt, 500g.",
      imageUrl: "https://picsum.photos/200/300?random=11",
    },
    {
      title: "Pasta",
      description: "Whole grain pasta, 500g.",
      imageUrl: "https://picsum.photos/200/300?random=12",
    },
    {
      title: "Rice",
      description: "Basmati rice, 1kg.",
      imageUrl: "https://picsum.photos/200/300?random=13",
    },
    {
      title: "Tomatoes",
      description: "Fresh tomatoes, 1kg.",
      imageUrl: "https://picsum.photos/200/300?random=14",
    },
    {
      title: "Potatoes",
      description: "Organic potatoes, 1kg.",
      imageUrl: "https://picsum.photos/200/300?random=15",
    },
    
  ];
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <CardList cards={cards} />
      </main>
    </div>
  );
}