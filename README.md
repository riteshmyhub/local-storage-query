# Local Storage Query

Local Storage Query is a utility class designed to simplify interactions with the browser's localStorage API. This package provides methods to easily manage data stored in the browser's localStorage in asynchronous way, allowing for seamless integration into web applications.

## Installation

You can install the package via npm or yarn:

```bash
npm install local-storage-query
   #or
yarn add local-storage-query
```

## Usage

```javascript
import DB from "local-storage-query";

/*-------------------------Create an instance of DB-------------------*/
const db = new DB({
   collectionName: "yourCollectionName",
   latency: 1000,
});

/*-------------------------Methods-------------------*/
await db.create(data);

await db.deleteById(id);

await db.updateById(id,item);

await db.findById(id);

await db.find(null);
await db.find({name:"user"});
 
await db.search({keyName:searchTerm})
```
