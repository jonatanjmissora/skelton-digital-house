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

  const [selectedCard, setSelectedCard] = useState<string>("")

  useEffect(() => {
    console.log({ selectedCard })

  }, [selectedCard])

  return (
    <>
      <span>selectedCard: {selectedCard}</span>
      {cardsData.map(card => <CardRow key={card.id} card={card} setSelectedCard={setSelectedCard} />)}
    </>
  )
}


const CardRow = ({ card, setSelectedCard }: { card: CardsDataTypes }) => {
  /*const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cardId = e.currentTarget.id
    /*
    const params = new URLSearchParams(searchParams.toString())
    params.set("id", cardId)
    router.replace(`${pathname}?${params.toString()}`)
    */
    setSelectedCard(cardId)
  }

  return (
    <div className='flex justify-between items-center hover:bg-white'>
      <label className="flex gap-8 flex-1" htmlFor={card.id.toString()}>
        <span>terminada en {getLast4(card.number_id)}</span>
        <span>id: {card.id}</span>
      </label>
      <input onChange={handleChange} type="radio" id={card.id.toString()} name="card" />
    </div>
  )
}