'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import GameResultModal from '@/components/GameResultModal'

const cardPool = [
  { type: 'normal', value: 1 },
  { type: 'normal', value: 2 },
  { type: 'normal', value: 3 },
  { type: 'normal', value: 4 },
  { type: 'normal', value: 5 },
  { type: 'normal', value: 6 },
  { type: 'normal', value: 7 },
  { type: 'normal', value: 8 },
  { type: 'normal', value: 9 },
  { type: 'normal', value: 10 },
  { type: 'special', name: '說服成功' },
  { type: 'special', name: '拒絕處理' },
  { type: 'special', name: '借用單出錯' },
  { type: 'special', name: '失敗一次' },
]

export default function GamePage() {
  const router = useRouter()

  const [playerCard, setPlayerCard] = useState(null)
  const [adminCard, setAdminCard] = useState(null)
  const [result, setResult] = useState('')
  const [playerWinCount, setPlayerWinCount] = useState(0)
  const [playerLossCount, setPlayerLossCount] = useState(0)

  const [modalVisible, setModalVisible] = useState(false)
  const [finalResult, setFinalResult] = useState('')
  const [showRestart, setShowRestart] = useState(false)

  const getRandomCard = () => cardPool[Math.floor(Math.random() * cardPool.length)]

  const drawCard = () => {
    const pCard = getRandomCard()
    const aCard = getRandomCard()

    setPlayerCard(pCard)
    setAdminCard(aCard)

    const cards = [pCard, aCard]

    for (let card of cards) {
      if (card.type === 'special') {
        if (card.name === '說服成功') {
          setResult('🎉 玩家說服成功，直接勝利！')
          setFinalResult('🎉 玩家說服成功，直接勝利！')
          setModalVisible(true)
          return
        } else if (card.name === '拒絕處理') {
          setResult('🛑 管理員拒絕處理，遊戲結束。')
          setFinalResult('🛑 管理員拒絕處理，遊戲結束。')
          setModalVisible(true)
          return
        } else if (card.name === '借用單出錯') {
          setResult('📄 借用單出錯，請重新抽牌。')
          return
        } else if (card.name === '失敗一次') {
          const newLoss = playerLossCount + 1
          setPlayerLossCount(newLoss)
          setResult('⚠️ 玩家失敗一次，目前失敗次數：' + newLoss)
          if (newLoss >= 3) {
            setFinalResult('💥 玩家失敗 3 次，借用失敗...')
            setModalVisible(true)
          }
          return
        }
      }
    }

    if (pCard.value > aCard.value) {
      const newWin = playerWinCount + 1
      setPlayerWinCount(newWin)
      setResult('✅ 玩家勝利！')
      if (newWin >= 3) {
        setFinalResult('🎉 玩家連勝 3 次！你成功借到了！')
        setModalVisible(true)
      }
    } else if (pCard.value < aCard.value) {
      const newLoss = playerLossCount + 1
      setPlayerLossCount(newLoss)
      setResult('❌ 管理員勝利！')
      if (newLoss >= 3) {
        setFinalResult('💥 玩家失敗 3 次，借用失敗...')
        setModalVisible(true)
      }
    } else {
      setResult('⚔️ 平手！請再抽一次')
    }
  }

  const restartGame = () => {
    setPlayerWinCount(0)
    setPlayerLossCount(0)
    setPlayerCard(null)
    setAdminCard(null)
    setResult('')
    setModalVisible(false)
    setShowRestart(false)
  }

  const goToMap = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">管理員借用單對決</h1>

      <div className="flex gap-10 items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">管理員</h2>
          <div className="p-4 border bg-white rounded min-w-[100px] text-center">
            {adminCard ? (adminCard.name || adminCard.value) : '未抽牌'}
          </div>
        </div>

        <div className="p-4 bg-yellow-100 rounded-xl text-center">
          <p>點擊下方按鈕抽牌</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">玩家</h2>
          <div className="p-4 border bg-white rounded min-w-[100px] text-center">
            {playerCard ? (playerCard.name || playerCard.value) : '未抽牌'}
          </div>
        </div>
      </div>

      <button
        onClick={drawCard}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        抽牌
      </button>

      <div className="mt-4 text-center">
        <p>玩家勝利次數：{playerWinCount}｜失敗次數：{playerLossCount}</p>
        <p className="mt-2 text-xl">{result}</p>
      </div>

      <GameResultModal
        visible={modalVisible}
        onClose={() => {setModalVisible(false), setShowRestart(true)}}
        resultMessage={finalResult}
        onRestart={restartGame}
        onGoHome={goToMap}
      />
      {finalResult && !modalVisible && (
        <button
          onClick={restartGame}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
        >
          再玩一次
        </button>
      )}

    </div>
  )
}
