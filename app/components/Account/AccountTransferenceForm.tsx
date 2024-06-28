"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { postTransference } from '../../services/account.services';


export default function AccountTransferenceForm({ accountId, accountCVU, token }: { accountId: string, accountCVU: string, token: string }) {
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const newTransference = {
            "amount": parseInt(event.currentTarget.amount.value, 10),
            "dated": new Date(),
            "destination": event.currentTarget.destination.value,
            "origin": event.currentTarget.origin.value.toString(),
        }
        const newTransferenceResp = await postTransference(accountId, newTransference, token)
        console.log("Nueva transferencia realizada", newTransferenceResp)
        router.push(`/dashboard/accounts/${accountId}/activity`)
        router.refresh();
    }

    return (
        <form className='flex flex-col gap-4 w-max py-8' onSubmit={handleSubmit}>
            <div className='flex gap-4 items-center'>
                <label htmlFor="monto">monto: </label>
                <input className='border border-gray-500 p-2 text-center' type="text" id='monto' required name="amount" defaultValue={-1000} />
            </div>
            <div className='flex gap-4 items-center'>
                <label htmlFor="origen">origen: </label>
                <input className='border border-gray-500 p-2 text-center bg-gray-300' type="text" id='origen' readOnly name="origin" value={accountCVU} />
            </div>
            <div className='flex gap-4 items-center'>
                <label htmlFor="destino">destino: </label>
                <input className='border border-gray-500 p-2 text-center' type="text" id='destino' required name="destination" defaultValue={"Albana"} />
            </div>
            <div className='flex gap-4 mt-4'>
                <button type='submit' className='btn'>Realizar transferencia</button>
                <Link href={`/dashboard`} className='btn'>Cancelar</Link>
            </div>
        </form>
    )
}