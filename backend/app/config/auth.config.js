module.exports = {
    secret: process.env.TOKEN_SECRET_NAME,
    jwtExpiration: 3600,           // 1 hour
    jwtRefreshExpiration: 86400,   // 24 hours

  /* for tests */
  //jwtExpiration: 60,          // 1 minute
  //jwtRefreshExpiration: 120,  // 2 minutes
  };