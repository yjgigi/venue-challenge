'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import coverImg from '@/../public/frontCover.png';
import Image from 'next/image';
import windowImg from '@/../public/window.png';
import startImg from '@/../public/start.png';
import introImg from '@/../public/intro.png';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();



  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center text-black p-4 bg-cover bg-center"
        style={{
          backgroundImage: `url(${coverImg.src})`
        }}
      >
        <div className="p-25 bg-contain bg-no-repeat bg-center text-center"
          style={{
            backgroundImage: `url(${windowImg.src})`
          }}
        >
          <div className="text-5xl font-bold mb-16">場地借用挑戰賽</div>

          {/* 兩個按鈕 */}
          <div className="flex gap-4 justify-center">
            <div
              onClick={() => router.push('/game')}
              className= "relative w-40 cursor-pointer transition-transform hover:scale-105"
            >
              <Image src={startImg} alt='start' />
              <div className="absolute inset-0 flex items-center justify-center text-black font-bold">開始遊戲</div>
            </div>
            <div
              onClick={() => setShowModal(true)}
              className= "relative w-40 cursor-pointer transition-transform hover:scale-105"
            >
              <Image src={introImg} alt='intro' />
              <div className="absolute inset-0 flex items-center justify-center text-black font-bold">遊戲說明</div>
            </div>
          </div>
        </div>

        {/* 說明彈窗 */}
        {showModal && (
          <div
            className="absolute bg-black/60 bg-opacity-50 flex items-center justify-center inset-0"
            onClick={() => setShowModal(false)}
          >
            <div
              className="relative bg-white rounded-xl shadow-lg w-[33%] p-6 space-y-4 text-gray-800 min-w-[240px]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 關閉按鈕 */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
              >
                ✖
              </button>

              <div className="text-2xl font-bold">遊戲說明</div>
              <div className="text-left list-disc list-inside space-y-1 text-[16px]">
                抽牌和管理員比大小，數字大的贏得一回合，累積 3 次就能獲得最終勝利
                <br/>
                抽到特殊卡依照卡牌上文字判定結果，平手則該回合不算，重抽一次
              </div>
              <div className="font-bold mt-8 text-2xl">特殊卡介紹</div>
              <div className="text-sm list-disc list-inside text-[16px]">
                說服成功：玩家直接勝利
                <br/>
                拒絕處理：管理員直接勝利
                <br/>
                借用單出錯：該回合重抽
                <br/>
                玩家失敗一次：玩家累積失敗次數 +1
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
