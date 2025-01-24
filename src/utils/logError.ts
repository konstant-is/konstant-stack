// import type pino from 'pino'

// interface LoggerConfig {
//   loggingLevels: Record<string, pino.Level | false>
//   logger: pino.Logger
// }

// export const logError = ({ err, config }: { err: unknown; config: LoggerConfig }): void => {
//   let level: false | pino.Level = 'error'

//   if (
//     err &&
//     typeof err === 'object' &&
//     'name' in err &&
//     typeof err.name === 'string' &&
//     typeof config.loggingLevels[err.name] !== 'undefined'
//   ) {
//     level = config.loggingLevels[err.name]
//   }

//   if (level) {
//     const logObject: { err?: unknown; msg?: unknown } = {}

//     if (level === 'info') {
//       logObject.msg = err && typeof err === 'object' && 'message' in err ? err.message : 'Error'
//     } else {
//       logObject.err = err ?? 'Unknown error' // Handle undefined or null error
//     }

//     config.logger[level](logObject)
//   }
// }
