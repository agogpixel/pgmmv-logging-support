import {
  createLogger,
  defaultJsonIndentSize,
  defaultJsonStringifyFunctions,
  jsonIndentSizeMax,
  jsonIndentSizeMin
} from './create-logger.function';
import { LogLevel } from './log-level.enum';
import type { LoggerProtectedApi } from './logger-protected-api.interface';

let runtimeLogBuffer: string;

function runtimeLog(arg1: string) {
  runtimeLogBuffer = arg1;
}

function runtimeLogAlt(arg1: string) {
  runtimeLogBuffer = arg1;
}

(global as Record<string, unknown>)['Agtk'] = {
  log: runtimeLog
};

describe('createLogger', () => {
  it('is function', () => expect(typeof createLogger).toBe('function'));

  it('returns an object instance', () => {
    const logger = createLogger({});
    expect(logger).toBeTruthy();
    expect(typeof logger).toEqual('object');
  });

  describe('object instance', () => {
    const internal = {} as LoggerProtectedApi;

    it('instantiates with custom log level', () => {
      const logLevel = LogLevel.Fatal;
      createLogger({ logLevel }, internal);
      expect(internal.logLevel).toEqual(logLevel);
    });

    it('gets log level', () => {
      const logger = createLogger({}, internal);
      expect(logger.getLogLevel()).toEqual(LogLevel.Info);
    });

    it('sets internal runtimeLog method', () => {
      const logLevel = LogLevel.Warn;
      const logger = createLogger({}, internal);
      expect(logger.setLogLevel(logLevel)).toEqual(logger);
      expect(logger.getLogLevel()).toEqual(logLevel);
    });

    it('instantiates with custom runtime log method', () => {
      createLogger({ runtimeLog: runtimeLogAlt }, internal);
      expect(internal.runtimeLog).toEqual(runtimeLogAlt);
    });

    it('gets internal runtimeLog method', () => {
      const logger = createLogger({}, internal);
      expect(logger.getRuntimeLog()).toEqual(runtimeLog);
    });

    it('sets internal runtimeLog method', () => {
      const logger = createLogger({}, internal);
      expect(logger.setRuntimeLog(runtimeLogAlt)).toEqual(logger);
      expect(logger.getRuntimeLog()).toEqual(runtimeLogAlt);
    });

    it('instantiates with custom JSON indent size (valid)', () => {
      const jsonIndentSize = 7;
      createLogger({ jsonIndentSize }, internal);
      expect(internal.jsonIndentSize).toEqual(jsonIndentSize);
    });

    it('instantiates with custom JSON indent size (below min)', () => {
      const jsonIndentSize = -7;
      createLogger({ jsonIndentSize }, internal);
      expect(internal.jsonIndentSize).toEqual(jsonIndentSizeMin);
    });

    it('instantiates with custom JSON indent size (above max)', () => {
      const jsonIndentSize = 100;
      createLogger({ jsonIndentSize }, internal);
      expect(internal.jsonIndentSize).toEqual(jsonIndentSizeMax);
    });

    it('gets JSON indent size', () => {
      const logger = createLogger({}, internal);
      expect(logger.getJsonIndentSize()).toEqual(defaultJsonIndentSize);
    });

    it('sets JSON indent size (valid)', () => {
      const jsonIndentSize = 3;
      const logger = createLogger({}, internal);
      expect(logger.setJsonIndentSize(jsonIndentSize)).toEqual(logger);
      expect(logger.getJsonIndentSize()).toEqual(jsonIndentSize);
    });

    it('sets JSON indent size (below min)', () => {
      const jsonIndentSize = -3;
      const logger = createLogger({}, internal);
      expect(logger.setJsonIndentSize(jsonIndentSize)).toEqual(logger);
      expect(logger.getJsonIndentSize()).toEqual(jsonIndentSizeMin);
    });

    it('sets JSON indent size (below max)', () => {
      const jsonIndentSize = 30;
      const logger = createLogger({}, internal);
      expect(logger.setJsonIndentSize(jsonIndentSize)).toEqual(logger);
      expect(logger.getJsonIndentSize()).toEqual(jsonIndentSizeMax);
    });

    it('instantiates with custom JSON stringify flag', () => {
      const jsonStringifyFunctions = !defaultJsonStringifyFunctions;
      createLogger({ jsonStringifyFunctions }, internal);
      expect(internal.jsonStringifyFunctions).toEqual(jsonStringifyFunctions);
    });

    it('gets JSON stringify flag', () => {
      const logger = createLogger({}, internal);
      expect(logger.getJsonStringifyFunctions()).toEqual(defaultJsonStringifyFunctions);
    });

    it('sets internal runtimeLog method', () => {
      const jsonStringifyFunctions = !defaultJsonStringifyFunctions;
      const logger = createLogger({}, internal);
      expect(logger.setJsonStringifyFunctions(jsonStringifyFunctions)).toEqual(logger);
      expect(logger.getJsonStringifyFunctions()).toEqual(jsonStringifyFunctions);
    });

    it('instantiates with custom log level map', () => {
      const logLevelMap = {
        0: 'a',
        1: 'b',
        2: 'c',
        3: 'd',
        4: 'e'
      };
      createLogger({ logLevelMap }, internal);
      expect(internal.logLevelMap).toEqual(logLevelMap);
    });

    it('gets log level map', () => {
      const logger = createLogger({}, internal);
      expect(logger.getLogLevelMap()).toEqual({
        [LogLevel.Debug]: LogLevel[LogLevel.Debug],
        [LogLevel.Info]: LogLevel[LogLevel.Info],
        [LogLevel.Warn]: LogLevel[LogLevel.Warn],
        [LogLevel.Error]: LogLevel[LogLevel.Error],
        [LogLevel.Fatal]: LogLevel[LogLevel.Fatal]
      });
    });

    it('sets log level map', () => {
      const logLevelMap = {
        0: 'a',
        1: 'b',
        2: 'c',
        3: 'd',
        4: 'e'
      };
      const logger = createLogger({}, internal);
      expect(logger.setLogLevelMap(logLevelMap)).toEqual(logger);
      expect(logger.getLogLevelMap()).toEqual(logLevelMap);
    });

    it('displays messages at or above log level & hides messages that are below (string, defaults)', () => {
      const msg = 'test';
      const logger = createLogger({}, internal);
      logger.fatal(msg);
      expect(runtimeLogBuffer).toMatch(/^\[\d+\] Fatal: test$/);
      logger.error(msg);
      expect(runtimeLogBuffer).toMatch(/^\[\d+\] Error: test$/);
      logger.warn(msg);
      expect(runtimeLogBuffer).toMatch(/^\[\d+\] Warn: test$/);
      logger.info(msg);
      expect(runtimeLogBuffer).toMatch(/^\[\d+\] Info: test$/);
      logger.debug(msg);
      expect(runtimeLogBuffer).toMatch(/^\[\d+\] Info: test$/);
    });

    it('logs with log level name', () => {
      const msg = 'test';
      const logger = createLogger({}, internal);
      logger.log(msg, 'Info');
      expect(runtimeLogBuffer).toMatch(/^\[\d+\] Info: test$/);
    });

    it('supports original Agtk.log behavior with log method (string, defaults)', () => {
      const msg = 'test';
      const logger = createLogger({}, internal);
      logger.log(msg);
      expect(runtimeLogBuffer).toEqual(msg);
    });

    it('displays messages at or above log level & hides messages that are below (JSON, 0 indent)', () => {
      const msg = { test: 'test' };
      const logger = createLogger({ jsonIndentSize: 0 }, internal);
      logger.fatal(msg);
      expect(runtimeLogBuffer).toMatch(/^\[\d+\] Fatal: {\"test\":\"test\"}$/);
      logger.error(msg);
      expect(runtimeLogBuffer).toMatch(/^\[\d+\] Error: {\"test\":\"test\"}$/);
      logger.warn(msg);
      expect(runtimeLogBuffer).toMatch(/^\[\d+\] Warn: {\"test\":\"test\"}$/);
      logger.info(msg);
      expect(runtimeLogBuffer).toMatch(/^\[\d+\] Info: {\"test\":\"test\"}$/);
      logger.debug(msg);
      expect(runtimeLogBuffer).toMatch(/^\[\d+\] Info: {\"test\":\"test\"}$/);
    });

    it('extends original Agtk.log behavior with log method (JSON, 0 indent)', () => {
      const msg = { test: 'test' };
      const logger = createLogger({ jsonIndentSize: 0 }, internal);
      logger.log(msg);
      expect(runtimeLogBuffer).toMatch(/^{\"test\":\"test\"}$/);
    });
  });
});
