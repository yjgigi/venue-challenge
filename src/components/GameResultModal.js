'use client'

import { useEffect } from 'react';
import Image from 'next/image';
import successImg from '@/../public/success.png';
import failImg from '@/../public/fail.png';
import playAgainImg from '@/../public/playagain.png';
import backImg from '@/../public/back.png';

export default function GameResultModal({ visible, onClose, resultMessage, onRestart, resultType }) {
  if (!visible) return null

  let resultImage = null

  if (resultType === 'success') {
    resultImage = successImg
  } else if (resultType === 'fail') {
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
          <div
            onClick={onRestart}
            className= "relative w-40 cursor-pointer transition-transform hover:scale-105"
          >
            <Image src={playAgainImg} alt='playagain' />
            <div className="absolute inset-0 flex items-center justify-center text-black font-bold">再玩一次</div>
          </div>

          <div
            onClick={onRestart}
            className= "relative w-40 cursor-pointer transition-transform hover:scale-105"
          >
            <Image src={backImg} alt='back' />
            <div className="absolute inset-0 flex items-center justify-center text-black font-bold">回到遊戲地圖</div>
          </div>

        </div>
      </div>
    </div>
  )
}
