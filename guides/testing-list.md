
- Size and Performance Limitations: 
	a) Large datasets:
    - Create a function to generate a large number of records (e.g., 100,000)
    - Measure the time taken to insert these records
    - Test query performance on this large dataset
    b) Complex queries:
    - Write a query with multiple joins and subqueries
    - Measure execution time as the dataset grows
- Persistence:
    - Perform some database operations
    - Reload the page and check if the data persists (it shouldn't)
    - Implement a way to export the database to a file and reimport it
- File Size Limit:
    - Gradually increase the amount of data in the database
    - Monitor memory usage in the browser's developer tools
    - Note when performance starts to degrade or if any errors occur
- Security Implications: 
	a) SQL Injection:
    - Test with user inputs containing SQL injection attempts
    - Ensure proper input sanitization is in place
    b) Data Privacy:
    - Check if sensitive data can be accessed through browser developer tools
- Additional Tests:
	a) Concurrent operations:
    - Simulate multiple rapid queries and check for race conditions
    b) Error handling:
    - Intentionally run malformed queries and check how the application handles errors
    c) IndexedDB Integration:
    - Implement a solution to periodically save the database to IndexedDB
    - Test data persistence across page reloads with this implementation
- Performance Benchmarking:
    - Compare the performance of complex queries between SQL.js and a server-side SQL database

- Test persistence:
    - Insert some data, refresh the page, and verify the data is still there.
    - Close the browser completely, reopen it, and check if the data persists.
- Test concurrent tabs:
    - Open the application in two different tabs.
    - Make changes in one tab and see if they reflect in the other tab after refresh.
- Test storage limits:
    - IndexedDB has higher storage limits than localStorage, but it's still limited. Test with large amounts of data to find the practical limits for your use case.
- Error handling:
    - Test what happens when IndexedDB is not available (e.g., in private browsing mode in some browsers).
    - Implement and test error handling for cases where saving to IndexedDB fails.
- Performance:
    - Measure the time it takes to load a large database from IndexedDB.
    - Consider implementing a worker to handle database operations off the main thread for better performance.
- Data integrity:
    - Test the export/import functionality thoroughly to ensure no data is lost in the process.
- Browser compatibility:
    - Test the persistence feature across different browsers to ensure consistent behavior.

---


Suggestions for further investigation:

1. Implement data compression techniques to increase the amount of data that can be stored.
2. Explore ways to partition the database to handle larger datasets.
3. Implement a worker to handle database operations off the main thread for better performance.
4. Investigate using WebAssembly for better performance of SQL operations.
5. Compare SQL.js with other client-side storage solutions like IndexedDB or LocalForage for your specific use case.