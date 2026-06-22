import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { StatusTag } from './StatusTag'

const meta = {
  title: 'shared/ui/StatusTag',
  component: StatusTag
} satisfies Meta<typeof StatusTag>

export default meta
type Story = StoryObj<typeof meta>

export const DraftStory: Story = { args: { status: 'Draft' }, name: 'Draft' }
export const Applying: Story = { args: { status: '申請中' }, name: '申請中' }
export const Approved: Story = { args: { status: '承認済' }, name: '承認済' }
export const Returned: Story = { args: { status: '差戻し' }, name: '差戻し' }
export const ClosedStory: Story = { args: { status: 'Closed' }, name: 'Closed' }
