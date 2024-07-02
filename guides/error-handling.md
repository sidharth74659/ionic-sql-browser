
**Error 1:**
```
[ng] ./node_modules/sql.js/dist/sql-wasm.js:548:15-28 - Error: Module not found: Error: Can't resolve 'fs' in '/Users/srikanthvudharapu/Desktop/work/poc/4.ionic-sql-browser/sql-playground/node_modules/sql.js/dist'
[ng] 
[ng] ./node_modules/sql.js/dist/sql-wasm.js:549:13-28 - Error: Module not found: Error: Can't resolve 'path' in '/Users/srikanthvudharapu/Desktop/work/poc/4.ionic-sql-browser/sql-playground/node_modules/sql.js/dist'
[ng] 
[ng] BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
[ng] This is no longer the case. Verify if you need this module and configure a polyfill for it.
[ng] 
[ng] If you want to include a polyfill, you need to:
[ng]    - add a fallback 'resolve.fallback: { "path": require.resolve("path-browserify") }'
[ng]    - install 'path-browserify'
[ng] If you don't want to include a polyfill, you can use an empty module like this:
[ng]    resolve.fallback: { "path": false }
```

**Solution:**
1. First, install the necessary polyfills:
`npm install path-browserify`

2. Create a file named `polyfills.ts` in the `src` folder if it doesn't exist already, and add the following content:
```ts
// src/polyfills.ts
(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};
```

3. Update the `angular.json` file to include the polyfills. Find the `"architect"` > `"build"` > `"options"` section and add the polyfills file to the `"polyfills"` array:
```ts
"architect": {
  "build": {
    "options": {
      "polyfills": [
        "zone.js",
        "src/polyfills.ts"
      ],
      // ... other options
    }
  }
}
```


4. Create a new file named `extra-webpack.config.js` in the root of your project with the following content:
```ts
module.exports = {
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
    },
  },
};
```

5. Update the `angular.json` file to use the custom webpack configuration. Find the `"architect"` > `"build"` > `"options"` section and add the following:
```ts
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
    "options": {
      // ... other options
      "customWebpackConfig": {
        "path": "./extra-webpack.config.js"
      }
    }
  }
}
```

6. Install `@angular-builders/custom-webpack`:
`npm install -D @angular-builders/custom-webpack`

7. Update the `angular.json` file to use the custom webpack builder. Change the `"builder"` under `"architect"` > `"build"` and `"serve"`:
```ts
"architect": {
  "build": {
    "builder": "@angular-builders/custom-webpack:browser",
    // ... other options
  },
  "serve": {
    "builder": "@angular-builders/custom-webpack:dev-server",
    // ... other options
  }
}
```

8. Modify the `SqlService` to use the WASM build of sql.js. Update `src/app/services/sql.service.ts`:
```ts
// before:
import initSqlJs from 'sql.js';

// after:
import initSqlJs from 'sql.js/dist/sql-wasm';
```

9. Download the `sql-wasm.wasm` file from the `sql.js` package and place it in the `src/assets` folder of your project. You can find it in `node_modules/sql.js/dist/sql-wasm.wasm`.

10. Update your `src/index.html` file to include a Content Security Policy that allows loading of WASM:

```html
<head>
    <!-- ... other meta tags -->
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval' 'wasm-eval'; object-src 'self'"> 
</head>
```

After making these changes, try running `ionic serve` again. The application should now work without the Node.js module errors.

*Note*: If you're still facing issues, try creating a new Ionic Angular project following [project-setup guide](./project-setup.md) and then integrate the SQL.js plugin as needed.