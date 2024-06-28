"use client"

import { CardsDataTypes } from "@/app/types/card.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const getLast4 = (num: number) => {
  const numberStr = num.toString()
  return numberStr.substr(-4);
}

export default function CardSelect({ cardsData }: { cardsData: CardsDataTypes[] }) {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [selectedCard, setSelectedCard] = useState<number>(cardsData[0].number_id)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("cardnum", selectedCard.toString())
    router.replace(`${pathname}?${params.toString()}`)
  }, [])

  return (
    <>
      {cardsData.map(card => <CardRow key={card.id} card={card} selectedCard={selectedCard} setSelectedCard={setSelectedCard} />)}
    </>
  )
}


const CardRow = ({ card, 
  selectedCard, 
  setSelectedCard }: 
  { card: CardsDataTypes, 
    selectedCard: number, 
    setSelectedCard: React.Dispatch<React.SetStateAction<number>> 
  }) => {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cardnum = e.currentTarget.id
    console.log(cardnum)
    
    const params = new URLSearchParams(searchParams.toString())
    params.set("cardnum", cardnum)
    router.replace(`${pathname}?${params.toString()}`)
    
    setSelectedCard(+cardnum)
  }

  return (
    <div className='flex justify-between items-center hover:bg-white'>
      <label className="flex gap-8 flex-1" htmlFor={card.number_id.toString()}>
        <span>terminada en {getLast4(card.number_id)}</span>
        <span>id: {card.number_id}</span>
      </label>
      <input onChange={handleChange} type="radio" id={card.number_id.toString()} name="card" checked={selectedCard == card.number_id}/>
    </div>
  )
}