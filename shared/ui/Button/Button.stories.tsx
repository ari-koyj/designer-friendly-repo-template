import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Button } from './Button'

const meta = {
  title: 'shared/ui/Button',
  component: Button,
  args: { children: 'ボタン' }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { variant: 'primary' } }
export const Default: Story = { args: { variant: 'default' } }
export const Text: Story = { args: { variant: 'text' } }
export const Danger: Story = { args: { variant: 'danger', children: '削除' } }
export const SmallPrimary: Story = { args: { variant: 'primary', size: 'sm' } }
export const Disabled: Story = { args: { disabled: true } }
