import type { JsonValue } from '@agogpixel/pgmmv-ts/api/types';

import type { LogLevelName } from './log-level-name';
import { LogLevel } from './log-level';

/**
 *
 */
export interface Logger {
  /**
   *
   * @param data
   * @param level
   */
  log(data: JsonValue, level?: LogLevel | LogLevelName): void;

  /**
   *
   * @param data
   */
  debug(data: JsonValue): void;

  /**
   *
   * @param data
   */
  info(data: JsonValue): void;

  /**
   *
   * @param data
   */
  warn(data: JsonValue): void;

  /**
   *
   * @param data
   */
  error(data: JsonValue): void;

  /**
   *
   * @param data
   */
  fatal(data: JsonValue): void;

  /**
   *
   */
  getLogLevel(): LogLevel;

  /**
   *
   * @param level
   */
  setLogLevel(level: LogLevel | LogLevelName): this;

  /**
   *
   */
  getRuntimeLog(): typeof Agtk.log;

  /**
   *
   * @param log
   */
  setRuntimeLog(log: typeof Agtk.log): this;

  /**
   *
   */
  getJsonIndentSize(): number;

  /**
   *
   * @param size
   */
  setJsonIndentSize(size: number): this;

  /**
   *
   */
  getJsonStringifyFunctions(): boolean;

  /**
   *
   * @param stringify
   */
  setJsonStringifyFunctions(stringify: boolean): this;

  /**
   *
   */
  getLogLevelMap(): Record<LogLevel, string>;

  /**
   *
   * @param map
   */
  setLogLevelMap(map: Record<LogLevel, string>): this;
}
