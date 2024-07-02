"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCard } from "../../services/card.services";
import { useState } from "react";
import { toast } from 'sonner';
import SubmitButton from "../SubmitButton";

type CardDeleteFormTypes = {
    actualCardId: string;
    accountId: string;
    token: string;
}

export default function CardDeleteForm({ actualCardId, accountId, token }: CardDeleteFormTypes) {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleDelete = async () => {
        setIsLoading(true)
        try {
            await deleteCard(actualCardId, accountId, token)
            router.push(`/dashboard/accounts/${accountId}/cards`)
            router.refresh();
            toast.success("Tarjeta eliminada")
        }
        catch (error) {
            if (error instanceof Error)
                console.log(error.message)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="card">
            <p>¿Quiere eliminar la siguiente tarjeta?</p>
            <div className='flex gap-4 mt-4'>
                <div onClick={handleDelete}>
                    <SubmitButton isLoading={isLoading} text={"Eliminar"} />
                </div>
                <Link className='btn' href={`/dashboard/accounts/${accountId}/cards`}>Cancelar</Link>
            </div>
        </div>
    )
}
