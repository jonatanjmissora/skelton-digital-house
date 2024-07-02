"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { postCard } from '../../services/card.services';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useState } from 'react';
import SVGSpinner from '../SVG/SVGSpinner';
import { toast } from 'sonner';
import SubmitButton from '../SubmitButton';

type CardDataType = {
    number: string;
    name: string;
    expiry: string;
    cvc: string;
    focus: string;
}

const initialState = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
}

export default function CardNewForm({ accountId, token }: { accountId: string, token: string }) {
    const router = useRouter()

    const [cardData, setCardData] = useState<CardDataType>(initialState);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    //const [serverError, setServerError] = useState<string>("")
    const { number, name, expiry, cvc, focus } = cardData

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardData({
            ...cardData,
            [e.target.name]: e.target.value
        })
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setCardData({
            ...cardData,
            focus: e.target.name
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        setIsLoading(true)
        const formData = new FormData(form)

        const newCard = {
            cod: Number(formData.get("cvc")),
            expiration_date: formData.get("expiry"),
            first_last_name: formData.get("name"),
            number_id: Number(formData.get("number")),
        }
        try {
            const { data, error } = await postCard(accountId, newCard, token)
            if (error) throw new Error(error)
            console.log("Nueva tarjeta creada", data)
            toast.success("Tarjeta adherida correctamente")
            form.reset()
            router.push(`/dashboard/accounts/${accountId}/cards`)
            router.refresh();

        } catch (error) {
            if (error instanceof Error) {
                //setServerError(error.message)
                toast.error(error.message)
            }
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <article className='flex gap-40'>
            <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
                <div className='flex gap-2 items-center my-4'>
                    <label htmlFor="number">Numero de tarjeta</label>
                    <input className='border border-gray-500 p-2 text-center'
                        type="text"
                        id="number"
                        value={number}
                        name="number"
                        onChange={handleChange}
                        onFocus={handleFocus}
                        required
                    />
                </div>

                <div className='flex gap-2 items-center my-4'>
                    <label htmlFor="name">Nombre del titular</label>
                    <input className='border border-gray-500 p-2 text-center'
                        type="text"
                        id="name"
                        value={name}
                        name="name"
                        onChange={handleChange}
                        onFocus={handleFocus}
                        required
                    />
                </div>

                <div className='flex gap-4'>
                    <div className='flex gap-2 items-center my-4'>
                        <label htmlFor="expiry">Fecha</label>
                        <input className='border border-gray-500 p-2 text-center w-[10ch]'
                            type="text"
                            id="expiry"
                            value={expiry}
                            name="expiry"
                            onChange={handleChange}
                            onFocus={handleFocus}
                            required
                        />
                    </div>

                    <div className='flex gap-2 items-center my-4'>
                        <label htmlFor="cvc">Código</label>
                        <input className='border border-gray-500 p-2 text-center w-[6ch]'
                            type="text"
                            id="cvc"
                            value={cvc}
                            name="cvc"
                            onChange={handleChange}
                            onFocus={handleFocus}
                            required
                        />
                    </div>
                </div>

                <div className='flex justify-between gap-4 w-full mt-4'>
                    <SubmitButton isLoading={isLoading} text={'Agregar tarjeta'} />
                    <Link href={`/dashboard/accounts/${accountId}/cards`} className='btn'>Cancelar</Link>
                </div>
                {/*serverError && <span>{serverError}</span>*/}
            </form>

            <div>
                <Cards
                    cvc={cvc}
                    expiry={expiry}
                    name={name}
                    number={number}
                    focused={focus as any}
                />
            </div>
        </article>

    )
}
