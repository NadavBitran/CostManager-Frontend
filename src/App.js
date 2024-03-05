// Importing the necessary dependencies
import ItemList from './components/itemList/ItemList';
import FilterComponent from './components/filterItems/FilterItems';
import AddingItem from './components/addingItem/AddingItem';
import Header from './components/header/header';
import {idb} from './db/idb';

// Imoporting the necessary hooks
import { useEffect, useState, useRef } from 'react';

// Importing the CSS file for styling
import './App.css';

// Defining the App component
function App() {
  // State for the list of costs
  const [itemList, setItemList] = useState([]);

  // State for the database API we are providing aftre opening the database
  const [databaseAPI, setDatabaseAPI] = useState({addCost: null, getAllCosts: null, getCosts: null});

  // State for checking if the component is mounted
  const isMounted = useRef(false);

  useEffect(() => {
    // Fetch data from the database
    const fetchData = async () => {
      // Open the costsDB database
      const db = await idb.openCostsDB('costsDB', 1);

      // Retrieve all costs from the database
      const items = await db.getAllCosts();
      
      // Update the itemList state with the retrieved costs
      setItemList(items);

      // Set the databaseAPI state with the database's API
      setDatabaseAPI(db);
    }

    // Fetch data only once when the component is mounted
    if(!isMounted.current)
    {
      fetchData();
      isMounted.current = true;
    }
  }, [isMounted])

  return (
    <div className='App'>

      {/* Component for the header */}
      <Header title={'Cost Manager'}></Header>

      {/* Component for adding a new cost */}
      <AddingItem addCost={databaseAPI.addCost} setItemList={setItemList}/>
      
      {/* Component for filtering costs */}
      <FilterComponent getAllCost={databaseAPI.getAllCosts} getCosts={databaseAPI.getCosts} onFilter={setItemList}/>
      
      {/* Component for displaying the list of costs */}
      <ItemList itemList={itemList}/>
    </div>
  );
};

// Exporting the App component as the default export
export default App;
