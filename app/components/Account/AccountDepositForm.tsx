"use client"

import { postDeposit } from '@/app/services/account.services';
import { DepositDataTypes, DepositTypes } from '@/app/types/deposit.types';
import { useRouter } from 'next/navigation';

export default function AccountDepositForm({ deposit, accountId, token }: { deposit: DepositTypes, accountId: string, token: string }) {
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const newDeposit = {
            "amount": deposit.amount,
            "dated": new Date(),
            "destination": deposit.destination,
            "origin": deposit.origin,
        }

        const newDepositResp: DepositDataTypes = await postDeposit(accountId, newDeposit, token)
        console.log("Nuevo depósito creado", newDepositResp)
        router.push(`/dashboard/accounts/${accountId}/deposit/success?id=${newDepositResp.id}`)
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type='submit' className='btn'>Continuar</button>
        </form>
    )
}