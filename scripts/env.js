// tiny wrapper with default env vars

// TODO Consider to remove it and use regular .env
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
};
