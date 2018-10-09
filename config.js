var config = {
  couchDbServer: process.env.COUCHDB_SERVER || 'couchdb',
  couchDbPort: process.env.COUCHDB_PORT || '5984',
  couchDbUseSsl: process.env.COUCHDB_USESSL || false,
  couchDbChangesSince: process.env.COUCHDB_CHANGES_SINCE || 'now',
  couchAdminUser: process.env.COUCHDB_ADMIN_USER || 'couchadmin',
  couchAdminPassword: process.env.COUCHDB_ADMIN_PASSWORD || 'test',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  serverPort: process.env.PORT || '3000',
  server: process.env.SERVER_NAME || 'localhost',
  sslCert: process.env.SSL_CERT_PATH || '',
  sslKey: process.env.SSL_KEY_PATH || '',
  sslCA: [], // Array of file locations of trusted certificates in PEM format if needed
  useSSL: process.env.USE_SSL || false,
  imagesdir: process.env.IMAGESDIR || (__dirname + '/patientimages'),
  attachmentsDir: process.env.ATTACHMENTSDIR || (__dirname + '/attachments'),
  logRequests: process.env.LOG_REQUESTS || false,
  logFormat: process.env.LOG_FORMAT || 'default', // See http://www.senchalabs.org/connect/logger.html for log formats
  useGoogleAuth: process.env.USE_GOOGLE_AUTH || false,
  useCertBot: process.env.USE_CERT_BOT || false,
  isMultitenancy: process.env.IS_MULTITENANCY || false
};

config.couchCredentials = function () {
  if (config.couchAdminUser && config.couchAdminPassword) {
    return config.couchAdminUser + ':' + config.couchAdminPassword + '@';
  } else {
    return '';
  }
};

config.getProtocol = function (isSSL) {
  return 'http' + (isSSL ? 's' : '') + '://';
};

if (process.env.SERVER_URL) {
  config.serverURL = process.env.SERVER_URL;
} else {
  config.serverURL = config.getProtocol(config.useSSL) + config.server;
  if (config.serverPort) {
    config.serverURL += ':' + config.serverPort;
  }
}

config.couchDbURL = config.getProtocol(config.couchDbUseSsl) + config.couchDbServer + ':' + config.couchDbPort;
config.couchAuthDbURL = config.getProtocol(config.couchDbUseSsl) + config.couchCredentials() + config.couchDbServer + ':' + config.couchDbPort;
config.searchURL = 'http://elastic:changeme@elasticsearch:9200'; // ELASTIC SEARCH URL
config.webDir = __dirname + '/public';
config.serverInfo = process.env.SERVER_INFO || 'Server Information to display to users when viewing about HospitalRun';
module.exports = config;
