import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("")
  const [allItems, setAllItems] = useState(items)

  function handleSearchChange(text) {
    setSearchText(text)
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function addItem(newItem) {
    setAllItems([...allItems, newItem])
  }

  const itemsToDisplay = allItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch = searchText === "" || item.name.toLowerCase().includes(searchText.toLowerCase())
    return matchesCategory && matchesSearch
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={addItem}/>
      <Filter 
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        search={searchText}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;