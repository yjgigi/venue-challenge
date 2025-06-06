'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-yellow-100 text-gray-800 p-4">
      <h1 className="text-5xl font-bold mb-6 text-center">借用大作戰！</h1>

      {/* 兩個按鈕 */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push('/game')}
          className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
        >
          開始遊戲
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
        >
          遊戲說明
        </button>
      </div>

      {/* 說明彈窗 */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative bg-white rounded-xl shadow-lg max-w-md w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 關閉按鈕 */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold">遊戲說明</h2>
            <ul className="text-left list-disc list-inside space-y-1 text-sm">
              <li>雙方抽一張牌，比大小</li>
              <li>抽到特殊卡會立即觸發</li>
              <li>先贏 3 次者勝出，或抽到特殊勝利卡</li>
              <li>平手則重抽一回合</li>
            </ul>
            <p className="font-semibold mt-2 text-sm">特殊卡（任一方抽到即觸發）:</p>
            <ul className="text-xs list-disc list-inside ml-2 text-gray-700">
              <li>說服成功：玩家直接勝利</li>
              <li>拒絕處理：管理員直接勝利</li>
              <li>借用單出錯 / 再來一次：該回合重抽</li>
              <li>失敗一次：玩家失敗次數 +1</li>
            </ul>
          </div>
        </div>
      )}
    </main>
  )
}
