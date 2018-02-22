import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, printf } = format;

const loggerFormat = printf(
  (info) => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`,
);

export const initLogger = createLogger({
  format: combine(label({ label: 'init' }), timestamp(), loggerFormat),
  transports: [new transports.Console()],
});

export const authLogger = createLogger({
  format: combine(label({ label: 'auth' }), timestamp(), loggerFormat),
  transports: [new transports.Console()],
});

export const configLogger = createLogger({
  format: combine(label({ label: 'config' }), timestamp(), loggerFormat),
  transports: [new transports.Console()],
});

export const viewsLogger = createLogger({
  format: combine(label({ label: 'views' }), timestamp(), loggerFormat),
  transports: [new transports.Console()],
});
