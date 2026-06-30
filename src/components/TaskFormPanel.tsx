import { Plus } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'

import type { Task, TaskInput, TaskPriority } from '../types/task'

type FormErrors = Partial<Record<keyof TaskInput, string>>

type TaskFormPanelProps = {
  editingTask: Task | null
  onCancelEdit: () => void
  onCreateTask: (input: TaskInput) => void
  onUpdateTask: (taskId: string, input: TaskInput) => void
}

const emptyForm: TaskInput = {
  title: '',
  description: '',
  priority: 'medium',
  category: '',
  dueDate: '',
}

const priorityOptions: Array<{ label: string; value: TaskPriority }> = [
  { label: 'Baja', value: 'low' },
  { label: 'Media', value: 'medium' },
  { label: 'Alta', value: 'high' },
]

export function TaskFormPanel({
  editingTask,
  onCancelEdit,
  onCreateTask,
  onUpdateTask,
}: TaskFormPanelProps) {
  const [form, setForm] = useState<TaskInput>(
    editingTask ? getTaskFormValue(editingTask) : emptyForm,
  )
  const [errors, setErrors] = useState<FormErrors>({})
  const isEditing = editingTask !== null

  function updateField<Field extends keyof TaskInput>(
    field: Field,
    value: TaskInput[Field],
  ) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateTaskForm(form)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    if (editingTask) {
      onUpdateTask(editingTask.id, form)
    } else {
      onCreateTask(form)
    }

    setForm(emptyForm)
    setErrors({})
  }

  function handleCancel() {
    setForm(emptyForm)
    setErrors({})
    onCancelEdit()
  }

  return (
    <section
      aria-labelledby="task-form-title"
      className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      id="tareas"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase text-emerald-700">
            {isEditing ? 'Editar tarea' : 'Nueva tarea'}
          </p>
          <h2 className="mt-1 text-2xl font-bold" id="task-form-title">
            {isEditing ? 'Actualizar datos' : 'Captura rapida'}
          </h2>
        </div>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          <Plus aria-hidden="true" size={21} strokeWidth={2.25} />
        </span>
      </div>

      <form className="mt-5 grid gap-4" noValidate onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-bold text-slate-800" htmlFor="title">
            Titulo
          </label>
          <input
            aria-describedby={errors.title ? 'title-error' : undefined}
            aria-invalid={Boolean(errors.title)}
            className="mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500"
            id="title"
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="Ej. Preparar reunion"
            type="text"
            value={form.title}
          />
          {errors.title && <FieldError id="title-error" message={errors.title} />}
        </div>

        <div>
          <label
            className="text-sm font-bold text-slate-800"
            htmlFor="description"
          >
            Descripcion
          </label>
          <textarea
            className="mt-2 min-h-24 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500"
            id="description"
            onChange={(event) =>
              updateField('description', event.target.value)
            }
            placeholder="Notas, contexto o proximos pasos"
            value={form.description}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label
              className="text-sm font-bold text-slate-800"
              htmlFor="priority"
            >
              Prioridad
            </label>
            <select
              className="mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500"
              id="priority"
              onChange={(event) =>
                updateField('priority', event.target.value as TaskPriority)
              }
              value={form.priority}
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="text-sm font-bold text-slate-800"
              htmlFor="category"
            >
              Categoria
            </label>
            <input
              aria-describedby={errors.category ? 'category-error' : undefined}
              aria-invalid={Boolean(errors.category)}
              className="mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500"
              id="category"
              onChange={(event) => updateField('category', event.target.value)}
              placeholder="Trabajo"
              type="text"
              value={form.category}
            />
            {errors.category && (
              <FieldError id="category-error" message={errors.category} />
            )}
          </div>

          <div>
            <label
              className="text-sm font-bold text-slate-800"
              htmlFor="dueDate"
            >
              Fecha limite
            </label>
            <input
              className="mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500"
              id="dueDate"
              onChange={(event) => updateField('dueDate', event.target.value)}
              type="date"
              value={form.dueDate}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            type="submit"
          >
            {isEditing ? 'Guardar cambios' : 'Crear tarea'}
          </button>
          {isEditing && (
            <button
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-500"
              onClick={handleCancel}
              type="button"
            >
              Cancelar edicion
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

function validateTaskForm(form: TaskInput): FormErrors {
  const errors: FormErrors = {}

  if (form.title.trim().length === 0) {
    errors.title = 'El titulo es obligatorio.'
  }

  if (form.category.trim().length === 0) {
    errors.category = 'La categoria es obligatoria.'
  }

  return errors
}

function getTaskFormValue(task: Task): TaskInput {
  return {
    title: task.title,
    description: task.description,
    priority: task.priority,
    category: task.category,
    dueDate: task.dueDate,
  }
}

type FieldErrorProps = {
  id: string
  message: string
}

function FieldError({ id, message }: FieldErrorProps) {
  return (
    <p className="mt-2 text-sm font-medium text-red-700" id={id} role="alert">
      {message}
    </p>
  )
}
