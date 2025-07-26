import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewProduct = () => {
  const { id } = useParams(); // Get item ID from the route
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`http://localhost:8080/item/${id}`);
        const data = await res.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h2>{item.title}</h2>
      <img src={item.image} alt={item.title} style={styles.image} />
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Fabric Type:</strong> {item.fabricType}</p>
      <p><strong>Size:</strong> {item.size}</p>
      <p><strong>Condition:</strong> {item.condition}</p>
      <p><strong>Tags:</strong> {item.tags?.join(", ")}</p>
      <p><strong>Available:</strong> {item.isAvailable ? "Yes" : "No"}</p>
      <p><strong>Options:</strong> {item.availabilityOptions?.join(", ")}</p>
      <p><strong>Uploaded By:</strong> {item.uploader?.name || "Unknown"}</p>
      <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    background: "#f0f0f0",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "15px",
  },
};

export default ViewProduct;
