'use strict';

module.exports = {
	env: process.env.NODE_ENV || 'development',
	server: {
		port: process.env.PORT || 7010,
	},
	logging: {
		level: process.env.LOG_LEVEL || 'debug',
	},
	mongoURL : 'mongodb://localhost:27017', // Replace with your MongoDB connection string
	mongoOPTIONs : {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	secretKey: '100ds0skdkzlweka'
};
