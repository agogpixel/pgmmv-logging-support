/**
 * Exports logger configuration API.
 *
 * @module logger-config.interface
 */
import type { LogLevel } from './log-level.enum';

/**
 * Logger configuration API.
 */
export interface LoggerConfig {
  /**
   * Instantiate logger with specified log level.
   */
  logLevel?: LogLevel;

  /**
   * Instantiate logger with specified runtime log method.
   */
  runtimeLog?: typeof Agtk.log;

  /**
   * Instantiate logger with specified JSON indent size.
   */
  jsonIndentSize?: number;

  /**
   * Instantiate logger with function stringification.
   */
  jsonStringifyFunctions?: boolean;

  /**
   * Instantiate logger with custom log level to display name mappings.
   */
  logLevelMap?: Record<LogLevel, string>;
}
