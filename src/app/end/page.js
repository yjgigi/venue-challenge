// 'use client'
// import { useSearchParams, useRouter } from 'next/navigation'

// export default function EndPage() {
//   const searchParams = useSearchParams()
//   const result = searchParams.get('result')
//   const router = useRouter()

//   const message =
//     result === 'win' ? '🎉 恭喜你成功說服管理員借用！' : '😢 管理員拒絕了你的請求...'

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-100 p-4">
//       <h1 className="text-3xl font-bold mb-4">遊戲結束</h1>
//       <p className="text-xl mb-6">{message}</p>
//       <button
//         onClick={() => router.push('/game')}
//         className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         再玩一次
//       </button>
//     </div>
//   )
// }
