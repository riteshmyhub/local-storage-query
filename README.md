# Local Storage Query

Local Storage Query is a utility class designed to simplify interactions with the browser's localStorage API. This package provides methods to easily manage data stored in the browser's localStorage in asynchronous way, allowing for seamless integration into web applications.

## Installation

You can install the package via npm or yarn:

```bash
npm install local-storage-query
```

```bash
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
/* 
  #then : response res?.response.data.data or message 
  #catch :  error?.message
*/
const res = await db.create(data);

const res = await db.deleteById(id);

const res = await db.updateById(id, item);

const res = await db.findById(id);

const res = await db.find(null);
const res = await db.find({ name: "user" });

const res = await db.search({ keyName: searchTerm });
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to contribute to this project.

## License

This package is open-source and available under the MIT License.


