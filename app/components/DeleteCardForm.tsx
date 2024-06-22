"use client"

import Link from "next/link";
import { deleteCard } from "../services/account.services";
import { useRouter } from "next/navigation";

type DeleteCardFormTypes = {
    actualCardId: string;
    accountId: string;
    token: string;
}

export default function DeleteCardForm({actualCardId, accountId, token}: DeleteCardFormTypes) {
 
    const router = useRouter()

    const handleDelete = async() => {
        try {

            await deleteCard(actualCardId, accountId, token)
            router.push(`/dashboard/accounts/${accountId}/cards`)
            router.refresh();
        }
        catch(error) {
            if(error instanceof Error)
            console.log(error.message)
        }
    }
  
    return (
    <div className="w-full flex flex-col p-8 border border-gray-500">
    <p>¿Quiere eliminar la siguiente tarjeta?</p>
    <div className='flex gap-4 mt-4'>
      <button onClick={handleDelete}  className='btn'>Eliminar</button>
      <Link className='btn' href={`/dashboard/accounts/${accountId}/cards`}>Cancelar</Link>
    </div>
  </div>
  )
}
