
### Project Setup with SQL.js
```shell
ionic start sql-playground blank --type=angular
cd sql-playground

# https://github.com/sql-js/sql.js
npm install sql.js
npm install @types/sql.js --save-dev

# optional:
ng add @angular/material

# check sql.service.ts for the implementation, home.page.ts for the usage/demo
```

### Project Setup with IndexedDB
```shell
# https://www.npmjs.com/package/idb
npm install idb

# check sql.service.ts for the implementation, or the second commit: 'version-two-indexeddb-stable' for changes
```

---

*Note*: 
- check [error-handling.md](./guides/error-handling.md) for error handling in the project.
