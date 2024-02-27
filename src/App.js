import ItemList from './components/itemList/ItemList';
import FilterComponent from './components/filterItems/FilterItems';
import AddingProduct from './components/addingProduct/AddingProduct';
import {idb} from './db/idb';

import { useEffect, useState, useRef } from 'react';
import './App.css';


function App() {

  const [itemList, setItemList] = useState([]);
  const [databaseAPI, setDatabaseAPI] = useState({addCost: null, getAllCosts: null, getCosts: null});
  const isMounted = useRef(false);



  useEffect(() => {

    const fetchData = async () => {
      const db = await idb.openCostsDB('costsDB', 1);

      const items = await db.getAllCosts();
      
      setItemList(items);
      setDatabaseAPI(db);
    }
    if(!isMounted.current)
    {
      fetchData();
      isMounted.current = true;
    }
  }, [isMounted])

  


  return (
    <div className='App'>
      <AddingProduct addCost={databaseAPI.addCost} setItemList={setItemList}/>
      <FilterComponent getAllCost={databaseAPI.getAllCosts} getCosts={databaseAPI.getCosts} onFilter={setItemList}/>
      <ItemList itemList={itemList}/>
    </div>
  );
};

export default App;
