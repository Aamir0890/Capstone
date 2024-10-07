### Secure Cloud Storage (SCS) System

## 1. System Architecture

The SCS system is designed to provide secure file storage and management with the following technologies:

- **Backend**: Node.js with Express.js framework
- **Database**: MySQL
- **ORM**: Sequelize
- **File Upload**: Multer for handling file uploads

The system will follow a typical three-tier architecture:

1. **Presentation Layer**: RESTful API endpoints for interaction
2. **Application Layer**: Express.js controllers and services to manage business logic
3. **Data Layer**: MySQL database for metadata storage and AWS S3 for file storage

---

## 2. Prerequisites

To run this application, you will need:

- Node.js (v14.x or higher)
- MySQL database instance

---
### Step 3: Configure Environment Variables

Create a `.env` file in the root directory with the following keys:

```
DB_NAME
DB_USER
DB_PASSWORD
DB_HOST
DB_DIALECT
STORAGE_PATH

```
make sure the storage path is example STORAGE_PATH=C:/Users/airtribe/Capstone/backend/

### Step 1: Clone the Repository

```bash
git clone https://github.com/Aamir0890/Capstone/tree/master
```

```bash
npm i 
```
```bash
nodemon index.js
```


