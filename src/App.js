/* Authors:
* Eyal Chachmishvily 209786094
* Idan Eliyahu 204174155
* Nadav Bitran Numa 325122075
*/

// Importing the necessary dependencies
import ItemList from './components/itemList/ItemList';
import FilterItems from './components/filterItems/FilterItems';
import AddingItem from './components/addingItem/AddingItem';
import Header from './components/header/Header';

// Imoporting the necessary hooks
import useItemList from './hooks/useItemList';

// Importing the CSS file for styling
import './App.css';

// Defining the App component
function App() {
  
  const {itemList, databaseAPI, setItemList} = useItemList();

  return (
    <div className='App'>

      {/* Component for the header */}
      <Header title={'Cost Manager'}></Header>

      {/* Component for adding a new cost */}
      <AddingItem addCost={databaseAPI.addCost} setItemList={setItemList}/>
      
      {/* Component for filtering costs */}
      <FilterItems getAllCost={databaseAPI.getAllCosts} getCosts={databaseAPI.getCosts} onFilter={setItemList}/>
      
      {/* Component for displaying the list of costs */}
      <ItemList itemList={itemList}/>
    </div>
  );
};

// Exporting the App component as the default export
export default App;
