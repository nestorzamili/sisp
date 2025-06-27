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

interface RequestLike {
  method?: string;
  url?: string;
  headers?: Record<string, string | string[] | undefined>;
}

interface ResponseLike {
  statusCode?: number;
  headers?: Record<string, string | string[] | undefined>;
}

const serializers = {
  req: (req: RequestLike) => ({
    method: req.method,
    url: req.url,
    headers: {
      'user-agent': req.headers?.['user-agent'],
      'x-forwarded-for': req.headers?.['x-forwarded-for'],
    },
  }),
  res: (res: ResponseLike) => ({
    statusCode: res.statusCode,
    headers: {
      'content-type': res.headers?.['content-type'],
      'set-cookie': res.headers?.['set-cookie'],
    },
  }),
  err: pino.stdSerializers.err,
};

const pinoOptions: pino.LoggerOptions = {
  level: isProd ? process.env.LOG_LEVEL || 'info' : 'debug',
  formatters: isProd
    ? {
        level: (label) => ({ level: label }),
        log: (object: Record<string, unknown>) => {
          const { ...safe } = object;
          return safe;
        },
      }
    : undefined,
  timestamp: isProd ? () => `,"timestamp":"${getIDTimestamp()}"` : undefined,
  messageKey: 'message',
  base: {
    env: process.env.NODE_ENV,
    version: process.env.npm_package_version || 'unknown',
  },
  serializers,
  redact: isProd
    ? {
        paths: ['password', 'token', 'authorization', 'cookie'],
        censor: '[REDACTED]',
      }
    : undefined,
};

const logger = pino(pinoOptions);

export const loggerHelpers = {
  logRequest: (context: Record<string, unknown>, message?: string): void => {
    logger.info(context, message || 'Request received');
  },

  logError: (error: Error, context: Record<string, unknown> = {}): void => {
    logger.error({ err: error, ...context }, error.message);
  },

  logSecurity: (event: string, context: Record<string, unknown> = {}): void => {
    logger.warn(
      { securityEvent: event, ...context },
      `Security event: ${event}`,
    );
  },

  logPerformance: (
    operation: string,
    duration: number,
    context: Record<string, unknown> = {},
  ): void => {
    const level: 'warn' | 'info' | 'debug' =
      duration > 1000 ? 'warn' : duration > 500 ? 'info' : 'debug';
    logger[level](
      { operation, duration, ...context },
      `Operation ${operation} took ${duration}ms`,
    );
  },
};

export default logger;
