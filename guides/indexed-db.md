### Storage limits for IndexedDB

- References: 
- https://stackoverflow.com/questions/5692820/maximum-item-size-in-indexeddb
- https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
- https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
- https://web.dev/articles/storage-for-the-web 

Storage limits for IndexedDB are primarily determined by the available disk space on the user’s device. Different browsers have different storage limits, such as Google Chrome allowing up to 60% of available disk space and Firefox allowing up to 50%. These limits are shared among all websites, so the actual storage space available to a single website may be less.

IndexedDB does not have a specific maximum size for data storage, but it does have a global limit. For example, in Chrome, the global limit is 50 MB, and Firefox allows storage up to 250 MB per domain. If the user grants permission for a site to exceed the 50 MB IndexedDB quota, then Firefox does not impose any more limits.

Here is a code snippet that initializes an IndexedDB connection:

```
const dbOpen = indexedDB.open('notebook', 1);
```

This code can run in any initialization block or function, typically after you’ve checked for IndexedDB support.

When creating an object store, you can specify the size of the storage as follows:

```
dbOpen.result.createObjectStore('note', { keyPath: 'id', autoIncrement: true });
```

This code creates a new object store named ‘note’ with an auto-incrementing primary key.

It’s important to note that IndexedDB is designed to handle large amounts of structured data, and it uses indexes to enable high-performance searches of this data.