"use client"

import { postDeposit } from '@/app/services/account.services';
import { DepositDataTypes, DepositTypes } from '@/app/types/deposit.types';
import { useRouter } from 'next/navigation';
import SubmitButton from '../SubmitButton';
import { toast } from 'sonner';
import { useState } from 'react';

export default function AccountDepositForm({ deposit, accountId, token }: { deposit: DepositTypes, accountId: string, token: string }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        try {

            const newDeposit = {
                "amount": deposit.amount,
                "dated": new Date(),
                "destination": deposit.destination,
                "origin": deposit.origin,
            }

            const newDepositResp: DepositDataTypes = await postDeposit(accountId, newDeposit, token)
            console.log("Nuevo depósito creado", newDepositResp)
            toast.success("Deposito realizado")
            router.push(`/dashboard/accounts/${accountId}/deposit/success?id=${newDepositResp.id}`)
            router.refresh();
        } catch (error: any) {
            toast.error(error.message)
        }
        finally {
            setIsLoading(false)
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <SubmitButton isLoading={isLoading} text={'Continuar'} />
        </form>
    )
}