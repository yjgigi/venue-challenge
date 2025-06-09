'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import GameResultModal from '@/components/GameResultModal'
import Image from 'next/image'
import tableImg from '@/../public/table.png'
import Card from '@/components/Card'
import cardBackImg from '@/../public/cardBack.png'
import { drawCardsAndEvaluate } from '@/lib/gameLogic'
import playagain2 from '@/../public/playagain2.png';


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

  const drawCard = async () => {
    setPlayerCard(null)
    setAdminCard(null)
    setResult('')

    const {
      pCard,
      aCard,
      result,
      finalResult,
      gameEnded,
      updatedWinCount,
      updatedLossCount,
    } = drawCardsAndEvaluate(playerWinCount, playerLossCount)

    const drawId = Date.now()

    setPlayerCard({ ...pCard, showBack: true, drawId, position: 'player' })
    setAdminCard({ ...aCard, showBack: true, drawId, position: 'admin' })

    await new Promise((resolve) => setTimeout(resolve, 600))

    setPlayerCard({ ...pCard, showBack: false, drawId, position: 'player' })
    setAdminCard({ ...aCard, showBack: false, drawId, position: 'admin' })

    setTimeout(() => {
      setPlayerWinCount(updatedWinCount)
      setPlayerLossCount(updatedLossCount)
      setResult(result)

      if (gameEnded) {
        setFinalResult(finalResult)
        setGameEnded(true)
        setModalVisible(true)
      }
    }, 1000)
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
      className="min-h-screen max-h-screen overflow-y-auto flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${tableImg.src})` }}
    >
      {/* 卡牌區域 */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full mb-6">

        {/* 管理員區塊 */}
        <div className="relative flex flex-col justify-center items-center w-full md:w-51 max-w-51 order-1 md:order-1">
          <div className="text-lg font-semibold text-white mb-2 md:mb-0 md:absolute md:-top-8">
            管理員
          </div>
          <Card key={adminCard?.drawId} card={adminCard} />
        </div>

        {/* 抽卡區塊 */}
        <div className="flex flex-col items-center w-full md:w-1/3 order-2 md:order-2">
          <div className="mb-2 text-center text-white">點擊卡片抽牌</div>
          <div className="w-24 md:w-32 h-auto">
            <Image
              src={cardBackImg}
              alt="卡背"
              onClick={drawCard}
              className="w-full h-auto cursor-pointer transition-transform duration-300 hover:scale-105 hover:drop-shadow-lg hover:translate-y-1"
            />
          </div>
        </div>

        {/* 玩家區塊 */}
        <div className="relative flex flex-col justify-center items-center w-full md:w-51 max-w-51 order-3 md:order-3">
          <div className="text-lg font-semibold text-white mb-2 md:mb-0 md:absolute md:-top-8">
            玩家
          </div>
          <Card key={playerCard?.drawId} card={playerCard} />
        </div>

      </div>

      {/* 勝負資訊 */}
      <div className="w-full max-w-md text-center text-white">
        <div className="mt-4">
          玩家勝利次數：{playerWinCount}｜失敗次數：{playerLossCount}
        </div>
        <div className="mt-2 text-xl min-h-[2.5rem] transition-all duration-600">
          {result}
        </div>
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
        resultType={finalResult.includes('成功') ? 'success' : 'fail'}
      />

      {/* 再玩一次按鈕 */}
      {!modalVisible && showRestart && gameEnded && (
        <div
          onClick={restartGame}
          className="relative w-40 cursor-pointer transition-transform hover:scale-105"
        >
          <Image src={playagain2} alt="playagain" className="mt-1" />
          <div className="absolute inset-0 flex items-center justify-center text-black font-bold">
            再玩一次
          </div>
        </div>
      )}
    </div>
  )
}
