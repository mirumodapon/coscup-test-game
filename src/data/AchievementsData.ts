export interface Medal {
  id: number
  icon: string
  label: string
  unlocked?: boolean
}

export const achievements: Medal[] = [
  { id: 1, icon: 'mdi:medal', label: '只是路過', unlocked: true }, // 聊天室發 1 則留言
  { id: 2, icon: 'ph:chat-centered-text', label: '開始融入', unlocked: true }, // 聊天室發 10 則留言
  { id: 3, icon: 'mdi:trophy-award', label: '意見領袖', unlocked: false }, // 聊天室發 30 則留言

  { id: 4, icon: 'mdi:heart-outline', label: '有人理我', unlocked: true }, // 聊天室留言獲得 1 個愛心
  { id: 5, icon: 'mdi:heart-multiple-outline', label: '人氣新星', unlocked: false }, // 聊天室留言獲得 30 個愛心
  { id: 6, icon: 'mdi:heart-circle', label: '魅力無法擋', unlocked: false }, // 聊天室留言獲得 100 個愛心

  { id: 7, icon: 'mdi:hand-heart-outline', label: '給你一顆愛心', unlocked: true }, // 按別人留言愛心 1 次
  { id: 8, icon: 'mdi:hand-coin-outline', label: '暖心使者', unlocked: false }, // 按別人留言愛心 10 次
  { id: 9, icon: 'mdi:cards-heart', label: '真心不騙', unlocked: false }, // 按別人留言愛心 30 次

  { id: 10, icon: 'fluent:trophy-16-filled', label: '早起的鳥兒有蟲吃', unlocked: true }, // 參與開幕
  { id: 11, icon: 'mdi:flag-checkered', label: '最後一哩路', unlocked: false }, // 參與閉幕
  { id: 12, icon: 'material-symbols:star', label: '有始有終', unlocked: false }, // 參與開幕與閉幕

  { id: 13, icon: 'mdi:crown', label: '第一哩路', unlocked: true }, // 獲得 1 個板塊
  { id: 14, icon: 'mdi:map-marker-radius-outline', label: '開疆闢土', unlocked: false }, // 獲得 5 個板塊
  { id: 15, icon: 'mdi:earth-box', label: '吾土吾疆', unlocked: false }, // 獲得 30 個板塊
]