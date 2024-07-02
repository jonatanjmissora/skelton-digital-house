"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../services/auth.services";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardMenu({ accountId }: { accountId: string }) {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {

      await logout()
      router.push("/login")
      router.refresh();
    } catch (error: any) {
      toast.error(error.message)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-600 h-full min-w-[15%] flex justify-center py-12">
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard">Inicio</Link>
        <Link href={`/dashboard/accounts/${accountId}/activity?page=1`}>Actividad</Link>
        <Link href="/dashboard/profile">Tu perfil</Link>
        <Link href={`/dashboard/accounts/${accountId}/deposit`}>Cargar dinero</Link>
        <Link href="/dashboard/services">Pagar servicios</Link>
        <Link href={`/dashboard/accounts/${accountId}/cards`}>Tarjetas</Link>
        <div onClick={handleClick}>
          <SubmitButton isLoading={isLoading} text={"Cerrar sesion"} />
        </div>
      </nav>
    </div>
  )
}