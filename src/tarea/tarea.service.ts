import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Tarea, EstadoTarea } from './entities/tarea.entity';
import { CreateTareaInput } from './dto/create-tarea.input';
import { UpdateTareaInput } from './dto/update-tarea.input';

/**
 * Servicio encargado de la lógica de negocio de las tareas.
 * Almacena los registros en memoria mediante un arreglo interno.
 */
@Injectable()
export class TareaService {
  /** Almacenamiento en memoria de las tareas. */
  private readonly tareas: Tarea[] = [];

  /**
   * Crea una nueva tarea y la guarda en memoria.
   * El identificador y la fecha de creación se generan en el servidor.
   * @param {CreateTareaInput} createTareaInput - Datos de la tarea a crear.
   * @returns {Tarea} La tarea recién creada.
   */
  create(createTareaInput: CreateTareaInput): Tarea {
    const nuevaTarea: Tarea = {
      id: randomUUID(),
      titulo: createTareaInput.titulo,
      descripcion: createTareaInput.descripcion,
      estado: createTareaInput.estado ?? EstadoTarea.BACKLOG,
      etiquetas: createTareaInput.etiquetas ?? [],
      usuarioAsignado: createTareaInput.usuarioAsignado,
      proyecto: createTareaInput.proyecto,
      fechaCreacion: new Date(),
    };

    this.tareas.push(nuevaTarea);
    return nuevaTarea;
  }

  /**
   * Devuelve todas las tareas almacenadas.
   * @returns {Tarea[]} Arreglo con todas las tareas.
   */
  findAll(): Tarea[] {
    return this.tareas;
  }

  /**
   * Busca una tarea por su identificador.
   * @param {string} id - Identificador de la tarea.
   * @returns {Tarea} La tarea encontrada.
   * @throws {NotFoundException} Si no existe una tarea con ese id.
   */
  findOne(id: string): Tarea {
    const tarea = this.tareas.find((t) => t.id === id);
    if (!tarea) {
      throw new NotFoundException(`No se encontró la tarea con id ${id}`);
    }
    return tarea;
  }

  /**
   * Actualiza los datos de una tarea existente.
   * Solo modifica los campos enviados en el input.
   * @param {string} id - Identificador de la tarea a actualizar.
   * @param {UpdateTareaInput} updateTareaInput - Campos a modificar.
   * @returns {Tarea} La tarea ya actualizada.
   * @throws {NotFoundException} Si no existe una tarea con ese id.
   */
  update(id: string, updateTareaInput: UpdateTareaInput): Tarea {
    const tarea = this.findOne(id);

    // Se descarta el id del input para no sobrescribirlo por accidente.
    const { id: _ignorado, ...cambios } = updateTareaInput;
    Object.assign(tarea, cambios);

    return tarea;
  }

  /**
   * Elimina una tarea por su identificador.
   * @param {string} id - Identificador de la tarea a eliminar.
   * @returns {Tarea} La tarea que fue eliminada.
   * @throws {NotFoundException} Si no existe una tarea con ese id.
   */
  remove(id: string): Tarea {
    const indice = this.tareas.findIndex((t) => t.id === id);
    if (indice === -1) {
      throw new NotFoundException(`No se encontró la tarea con id ${id}`);
    }
    const [eliminada] = this.tareas.splice(indice, 1);
    return eliminada;
  }
}
