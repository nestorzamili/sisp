import pino from 'pino';

const pinoOptions: pino.LoggerOptions =
  process.env.NODE_ENV === 'production'
    ? {
        level: 'info',
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

const logger = pino(pinoOptions);

export default logger;
