module.exports = {
  getDbConfig: function () {
    if (process.env.GITHUB_ACTIONS) {
      return {
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      };
    } else {
      return {
        HOST: "localhost",
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PWD,
        DB: process.env.DB_NAME,
        dialect: "mysql",
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      };
    }
  },
};