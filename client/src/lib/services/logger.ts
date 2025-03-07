// Interface segregation principle - separate interfaces for different logging concerns
export interface ILogger {
  info(message: string, context?: Record<string, unknown>): void;
  error(message: string, error?: Error, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  debug(message: string, context?: Record<string, unknown>): void;
}

// Concrete implementation
export class ConsoleLogger implements ILogger {
  private formatMessage(level: string, message: string, context?: Record<string, unknown>) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}${context ? ` ${JSON.stringify(context)}` : ''}`;
  }

  info(message: string, context?: Record<string, unknown>): void {
    console.info(this.formatMessage('INFO', message, context));
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    console.error(this.formatMessage('ERROR', message, { ...context, error: error?.message }));
  }

  warn(message: string, context?: Record<string, unknown>): void {
    console.warn(this.formatMessage('WARN', message, context));
  }

  debug(message: string, context?: Record<string, unknown>): void {
    console.debug(this.formatMessage('DEBUG', message, context));
  }
}

// Singleton instance for global usage
export const logger = new ConsoleLogger();
