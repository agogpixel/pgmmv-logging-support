/**
 * Exports logger protected API.
 *
 * @module logger-protected-api.interface
 */
import type { LoggerConfig } from './logger-config.interface';

/**
 * Logger protected API. Facilitates object inheritence.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LoggerProtectedApi extends Required<LoggerConfig> {}
