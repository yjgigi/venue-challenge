'use client'

import { useEffect } from 'react';
import Image from 'next/image';
import successImg from '@/../public/success.png';
import failImg from '@/../public/fail.png';

export default function GameResultModal({ visible, onClose, resultMessage, onRestart }) {
  if (!visible) return null

  let resultImage = null

  if (resultMessage.includes('勝利')) {
    resultImage = successImg
  } else if (resultMessage.includes('失敗')) {
    resultImage = failImg
  }


  const handleBackgroundClick = (e) => {
    if (e.target.id === 'modal-background') {
      onClose()
    }
  }

  return (
    <div
      id="modal-background"
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black/50 flex justify-center items-center"
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black hover: cursor-pointer"
        >
          ✖
        </button>


        {/* Result message */}
        <div className="text-xl text-black font-semibold text-center mb-4">
          {resultImage && (
            <Image
              src={resultImage}
              alt="Result Image"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
          )}
          {resultMessage}
        </div>

        {/* Action buttons */}
        <div className="flex justify-around mt-6">
          <button
            onClick={onRestart}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            再玩一次
          </button>
          <button
            onClick={() => (window.location.href = 'https://web1132-group1.vercel.app/map')}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            回到遊戲地圖
          </button>
        </div>
      </div>
    </div>
  )
}
