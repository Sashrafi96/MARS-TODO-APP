const sqlConfig = {
  user: "SamTest",
  password: "1234",
  database: "TodosDB",
  server: "localhost",
  port: 1434,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

module.exports = sqlConfig;
