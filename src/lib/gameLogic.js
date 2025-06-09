import { getRandomCard } from './cardPool';
import Image from 'next/image';


export function drawCardsAndEvaluate(playerWinCount, playerLossCount) {
  const pCard = getRandomCard();
  const aCard = getRandomCard();

  let result = '';
  let finalResult = '';
  let gameEnded = false;
  let updatedWinCount = playerWinCount;
  let updatedLossCount = playerLossCount;

  const cards = [pCard, aCard]

  for (let card of cards) {
    if (card.type === 'special') {
      if (card.name === '說服成功') {
        result = '🎉 恭喜你成功說服管理員借用！'
        finalResult = result
        gameEnded = true
        return { pCard, aCard, result, finalResult, gameEnded, updatedWinCount, updatedLossCount }
      } else if (card.name === '拒絕處理') {
        result = '🛑 被管理員拒絕了，借用失敗。'
        finalResult = result
        gameEnded = true
        return { pCard, aCard, result, finalResult, gameEnded, updatedWinCount, updatedLossCount }
      } else if (card.name === '借用單出錯') {
        result = '📄 借用單出錯，請重新抽牌。'
        return { pCard, aCard, result, finalResult, gameEnded, updatedWinCount, updatedLossCount }
      } else if (card.name === '玩家失敗一次') {
        updatedLossCount += 1
        result = `⚠️ 玩家失敗一次，目前失敗次數：${updatedLossCount}`
        if (updatedLossCount >= 3) {
          finalResult = '💥借用失敗...下次再來'
          gameEnded = true
        }
        return { pCard, aCard, result, finalResult, gameEnded, updatedWinCount, updatedLossCount }
      }
    }
  }

  if (pCard.value > aCard.value) {
    updatedWinCount += 1
    result = '✅ 玩家勝利！'
    if (updatedWinCount >= 3) {
        finalResult = '🎉 恭喜你成功借到場地！'
        gameEnded = true
    }
  } else if (pCard.value < aCard.value) {
    updatedLossCount += 1
    result = '❌ 管理員勝利！'
    if (updatedLossCount >= 3) {
      finalResult = '💥借用失敗...'
      gameEnded = true
    }
  } else {
    result = '⚔️ 平手！請再抽一次'
  }

  return {
    pCard,
    aCard,
    result,
    finalResult,
    gameEnded,
    updatedWinCount,
    updatedLossCount,
  }
}
