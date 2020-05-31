// create a new db request for a "budget" database

let db;

const request = indexedDB.open('offlineBudget', 1);

request.onupgradeneeded = function(event) {
   const db = event.target.result;
   db.createObjectStore("pending", { autoIncrement: true });
 };


  request.onsuccess = event => {
    db = event.target.request;

    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = function() {
    console.log("error"  + event.target.errorCode);
  };


saveRecord = record => {
    let transactionEntry = db.transaction(["pending"], "readwrite");
    let store = transactionEntry.objectStore("pending");
      store.add(record);
  }

checkDatabase = () => {
    let transactionEntry = db.transaction(["pending"], "readwrite");
    let store = transactionEntry.objectStore("pending");
    let getAll = store.getAll();

    getAll.onsuccess = function() {
        console.log("success!" + getAll.result);
    }
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);