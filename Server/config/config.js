var config = {
  mongoDbUrl : 'mongodb://localhost:27017/selfservicedb',
  // defaultPageLimit : 100,
  // pageLimit : 10,
  secret : '506f747465726d616e69616373202d204120626c6f6720666f7220616c6c20686172727920706f747465722066616e73',
  mysql_host : 'localhost',
  mysql_port : 3306,
  mysql_user : 'root',
  mysql_password : 'root',
  mysql_database : 'selfservicedb',
  WRAPPER_STATUS_DRAFT : 'DRAFT',
  WRAPPER_STATUS_SUBMITTED : 'SUBMITTED',
  WRAPPER_STATUS_APPROVED : 'APPROVED',
  WRAPPER_STATUS_PDF_UPLOADED : 'PDF_UPLOADED',
  WRAPPER_STATUS_URL_CREATED : 'URL_CREATED'
};

module.exports = config;
