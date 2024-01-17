import React, { useState } from 'react';
import Modal from 'react-modal';
import './age.css';

const AgePage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
  });

  // State for each age group
  const [age1_18, setAge1_18] = useState([]);
  const [age18_25, setAge18_25] = useState([]);
  const [age25_45, setAge25_45] = useState([]);
  const [age45Plus, setAge45Plus] = useState([]);

  const [draggedItem, setDraggedItem] = useState(null);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent({
      name: '',
      email: '',
      phone: '',
      age: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalContent((prevContent) => ({ ...prevContent, [name]: value }));
  };

  const handleAddEntry = () => {
    const newEntry = { ...modalContent };

    const ageValue = parseInt(modalContent.age, 10);

    if (ageValue >= 1 && ageValue <= 18) {
      setAge1_18((prevEntries) => [...prevEntries, newEntry]);
    } else if (ageValue >= 18 && ageValue <= 25) {
      setAge18_25((prevEntries) => [...prevEntries, newEntry]);
    } else if (ageValue >= 25 && ageValue <= 45) {
      setAge25_45((prevEntries) => [...prevEntries, newEntry]);
    } else if (ageValue > 45) {
      setAge45Plus((prevEntries) => [...prevEntries, newEntry]);
    }

    console.log('Added Entry:', newEntry);
    console.log('Age 1-18 Entries:', age1_18);
    console.log('Age 18-25 Entries:', age18_25);
    console.log('Age 25-45 Entries:', age25_45);
    console.log('Age 45+ Entries:', age45Plus);

    closeModal();
  };

  const handleDragStart = (entry) => {
    setDraggedItem(entry);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeFromColumn = (column, entry) => {
    switch (column) {
      case '1-18':
        setAge1_18((prevEntries) => prevEntries.filter((e) => e.name !== entry.name));
        break;
      case '18-25':
        setAge18_25((prevEntries) => prevEntries.filter((e) => e.name !== entry.name));
        break;
      case '25-45':
        setAge25_45((prevEntries) => prevEntries.filter((e) => e.name !== entry.name));
        break;
      case '45+':
        setAge45Plus((prevEntries) => prevEntries.filter((e) => e.name !== entry.name));
        break;
      default:
        break;
    }
  };

  const addToColumn = (column, entry) => {
    switch (column) {
      case '1-18':
        setAge1_18((prevEntries) => [...prevEntries, entry]);
        break;
      case '18-25':
        setAge18_25((prevEntries) => [...prevEntries, entry]);
        break;
      case '25-45':
        setAge25_45((prevEntries) => [...prevEntries, entry]);
        break;
      case '45+':
        setAge45Plus((prevEntries) => [...prevEntries, entry]);
        break;
      default:
        break;
    }
  };

  const handleDrop = (targetAge) => {
    if (draggedItem) {
      const updatedEntry = { ...draggedItem, age: targetAge };
  
      removeFromColumn(draggedItem.age, draggedItem); // Remove from the previous column
      addToColumn(targetAge, updatedEntry); // Add to the new column
  
      console.log('Updated Entry:', updatedEntry);
      setDraggedItem(null);
    }
  };
  return (
    <div className='container'>
      <h2>Age Groups</h2>
      <button className="add-button" onClick={openModal}>Add</button>

      {/* Modal for adding new entry */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Entry Modal"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <h2>Add New Entry</h2>
        <label>Name:</label>
        <input type="text" name="name" placeholder="Enter Name" onChange={handleInputChange} />
        <label>Email ID:</label>
        <input type="text" name="email" placeholder="Enter Email ID" onChange={handleInputChange} />
        <label>Phone Number:</label>
        <input type="text" name="phone" placeholder="Enter Phone Number" onChange={handleInputChange} />
        <label>Age:</label>
        <input type="text" name="age" placeholder="Enter Age" onChange={handleInputChange} />

        <button onClick={handleAddEntry}>Add</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>

      <div className="container col-cont">
        <div
          className="column column1"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={() => handleDrop('1-18')}
        >
          <h3>1-18</h3>
          <div className="card">
            {/* Display content for age group 1-18 */}
            {age1_18.map((entry, index) => (
              <div
                key={index}
                className='card-head'
                draggable
                onDragStart={() => handleDragStart(entry)}
              >
                <p>Name: {entry.name}</p>
                <p>Email: {entry.email}</p>
                <p>Phone: {entry.phone}</p>
                <p>Age: {entry.age}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          className="column column2"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={() => handleDrop('18-25')}
        >
          <h3>18-25</h3>
          <div className="card">
            {/* Display content for age group 18-25 */}
            {age18_25.map((entry, index) => (
              <div
                key={index}
                className='card-head'
                draggable
                onDragStart={() => handleDragStart(entry)}
              >
                <p>Name: {entry.name}</p>
                <p>Email: {entry.email}</p>
                <p>Phone: {entry.phone}</p>
                <p>Age: {entry.age}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          className="column column3"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={() => handleDrop('25-45')}
        >
          <h3>25-45</h3>
          <div className="card">
            {/* Display content for age group 25-45 */}
            {age25_45.map((entry, index) => (
              <div
                key={index}
                className='card-head'
                draggable
                onDragStart={() => handleDragStart(entry)}
              >
                <p>Name: {entry.name}</p>
                <p>Email: {entry.email}</p>
                <p>Phone: {entry.phone}</p>
                <p>Age: {entry.age}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          className="column column4"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={() => handleDrop('45+')}
        >
          <h3>45+</h3>
          <div className="card">
            {/* Display content for age group 45+ */}
            {age45Plus.map((entry, index) => (
              <div
                key={index}
                className='card-head'
                draggable
                onDragStart={() => handleDragStart(entry)}
              >
                <p>Name: {entry.name}</p>
                <p>Email: {entry.email}</p>
                <p>Phone: {entry.phone}</p>
                <p>Age: {entry.age}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgePage;
