"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCard } from "../../services/card.services";

type CardDeleteFormTypes = {
    actualCardId: string;
    accountId: string;
    token: string;
}

export default function CardDeleteForm({ actualCardId, accountId, token }: CardDeleteFormTypes) {

    const router = useRouter()

    const handleDelete = async () => {
        try {

            await deleteCard(actualCardId, accountId, token)
            router.push(`/dashboard/accounts/${accountId}/cards`)
            router.refresh();
        }
        catch (error) {
            if (error instanceof Error)
                console.log(error.message)
        }
    }

    return (
        <div className="card">
            <p>¿Quiere eliminar la siguiente tarjeta?</p>
            <div className='flex gap-4 mt-4'>
                <button onClick={handleDelete} className='btn'>Eliminar</button>
                <Link className='btn' href={`/dashboard/accounts/${accountId}/cards`}>Cancelar</Link>
            </div>
        </div>
    )
}
