/**
 * Exports log level name type.
 *
 * @module log-level-name.type
 */
import type { LogLevel } from './log-level.enum';

/**
 * Log level name type.
 */
export type LogLevelName = keyof typeof LogLevel;
