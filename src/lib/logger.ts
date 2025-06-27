import pino from 'pino';

const isProd = process.env.NODE_ENV === 'production';

function getIDTimestamp() {
  return new Date().toLocaleString('id-ID', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  });
}

const pinoOptions: pino.LoggerOptions = {
  level: isProd ? 'info' : 'debug',
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: () => `,"timestamp":"${getIDTimestamp()}"`,
  messageKey: 'message',
  base: undefined,
};

const logger = isProd
  ? pino(pinoOptions)
  : pino({
      ...pinoOptions,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    });

export default logger;
