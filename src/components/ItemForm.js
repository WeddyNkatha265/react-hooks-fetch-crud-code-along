import React, { useState } from "react";

function ItemForm({ onAddItem }) {  // Accept onAddItem as a prop
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      name: name,
      category: category,
      isInCart: false,
    };

    // POST request to add the new item to the server
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((r) => r.json())
      .then((addedItem) => {
        onAddItem(addedItem);  // Notify parent component
        setName('');  // Clear the form
        setCategory('Produce');
      });
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>  {/* Handle form submission */}
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
