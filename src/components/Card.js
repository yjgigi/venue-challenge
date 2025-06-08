import Image from 'next/image'
import cardBg from '@/../public/card.png'

export default function Card({ card }) {

  if (!card) return null;

  const isSpecial = card.type === 'special'


  return (
    <div className="relative w-51 h-70.5">
      {/* 背景圖片 */}
      <Image
        src={cardBg}
        alt="card background"
        fill
        className="shadow-md"
        priority
      />

      {/* 數字或卡片文字 */}
      <div
        className={`absolute inset-0 flex items-center justify-center text-center 
          font-bold drop-shadow-md px-2 
          ${isSpecial ? 'text-2xl text-red-700' : 'text-9xl text-[#816647]'}
        `}
      >
        {isSpecial ? card.name : card.value}
      </div>
    </div>
  )
}
