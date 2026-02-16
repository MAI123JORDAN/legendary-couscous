import React, { useState } from 'react'
import './ShoppingList.css'

function ShoppingList() {
  const [items, setItems] = useState([]); // Array of items
  const [inputValue, setInputValue] = useState(''); // Text in the input

  const addItem = () => {
    if (inputValue.trim() !== '') {
      // adding new objects to the array
      const newItem = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setItems([...items, newItem]);  // Spread operator to keep old items + new one
      setInputValue('');  // Clear input
    }
  };

  // Toggle the 'completed' status
  const toggleItem = (id) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updatedItems);
  };

  // Remove an item by filtering the array
  const removeItem = (id) => {
    const filteredItems = items.filter(item => item.id !== id);
    setItems(filteredItems);
  };

  return (
    <div className="shop-wrapper">
      <div className="shop-card">
        <header>
          <h1>Market<span>List</span></h1>
          <p>Fresh items, organized simply.</p>
        </header>

        <div className="input-section">
          <input 
            type="text"
            placeholder="Add organic milk..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={addItem}>Add</button>
        </div>

        <ul className="item-list">
          {items.map(item =>(
            <li key={item.id} className={`shop-item ${item.completed ? 'completed' : ''}`}>
              <span onClick={() => toggleItem(item.id)}>{item.text}</span>
              <button className="delete-btn" onClick={() => removeItem(item.id)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ShoppingList
