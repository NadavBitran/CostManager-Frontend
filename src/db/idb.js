export var idb = { openCostsDB };

let db = {};

//window.indexedDB =
//  window.indexedDB ||
//  window.mozIndexedDB ||
//  window.webkitIndexedDB ||
//  window.msIndexedDB;

function openCostsDB(dbName, dbVersion) {
  return new Promise((resolve, reject) => {
    if(!window.indexedDB)
    {
       reject("Your browser doesn't support a stable version of IndexedDB.")
    }

    const request = window.indexedDB.open(dbName, dbVersion);

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve({ addCost, getCosts, getAllCosts });
    };

    request.onerror = function () {
      reject("There was an error opening the database");
    };

    request.onupgradeneeded = function (event) {
      db = event.target.result;
      let objectStore = db.createObjectStore("costItems", {
        keyPath: "id",
        autoIncrement: true,
      });

      for (let i in db.data) {
        objectStore.add(db.data[i]);
      }

      objectStore.createIndex("month_year", ["month", "year"], {
        unique: false,
      });
    };
  });
}

function getCosts(month, year) {
  return new Promise((resolve, reject) => {
    let request = db
      .transaction(["costItems"], "readonly")
      .objectStore("costItems")
      .index("month_year")
      .openCursor(IDBKeyRange.only([month, year]));

    let results = [];

    request.onsuccess = function (event) {
      let cursor = event.target.result;
      if (cursor) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        resolve(results);
      }
    };

    request.onerror = function () {
      reject("Error retrieving items");
    };
  });
}

function getAllCosts() {
  return new Promise((resolve, reject) => {
    let request = db
      .transaction(["costItems"], "readonly")
      .objectStore("costItems")
      .getAll();

    request.onsuccess = function (event) {
      const itemList  = event.target.result;
      resolve(itemList);
//      if (cursor) {
//        console.log(cursor);
//        results.push(cursor.value);
//        cursor.continue();
//      }
//      else {
//        resolve(results);
//    }
  };

  request.onerror = function () {
    reject("Error retrieving items");
  };
  
})}

function addCost(newCostItem) {
  return new Promise((resolve, reject) => {
    let request = db
      .transaction(["costItems"], "readwrite")
      .objectStore("costItems")
      .add({
        ...newCostItem,
        month: new Date().getUTCMonth() + 1, 
        year: new Date().getUTCFullYear(),
      });


    request.onsuccess = function () {
      resolve({
        ...newCostItem,
          month: new Date().getUTCMonth() + 1, 
          year: new Date().getUTCFullYear(),
      });
    };
    request.onerror = function () {
      reject("There was an error adding the item");
    };
  });
}
