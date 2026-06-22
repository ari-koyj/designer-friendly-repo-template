import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MatterList } from './MatterList'
import type { Matter } from '@/lib/db/schema'

const sampleMatters: Matter[] = [
  {
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
    description: '',
    remarks: '',
    createdAt: '2024-01-15 09:00:00'
  },
  {
    id: 2,
    matterNo: 'M-2024-002',
    clientCode: 'CL002',
    matterCode: '知財_特許出願',
    contacts: '佐藤 花子',
    openDate: '2024-02-01',
    location: 'Osaka',
    handlingAttorneys: JSON.stringify(['鈴木 弁護士']),
    billingAttorneys: JSON.stringify(['鈴木 弁護士']),
    filingAttorney: '鈴木 弁護士',
    status: '承認済',
    region: JSON.stringify(['Japan']),
    practice: JSON.stringify(['IP']),
    mainPractice: 'IP',
    pg: JSON.stringify([]),
    billable: '対象',
    totalEstimate: '2,000,000',
    credit: '',
    scheduledCloseDate: '2024-12-31',
    requestedBy: '佐藤 花子',
    kycRequired: false,
    slp: false,
    altFee: false,
    hide: 'Open',
    description: '',
    remarks: '',
    createdAt: '2024-02-01 10:00:00'
  },
  {
    id: 3,
    matterNo: 'M-2024-003',
    clientCode: 'CL001',
    matterCode: '労働_雇用契約',
    contacts: '田中 太郎',
    openDate: '2024-03-10',
    location: 'Tokyo',
    handlingAttorneys: JSON.stringify(['大藤 弁護士']),
    billingAttorneys: JSON.stringify(['大藤 弁護士']),
    filingAttorney: '大藤 弁護士',
    status: 'Draft',
    region: JSON.stringify(['Japan']),
    practice: JSON.stringify(['Labor']),
    mainPractice: 'Labor',
    pg: JSON.stringify([]),
    billable: '対象',
    totalEstimate: '',
    credit: '',
    scheduledCloseDate: '',
    requestedBy: '田中 太郎',
    kycRequired: false,
    slp: false,
    altFee: false,
    hide: 'Open',
    description: '',
    remarks: '',
    createdAt: '2024-03-10 11:00:00'
  }
]

const meta = {
  title: 'features/matters/MatterList',
  component: MatterList,
  args: {
    matters: sampleMatters,
    onOpen: (m: Matter) => console.log('open', m),
    onNew: () => console.log('new')
  }
} satisfies Meta<typeof MatterList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Empty: Story = { args: { matters: [] } }
