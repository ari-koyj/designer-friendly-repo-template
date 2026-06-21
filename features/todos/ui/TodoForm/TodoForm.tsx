'use client'

import { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { TextInput } from '@/shared/ui/TextInput'

export type TodoFormProps = {
  onSubmit: (title: string) => void
  disabled?: boolean
}

/**
 * Todo を入力して追加する純粋な UI。入力中の文字列のみローカル state で持ち、
 * 確定（submit）したら親へ title を渡す。ドメインや API は知らない。
 */
export function TodoForm({ onSubmit, disabled = false }: TodoFormProps) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onSubmit(trimmed)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <TextInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="やることを入力"
        aria-label="やることを入力"
      />
      <Button type="submit" disabled={disabled}>
        追加
      </Button>
    </form>
  )
}
