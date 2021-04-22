require('dotenv').config()
module.exports = 
{
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSW,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions : {
      ssl: {
        rejectUnauthorized: false
      }
    },
    define: {
      underscored: true,
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSW,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions : {
      ssl: {
        rejectUnauthorized: false
      }
    },
    define: {
      underscored: true,
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }    
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSW,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions : {
      ssl: {
        rejectUnauthorized: false
      }
    }    
  },
  define: {
    underscored: true,
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
}