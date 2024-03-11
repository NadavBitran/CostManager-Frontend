// Exporting the openCostsDB function
// (NOTE, IMPORTANT: we are using 'var' variable ONLY in order to match your HTML file with the test script.
// in EVERY OTHER CASE we would have use here 'const' instead...)
export var idb = { openCostsDB };

let db = {};

// Check if the browser supports IndexedDB and open the database
function openCostsDB(dbName, dbVersion) {
  return new Promise((resolve, reject) => {
    if(!window.indexedDB) {
      reject("Your browser doesn't support a stable version of IndexedDB.");
    }

    const request = window.indexedDB.open(dbName, dbVersion);

    // On successful database open, set the db variable and resolve with the necessary API we are providing
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve({ addCost, getCosts, getAllCosts });
    };

    // On error opening the database, reject with an error message
    request.onerror = function () {
      reject("There was an error opening the database");
    };

    // On database upgrade, create new object store and indexes
    request.onupgradeneeded = function (event) {
      db = event.target.result;
      const objectStore = db.createObjectStore("costItems", {
        keyPath: "id",
        autoIncrement: true,
      });

      // Add existing data to the new object store
      for (const i in db.data) {
        objectStore.add(db.data[i]);
      }

      // Create index for month and year pair values
      objectStore.createIndex("month_year", ["month", "year"], {
        unique: false,
      });
    };
  });
}

// Retrieve costs for a specific month and year
function getCosts(month, year) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction(["costItems"], "readonly")
      .objectStore("costItems")
      .index("month_year")
      .openCursor(IDBKeyRange.only([month, year]));

      const results = [];

    // Iterate through the cursor and add results to the array
    request.onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        resolve(results);
      }
    };

    // On error retrieving items, reject with an error message
    request.onerror = function () {
      reject("Error retrieving items");
    };
  });
}

// Retrieve all costs
function getAllCosts() {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction(["costItems"], "readonly")
      .objectStore("costItems")
      .getAll();

    // On successful retrieval, resolve with the item list
    request.onsuccess = function (event) {
      const itemList  = event.target.result;
      resolve(itemList);
    };

    // On error retrieving items, reject with an error message
    request.onerror = function () {
      reject("Error retrieving items");
    };
  });
}

// Add a new cost item
function addCost(newCostItem) {
  return new Promise((resolve, reject) => {
    
    const newCostItemWithDate = {
      ...newCostItem,
      month: new Date().getUTCMonth() + 1, 
      year: new Date().getUTCFullYear(),
    };

    const request = db
      .transaction(["costItems"], "readwrite")
      .objectStore("costItems")
      .add(newCostItemWithDate);

    // On successful addition, resolve with the updated cost item
    request.onsuccess = function () {
      resolve(newCostItemWithDate);
    };

    // On error adding the item, reject with an error message
    request.onerror = function () {
      reject("There was an error adding the item");
    };
  });
}
