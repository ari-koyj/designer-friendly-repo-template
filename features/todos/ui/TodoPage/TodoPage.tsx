'use client'

import {
  useCreateTodo,
  useDeleteTodo,
  useToggleTodo,
  useTodos,
} from '@/features/todos/hooks/useTodos'
import { TodoForm } from '@/features/todos/ui/TodoForm'
import { TodoList } from '@/features/todos/ui/TodoList'

/**
 * Todo 画面の viewmodel。hooks（= Hono API）と純粋な UI を配線するだけで、
 * 表示ロジックは UI コンポーネントへ、サーバー処理は hooks へ委譲する。
 */
export function TodoPage() {
  const { data: todos = [], isLoading } = useTodos()
  const createTodo = useCreateTodo()
  const toggleTodo = useToggleTodo()
  const deleteTodo = useDeleteTodo()

  return (
    <main className="mx-auto flex max-w-xl flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold text-foreground">Todo</h1>

      <TodoForm
        onSubmit={(title) => createTodo.mutate(title)}
        disabled={createTodo.isPending}
      />

      {isLoading ? (
        <p className="py-8 text-center text-sm text-foreground-muted">
          読み込み中...
        </p>
      ) : (
        <TodoList
          todos={todos}
          onToggle={(id, completed) => toggleTodo.mutate({ id, completed })}
          onDelete={(id) => deleteTodo.mutate(id)}
        />
      )}
    </main>
  )
}
