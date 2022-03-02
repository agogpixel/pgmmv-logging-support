import { getUnixTimestamp } from '@agogpixel/pgmmv-resource-support/src/time/get-unix-timestamp';
import { toJson } from '@agogpixel/pgmmv-resource-support/src/json/to-json';

import { LogLevel } from './log-level';
import type { Logger } from './logger';
import type { LoggerConfig } from './config';
import type { LoggerProtectedApi } from './protected-api';

/**
 *
 */
const defaultJsonIndentSize = 2;

/**
 *
 */
const defaultJsonStringifyFunctions = false;

/**
 *
 */
const jsonIndentSizeMin = 0;

/**
 *
 */
const jsonIndentSizeMax = 8;

/**
 *
 * @param config
 * @param internal
 * @returns
 */
export function createLogger(config: LoggerConfig, internal?: LoggerProtectedApi) {
  /**
   *
   */
  const self = {} as Logger;

  /**
   *
   */
  const internalApi = internal || ({} as LoggerProtectedApi);

  /**
   *
   * @param value
   * @param min
   * @param max
   * @returns
   */
  function clamp(value: number, min: number, max: number) {
    if (value < min) {
      return min;
    }

    if (value > max) {
      return max;
    }

    return value;
  }

  /**
   *
   */
  internalApi.logLevel = config.logLevel || LogLevel.Info;

  /**
   *
   */
  internalApi.runtimeLog = config.runtimeLog || Agtk.log;

  /**
   *
   */
  internalApi.jsonIndentSize =
    typeof config.jsonIndentSize !== 'number'
      ? defaultJsonIndentSize
      : clamp(config.jsonIndentSize, jsonIndentSizeMin, jsonIndentSizeMax);

  /**
   *
   */
  internalApi.jsonStringifyFunctions = !!config.jsonStringifyFunctions || defaultJsonStringifyFunctions;

  /**
   *
   */
  internalApi.logLevelMap = config.logLevelMap || {
    [LogLevel.Debug]: LogLevel[LogLevel.Debug],
    [LogLevel.Info]: LogLevel[LogLevel.Info],
    [LogLevel.Warn]: LogLevel[LogLevel.Warn],
    [LogLevel.Error]: LogLevel[LogLevel.Error],
    [LogLevel.Fatal]: LogLevel[LogLevel.Fatal]
  };

  /**
   *
   * @param data
   * @param level
   */
  self.log = function log(data, level?) {
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

  /**
   *
   * @param data
   */
  self.debug = function debug(data) {
    self.log(data, LogLevel.Debug);
  };

  /**
   *
   * @param data
   */
  self.info = function info(data) {
    self.log(data, LogLevel.Info);
  };

  /**
   *
   * @param data
   */
  self.warn = function warn(data) {
    self.log(data, LogLevel.Warn);
  };

  /**
   *
   * @param data
   */
  self.error = function error(data) {
    self.log(data, LogLevel.Error);
  };

  /**
   *
   * @param data
   */
  self.fatal = function fatal(data) {
    self.log(data, LogLevel.Fatal);
  };

  /**
   *
   */
  self.getLogLevel = function getLogLevel() {
    return internalApi.logLevel;
  };

  /**
   *
   * @param level
   */
  self.setLogLevel = function setLogLevel(level: LogLevel) {
    internalApi.logLevel = level;
    return self;
  };

  /**
   *
   */
  self.getRuntimeLog = function getRuntimeLog() {
    return internalApi.runtimeLog;
  };

  /**
   *
   * @param log
   */
  self.setRuntimeLog = function setRuntimeLog(log) {
    internalApi.runtimeLog = log;
    return self;
  };

  /**
   *
   */
  self.getJsonIndentSize = function getJsonIndentSize() {
    return internalApi.jsonIndentSize;
  };

  /**
   *
   * @param size
   */
  self.setJsonIndentSize = function setJsonIndentSize(size) {
    internalApi.jsonIndentSize = clamp(size, jsonIndentSizeMin, jsonIndentSizeMax);
    return self;
  };

  /**
   *
   */
  self.getJsonStringifyFunctions = function getJsonStringifyFunctions() {
    return internalApi.jsonStringifyFunctions;
  };

  /**
   *
   * @param stringify
   */
  self.setJsonStringifyFunctions = function setJsonStringifyFunctions(stringify) {
    internalApi.jsonStringifyFunctions = stringify;
    return self;
  };

  /**
   *
   */
  self.getLogLevelMap = function getLogLevelMap() {
    return internalApi.logLevelMap;
  };

  /**
   *
   * @param map
   */
  self.setLogLevelMap = function setLogLevelMap(map) {
    internalApi.logLevelMap = map;
    return self;
  };

  return self;
}
