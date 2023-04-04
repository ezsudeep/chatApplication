const pino = require('pino');

// Create a logging instance
const logger = pino({
    level: process.env.NODE_ENV === 'development' ? 'info' : 'debug',
});


logger.info('Application started!');