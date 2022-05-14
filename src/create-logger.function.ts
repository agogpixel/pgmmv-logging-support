/**
 * Exports create logger function & various defaults.
 *
 * @module create-logger.function
 */
import { getUnixTimestamp } from '@agogpixel/pgmmv-resource-support/src/time/get-unix-timestamp.function';
import { toJson } from '@agogpixel/pgmmv-resource-support/src/json/to-json.function';

import { LogLevel } from './log-level.enum';
import type { Logger } from './logger.interface';
import type { LoggerConfig } from './logger-config.interface';
import type { LoggerProtectedApi } from './logger-protected-api.interface';

////////////////////////////////////////////////////////////////////////////////
// Public Static Properties
////////////////////////////////////////////////////////////////////////////////

/**
 * Default JSON indent size.
 */
export const defaultJsonIndentSize = 2;

/**
 * Default JSON stringify functions flag state.
 */
export const defaultJsonStringifyFunctions = false;

/**
 * Minimum allowed JSON indent size value.
 */
export const jsonIndentSizeMin = 0;

/**
 * Maximum allowed JSON indent size value.
 */
export const jsonIndentSizeMax = 8;

////////////////////////////////////////////////////////////////////////////////
// Private Static Properties
////////////////////////////////////////////////////////////////////////////////

// None.

////////////////////////////////////////////////////////////////////////////////
// Public Static Methods
////////////////////////////////////////////////////////////////////////////////

/**
 * Create object instance that conforms to {@link Logger} API.
 *
 * @param config Logger configuration.
 * @param internal Provide an object to 'inherit' a reference to the logger's
 * internal {@link LoggerProtectedApi} implementation.
 * @returns An object instance that provides a base implementation for a
 * {@link Logger} API.
 */
export function createLogger(config: LoggerConfig, internal?: LoggerProtectedApi) {
  // Public API container.
  const self = {} as Logger;

  // Protected API container.
  const internalApi = internal || ({} as LoggerProtectedApi);

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  // None.

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////

  // None.

  //////////////////////////////////////////////////////////////////////////////
  // Protected Properties
  //////////////////////////////////////////////////////////////////////////////

  internalApi.logLevel = config.logLevel || LogLevel.Info;

  internalApi.jsonIndentSize =
    typeof config.jsonIndentSize !== 'number'
      ? defaultJsonIndentSize
      : cc.clampf(config.jsonIndentSize, jsonIndentSizeMin, jsonIndentSizeMax);

  internalApi.jsonStringifyFunctions = !!config.jsonStringifyFunctions || defaultJsonStringifyFunctions;

  internalApi.logLevelMap = config.logLevelMap || {
    [LogLevel.Debug]: LogLevel[LogLevel.Debug],
    [LogLevel.Info]: LogLevel[LogLevel.Info],
    [LogLevel.Warn]: LogLevel[LogLevel.Warn],
    [LogLevel.Error]: LogLevel[LogLevel.Error],
    [LogLevel.Fatal]: LogLevel[LogLevel.Fatal]
  };

  //////////////////////////////////////////////////////////////////////////////
  // Protected Methods
  //////////////////////////////////////////////////////////////////////////////

  internalApi.runtimeLog = config.runtimeLog || Agtk.log;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  // None.

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////

  self.log = function (data, level?) {
    if (typeof level !== 'string' && typeof level !== 'number') {
      internalApi.runtimeLog(
        typeof data === 'string'
          ? data
          : (toJson(data, internalApi.jsonIndentSize, internalApi.jsonStringifyFunctions) as string)
      );
      return;
    }

    const logLevel = typeof level === 'string' ? LogLevel[level] : level;

    if (logLevel < internalApi.logLevel) {
      return;
    }

    const message =
      typeof data === 'string' ? data : toJson(data, internalApi.jsonIndentSize, internalApi.jsonStringifyFunctions);
    const messageLog = `[${getUnixTimestamp()}] ${internalApi.logLevelMap[logLevel]}: ${message}`;

    internalApi.runtimeLog(messageLog);
  };

  self.debug = function (data) {
    self.log(data, LogLevel.Debug);
  };

  self.info = function (data) {
    self.log(data, LogLevel.Info);
  };

  self.warn = function (data) {
    self.log(data, LogLevel.Warn);
  };

  self.error = function (data) {
    self.log(data, LogLevel.Error);
  };

  self.fatal = function (data) {
    self.log(data, LogLevel.Fatal);
  };

  self.getLogLevel = function () {
    return internalApi.logLevel;
  };

  self.setLogLevel = function (level: LogLevel) {
    internalApi.logLevel = level;
    return self;
  };

  self.getRuntimeLog = function () {
    return internalApi.runtimeLog;
  };

  self.setRuntimeLog = function (log) {
    internalApi.runtimeLog = log;
    return self;
  };

  self.getJsonIndentSize = function () {
    return internalApi.jsonIndentSize;
  };

  self.setJsonIndentSize = function (size) {
    internalApi.jsonIndentSize = cc.clampf(size, jsonIndentSizeMin, jsonIndentSizeMax);
    return self;
  };

  self.getJsonStringifyFunctions = function () {
    return internalApi.jsonStringifyFunctions;
  };

  self.setJsonStringifyFunctions = function (stringify) {
    internalApi.jsonStringifyFunctions = stringify;
    return self;
  };

  self.getLogLevelMap = function () {
    return internalApi.logLevelMap;
  };

  self.setLogLevelMap = function (map) {
    internalApi.logLevelMap = map;
    return self;
  };

  // Logger is ready!
  return self;
}

////////////////////////////////////////////////////////////////////////////////
// Private Static Methods
////////////////////////////////////////////////////////////////////////////////

// None.
