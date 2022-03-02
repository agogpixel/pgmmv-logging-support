import type { LogLevel } from './log-level';

/**
 *
 */
export interface LoggerConfig {
  /**
   *
   */
  logLevel?: LogLevel;

  /**
   *
   */
  runtimeLog?: typeof Agtk.log;

  /**
   *
   */
  jsonIndentSize?: number;

  /**
   *
   */
  jsonStringifyFunctions?: boolean;

  /**
   *
   */
  logLevelMap?: Record<LogLevel, string>;
}
