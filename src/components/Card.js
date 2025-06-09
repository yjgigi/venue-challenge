import { motion } from 'framer-motion'
import Image from 'next/image'
import cardBg from '@/../public/card.png'
import cardBackImg from '@/../public/cardBack.png'

export default function Card({ card }) {
  if (!card) return null

  const isSpecial = card.type === 'special'
  const isBack = card.showBack
  const position = card.position // 'admin' or 'player'

  // 滑動距離
  const slideX = position === 'admin' ? -65 : position === 'player' ? 65 : 0

  return (
    <motion.div
      key={`${card.drawId}-${isBack ? 'back' : 'front'}`}
      initial={isBack ? { x: 0, opacity: 0 } : { x: slideX, opacity: 1 }}
      animate={isBack ? { x: slideX, opacity: 1, transition: { duration: 0.6 } } : { x: slideX, opacity: 1 }}
      className="relative w-[30vw] max-w-51 aspect-[5/7] perspective sm:w-[20vw] sm:max-w-[180px] md:w-[160px] md:h-[224px]"
    >
      <motion.div
        className="w-full h-full relative"
        animate={{
          rotateY: isBack ? 0 : 180,
          transition: { duration: 0.6, delay: 0.6 },
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 卡背 */}
        <div
          className="absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Image src={cardBackImg} alt="card back" fill />
        </div>

        {/* 正面 */}
        <div
          className="absolute w-full h-full backface-hidden"
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          <Image src={cardBg} alt="card front" fill />
          <div
            className={`absolute inset-0 flex items-center justify-center text-center 
              font-bold drop-shadow-md px-2 
              ${isSpecial ? 'text-xl sm:text-2xl text-red-700' : 'text-4xl sm:text-6xl text-[#816647]'}`}
          >
            {isSpecial ? card.name : card.value}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
