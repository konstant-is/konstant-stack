// import { type Logger, pino } from 'pino'
// import { PrettyOptions } from 'pino-pretty'

// const prettyOptions: PrettyOptions = {
//   colorize: true,
//   ignore: 'pid,hostname',
//   translateTime: 'SYS:HH:MM:ss',
// }

// export const logger = pino({
//   transport: {
//     target: 'pino-pretty',
//     options: prettyOptions,
//   },
// })

// // export const prettySyncLoggerDestination: PinoPretty.PrettyStream = build({
// //   ...prettyOptions,
// //   destination: 1, // stdout
// //   sync: true,
// // })

// // export const defaultLoggerOptions: PinoPretty.PrettyStream = build(prettyOptions)

// /**
//  * Creates a logger instance with custom options.
//  *
//  * @param name - Name of the logger.
//  * @param logger - Optional logger configuration or instance.
//  * @returns A Pino logger instance.
//  */
// // export const getLogger = (
// //   name = 'app',
// //   logger?: 'sync' | { destination?: DestinationStream; options: pino.LoggerOptions },
// // ): CustomLogger => {
// //   if (!logger) {
// //     return pino(defaultLoggerOptions)
// //   }

// //   // Synchronous logger used for CLI or bin scripts
// //   if (logger === 'sync') {
// //     return pino(prettySyncLoggerDestination)
// //   }

// //   // Custom logger configuration
// //   if ('options' in logger) {
// //     const { destination, options } = logger

// //     if (!options.name) {
// //       options.name = name
// //     }

// //     if (!options.enabled) {
// //       options.enabled = process.env.DISABLE_LOGGING !== 'true'
// //     }

// //     return pino(options, destination)
// //   } else {
// //     // Instantiated logger
// //     return logger
// //   }
// // }
