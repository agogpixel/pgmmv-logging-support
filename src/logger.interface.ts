/**
 * Exports logger public API.
 *
 * @module logger.interface
 */
import type { JsonValue } from '@agogpixel/pgmmv-ts/api/types/json';

import type { LogLevelName } from './log-level-name.type';
import { LogLevel } from './log-level.enum';

/**
 * Logger public API.
 */
export interface Logger {
  /**
   * Log data using optional log level.
   *
   * @param data Data to log.
   * @param level Log level.
   */
  log(data: JsonValue, level?: LogLevel | LogLevelName): void;

  /**
   * Log data at level: Debug.
   *
   * @param data Data to log.
   */
  debug(data: JsonValue): void;

  /**
   * Log data at level: Info.
   *
   * @param data Data to log.
   */
  info(data: JsonValue): void;

  /**
   * Log data at level: Warn.
   *
   * @param data Data to log.
   */
  warn(data: JsonValue): void;

  /**
   * Log data at level: Error.
   *
   * @param data Data to log.
   */
  error(data: JsonValue): void;

  /**
   * Log data at level: Fatal.
   *
   * @param data Data to log.
   */
  fatal(data: JsonValue): void;

  /**
   * Get current log level.
   *
   * @returns Current log level
   */
  getLogLevel(): LogLevel;

  /**
   * Set current log level.
   *
   * @param level Log level.
   * @returns Reference to logger object instance.
   */
  setLogLevel(level: LogLevel | LogLevelName): this;

  /**
   * Get current runtime log reference.
   */
  getRuntimeLog(): typeof Agtk.log;

  /**
   * Set runtime log method.
   *
   * @param log Log method.
   */
  setRuntimeLog(log: typeof Agtk.log): this;

  /**
   * Get current JSON indent size.
   *
   * @returns JSON indent size.
   */
  getJsonIndentSize(): number;

  /**
   * Set JSON indent size.
   *
   * @param size Desired size.
   * @returns Reference to logger object instance.
   */
  setJsonIndentSize(size: number): this;

  /**
   * Get current JSON stringify functions flag.
   */
  getJsonStringifyFunctions(): boolean;

  /**
   * Set JSON stringify functions flag.
   *
   * @param stringify True to stringify functions.
   * @returns Reference to logger object instance.
   */
  setJsonStringifyFunctions(stringify: boolean): this;

  /**
   * Get current log level mappings reference.
   *
   * @returns Log level to log level display name mappings.
   */
  getLogLevelMap(): Record<LogLevel, string>;

  /**
   * Set custom log level mappings.
   *
   * @param map Log level to log level display name mappings.
   * @returns Reference to logger object instance.
   */
  setLogLevelMap(map: Record<LogLevel, string>): this;
}
