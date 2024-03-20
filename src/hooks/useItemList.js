/* Authors:
* Eyal Chachmishvily 209786094
* Idan Eliyahu 204174155
* Nadav Bitran Numa 325122075
*/

import { useState, useEffect, useRef } from 'react';
import useIndexedDB from './useIndexedDB';

const useItemList = () => {
// State for the list of costs
const idb = useIndexedDB();

const [itemList, setItemList] = useState([]);

/* State for the database API we are providing after 
   opening the database */
const [databaseAPI, setDatabaseAPI] = useState({addCost:     null, 
                                                getAllCosts: null, 
                                                getCosts:    null});

// State for checking if the component is mounted
const isMounted = useRef(false);

useEffect(() => {
  // Fetch data from the database
  const fetchData = async () => {
    try
    {
      // Open the costsDB database
      const db = await idb.openCostsDB('costsDB', 1);

      // Retrieve all costs from the database
      const items = await db.getAllCosts();
    
      // Update the itemList state with the retrieved costs
      setItemList(items);

      // Set the databaseAPI state with the database's API
      setDatabaseAPI(db);
    }
    catch (error)
    {
      // Log the data fetch initialization error to the console
      console.error(error);
    }

  }

  // Fetch data only once when the component is mounted
  if(!isMounted.current)
  {
    fetchData();
    isMounted.current = true;
  }
}, [isMounted, idb]);


    return {itemList, databaseAPI, setItemList};
};

export default useItemList;