import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MatterDetail } from './MatterDetail'
import type { Matter } from '@/lib/db/schema'

const sampleMatter: Matter = {
  id: 1,
  matterNo: 'M-2024-001',
  clientCode: 'CL001',
  matterCode: 'M&A案件_株式譲渡',
  contacts: '田中 太郎',
  openDate: '2024-01-15',
  location: 'Tokyo',
  handlingAttorneys: JSON.stringify(['大藤 弁護士', '山田 弁護士']),
  billingAttorneys: JSON.stringify(['大藤 弁護士']),
  filingAttorney: '大藤 弁護士',
  status: '申請中',
  region: JSON.stringify(['Japan']),
  practice: JSON.stringify(['M&A']),
  mainPractice: 'M&A',
  pg: JSON.stringify([]),
  billable: '対象',
  totalEstimate: '5,000,000',
  credit: '',
  scheduledCloseDate: '2024-06-30',
  requestedBy: '田中 太郎',
  kycRequired: true,
  slp: false,
  altFee: false,
  hide: 'Open',
  description: '株式譲渡に関する法的サポート',
  remarks: '',
  createdAt: '2024-01-15 09:00:00'
}

const meta = {
  title: 'features/matters/MatterDetail',
  component: MatterDetail,
  args: {
    matter: sampleMatter,
    onBack: () => console.log('back'),
    onSave: (v: Partial<Matter>) => console.log('save', v),
    onCancel: () => console.log('cancel')
  }
} satisfies Meta<typeof MatterDetail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DraftStatus: Story = {
  args: { matter: { ...sampleMatter, status: 'Draft' } }
}

export const Approved: Story = {
  args: { matter: { ...sampleMatter, status: '承認済' } }
}
