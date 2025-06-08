'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import coverImg from '@/../public/frontCover.png';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();



  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center text-white p-4 bg-cover bg-center"
        style={{
          backgroundImage: `url(${coverImg.src})`
        }}
      >
        <div className=" bg-amber-200/40 p-8 rounded-xl text-center">
          <div className="text-5xl font-bold mb-6">場地借用挑戰賽</div>

          {/* 兩個按鈕 */}
          <div className="flex gap-4 justify-center">
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
        </div>

        {/* 說明彈窗 */}
        {showModal && (
          <div
            className="absolute bg-black/60 bg-opacity-50 flex items-center justify-center inset-0"
            onClick={() => setShowModal(false)}
          >
            <div
              className="relative bg-white rounded-xl shadow-lg w-[30%] p-6 space-y-4 text-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 關閉按鈕 */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
              >
                ✖
              </button>

              <div className="text-2xl font-bold">遊戲說明</div>
              <div className="text-left list-disc list-inside space-y-1 text-sm">
                抽一張牌和管理員比大小，先贏 3 次者勝出，抽到特殊卡則依照
                
                平手則重抽一回合
              </div>
              <div className="font-semibold mt-2 text-xl">特殊卡介紹</div>
              <div className="text-sm list-disc list-inside text-gray-700">
                說服成功：玩家直接勝利
                <br/>
                拒絕處理：管理員直接勝利
                <br/>
                借用單出錯：該回合重抽
                <br/>
                失敗一次：玩家失敗次數 +1
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
