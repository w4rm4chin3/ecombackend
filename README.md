# Express eCom Backend

express-nodejs-api

## Installation

```bash
npm Install
```

### **Dependencies**
```json
"@prisma/client": "^3.7.0",
"bcrypt": "^5.0.1",
"body-parser": "^1.19.1",
"compression": "^1.7.4",
"cors": "^2.8.5",
"csurf": "^1.11.0",
"dotenv": "^10.0.0",
"express": "^4.17.2",
"express-joi-validation": "^5.0.1",
"helmet": "^5.0.1",
"i": "^0.3.7",
"joi": "^17.5.0",
"jsonwebtoken": "^8.5.1",
"lodash": "^4.17.21",
"multer": "^1.4.4",
"nodemon": "^2.0.15",
"npm": "^8.3.0",
"passport": "^0.5.2",
"passport-jwt": "^4.0.0",
"path": "^0.12.7",
"prisma": "^3.7.0",
"winston": "^3.3.3"
```

## .env Configuration
configure the database url here
```env
DATABASE_URL="mysql://root@localhost:3306/example_db"
```
## Prisma Configuration
prisma/prisma.schema
```javascript
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

```
## After Prisma configuration
To pull the DB from MySQL DB we provided above
```
npx prisma db pull
```
To generate the Prisma client
```
npx prisma generate 
```

## Run the application

```bash
npm start
```
## Run the application in development server
```bash
npm start-dev
```
## Testing
```bash
npm test
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
