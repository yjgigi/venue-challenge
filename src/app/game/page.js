'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GameResultModal from '@/components/GameResultModal';
import Image from 'next/image';
import tableImg from '@/../public/table.png';
import Card from '@/components/Card';
import cardBackImg from '@/../public/cardBack.png';
import { getRandomCard } from '@/lib/cardPool';
import { drawCardsAndEvaluate } from '@/lib/gameLogic';


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
  const [gameEnded, setGameEnded] = useState(false)

  const drawCard = () => {
    const {
      pCard, aCard, result, finalResult,
      gameEnded, updatedWinCount, updatedLossCount
    } = drawCardsAndEvaluate(playerWinCount, playerLossCount)

    setPlayerCard(pCard)
    setAdminCard(aCard)
    setResult(result)
    setPlayerWinCount(updatedWinCount)
    setPlayerLossCount(updatedLossCount)

    if (gameEnded) {
      setFinalResult(finalResult)
      setGameEnded(true)
      setModalVisible(true)
    }
  }

  const restartGame = () => {
    setPlayerWinCount(0)
    setPlayerLossCount(0)
    setPlayerCard(null)
    setAdminCard(null)
    setResult('')
    setFinalResult('')
    setModalVisible(false)
    setShowRestart(false)
    setGameEnded(false)
  }


  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${tableImg.src})` }}
    >
      {/* 卡牌區域 */}
      <div className="flex gap-10 items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">管理員</h2>
          <Card card={adminCard} />
        </div>

        <div className="p-4 text-center w-51 h-70.5">
          <p>點擊卡片抽牌</p>
          <Image 
            src={cardBackImg} alt='卡背' onClick={drawCard}
            className="mx-auto cursor-pointer transition-transform duration-300 hover:scale-103 hover:drop-shadow-lg hover: translate-y-1 "
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">玩家</h2>
          <Card card={playerCard} />
        </div>
      </div>

      {/* 勝負資訊 */}
      <div>
        <div className="mt-4 text-center">玩家勝利次數：{playerWinCount}｜失敗次數：{playerLossCount}</div>
        <div className="mt-2 text-xl text-white text-center">{result}</div>
      </div>

      {/* 結果 Modal */}
      <GameResultModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false)
          if (gameEnded) setShowRestart(true)
        }}
        resultMessage={finalResult}
        onRestart={restartGame}
     
      />

      {/* 再玩一次按鈕 */}
      {showRestart && gameEnded && (
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
