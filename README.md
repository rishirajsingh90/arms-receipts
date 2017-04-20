**ARMS RECEIPTS**

This product is designed to manage receipts for ARMS. It supports the following features:
* Create receipts
* Edit receipts
* Review receipts
* Export receipts in CSV/Excel (potentially PDFs in future)

**Getting started**

1. Clone the repo via git `git clone git@github.com:rishirajsingh90/arms-receipts.git`
2. Install and configure Postgres database, the SQL dump file containing all DB schema is checked in. An existing `arms` DB is assumed to exist under
3. Create a file under `./server/config/config.json` with the following format for local development
```
{
  "DATABASE_URL": "postgres://username:password@hostname:port/dbName"
}
```
4. Navigate to the project and run the following:
    * `npm install`
    * `npm start:dev` (to run it locally) and `npm start` on prem
