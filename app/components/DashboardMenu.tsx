"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../services/auth.services";

export default function DashboardMenu({ accountId }: { accountId: string }) {

  const router = useRouter();

  const handleClick = async () => {
    await logout()
    router.push("/login")
    router.refresh();
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
        <button onClick={handleClick}>Cerrar sesion</button>
      </nav>
    </div>
  )
}