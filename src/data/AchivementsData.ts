export interface Medal {
  id: number
  icon: string
  label: string
  unlocked?: boolean
}

export const achivements: Medal[] = [
  { id: 1, icon: 'mdi:medal', label: '只是路過' },     // 聊天室發 1 則留言
  { id: 2, icon: 'tabler:award', label: '還沒想到' },    // 聊天室發 10 則留言
  { id: 3, icon: 'mdi:trophy-award', label: '意見領袖' },    // 聊天室發 30 則留言
  { id: 4, icon: 'fluent:trophy-16-filled', label: '早起的鳥兒有蟲吃' },    // 參與開幕活動
  { id: 5, icon: 'mdi:flag-checkered', label: '最後一哩路' },    // 參與閉幕活動
  { id: 6, icon: 'material-symbols:star', label: '有始有終' },    // 參與 開幕 和 閉幕 活動
  { id: 7, icon: 'mdi:crown', label: '???' },
  { id: 8, icon: 'mdi:shield', label: '???' },
  { id: 9, icon: 'mdi:sword', label: '???' },
  { id: 10, icon: 'mdi:lightning-bolt', label: '???' },
  { id: 11, icon: 'game-icons:achievement', label: '???' },
]
