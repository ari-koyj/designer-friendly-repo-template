import React from 'react'
import { Checkbox } from '@ds-stories/shared/ui/Checkbox/Checkbox'

export const Unchecked = () => (
  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'sans-serif', fontSize: 14, color: '#433e3b' }}>
    <Checkbox checked={false} readOnly /> 未チェック
  </label>
)

export const Checked = () => (
  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'sans-serif', fontSize: 14, color: '#433e3b' }}>
    <Checkbox checked={true} readOnly /> チェック済み
  </label>
)

export const Disabled = () => (
  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'sans-serif', fontSize: 14, color: '#ada9a5' }}>
    <Checkbox checked={false} disabled readOnly /> 無効
  </label>
)
