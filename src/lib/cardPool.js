
export const CardPool = [
    { type: 'normal', value: 1, weight: 10 },
    { type: 'normal', value: 2, weight: 10 },
    { type: 'normal', value: 3, weight: 10 },
    { type: 'normal', value: 4, weight: 10 },
    { type: 'normal', value: 5, weight: 10 },
    { type: 'normal', value: 6, weight: 10 },
    { type: 'normal', value: 7, weight: 10 },
    { type: 'normal', value: 8, weight: 10 },
    { type: 'normal', value: 9, weight: 10 },
    { type: 'normal', value: 10, weight: 10 },
    { type: 'special', name: '說服成功', weight: 1 },
    { type: 'special', name: '拒絕處理', weight: 1 },
    { type: 'special', name: '借用單出錯', weight: 2 },
    { type: 'special', name: '玩家失敗一次', weight: 3 },
  ]
  
  export function getRandomCard() {
    const totalWeight = CardPool.reduce((sum, card) => sum + card.weight, 0)
    const rand = Math.random() * totalWeight
    let runningSum = 0
  
    for (const card of CardPool) {
      runningSum += card.weight
      if (rand <= runningSum) {
        // 不傳 weight 給外部
        const { weight, ...cardData } = card
        return cardData
      }
    }
  
    // 保底回傳（理論上不會到這裡）
    return CardPool[0]
  }
  