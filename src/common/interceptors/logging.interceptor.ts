import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Interceptor que aplica logging de forma transversal (AOP) a todas
 * las operaciones de GraphQL.
 *
 * Registra el nombre de la operación, sus argumentos y el tiempo de
 * ejecución sin necesidad de modificar los resolvers ni los servicios.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  /**
   * Intercepta la ejecución de un resolver de GraphQL.
   * @param {ExecutionContext} context - Contexto de ejecución actual.
   * @param {CallHandler} next - Manejador que continúa la cadena de ejecución.
   * @returns {Observable<unknown>} Flujo con la respuesta del resolver.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    // Adaptamos el contexto genérico a uno específico de GraphQL.
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo<{ fieldName: string }>();
    const args = gqlContext.getArgs<Record<string, unknown>>();

    // Nombre de la operación (p. ej. "crearTarea", "tareas", "eliminarTarea").
    const operacion = info.fieldName;
    const inicio = Date.now();

    this.logger.log(
      `Operación GraphQL iniciada: "${operacion}" | Argumentos: ${JSON.stringify(
        args,
      )}`,
    );

    // tap() nos deja ejecutar código cuando la operación termina,
    // sin alterar la respuesta que viaja hacia el cliente.
    return next.handle().pipe(
      tap(() => {
        const duracion = Date.now() - inicio;
        this.logger.log(
          `Operación GraphQL finalizada: "${operacion}" | Duración: ${duracion}ms`,
        );
      }),
    );
  }
}
