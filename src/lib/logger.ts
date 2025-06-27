import pino from 'pino';

const isProd = process.env.NODE_ENV === 'production';
const logFile = './app.log';

const pinoOptions: pino.LoggerOptions = isProd
  ? {
      level: 'info',
      formatters: {
        level: (label) => ({ level: label }),
      },
      timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
      messageKey: 'message',
      base: undefined,
    }
  : {
      level: 'debug',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    };

const logger = isProd
  ? pino(pinoOptions, pino.destination(logFile))
  : pino(pinoOptions);

export default logger;
