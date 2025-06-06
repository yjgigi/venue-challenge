export default function Card({ card }) {


    return (
      <div className="w-32 h-48 bg-white rounded-xl shadow-md flex items-center justify-center text-2xl text-center p-2">
        {card
          ? card.type === 'number'
            ? card.value
            : card.name
          : '？'}
      </div>
    )
  }
  