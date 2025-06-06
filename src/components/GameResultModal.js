'use client'

import { useEffect } from 'react'

export default function GameResultModal({ visible, onClose, resultMessage, onRestart, onGoHome }) {
  if (!visible) return null

  const handleBackgroundClick = (e) => {
    if (e.target.id === 'modal-background') {
      onClose()
    }
  }

  return (
    <div
      id="modal-background"
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✖️
        </button>

        {/* Result message */}
        <h2 className="text-xl font-semibold text-center mb-4">{resultMessage}</h2>

        {/* Action buttons */}
        <div className="flex justify-around mt-6">
          <button
            onClick={onRestart}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            再玩一次
          </button>
          <button
            onClick={onGoHome}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            回到遊戲地圖
          </button>
        </div>
      </div>
    </div>
  )
}
