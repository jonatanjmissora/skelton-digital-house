"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../services/auth.services";

export default function DashboardMenu() {

  const router = useRouter();

  const handleClick = async () => {
    await logout()
    router.push("/login")
    router.refresh();
  }

  return (
    <div className="bg-gray-600 h-full w-[15%] flex justify-center py-12">
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard">Inicio</Link>
        <Link href="/dashboard/activity">Actividad</Link>
        <Link href="/dashboard/profile">Tu perfil</Link>
        <Link href="/dashboard/transfer">Cargar dinero</Link>
        <Link href="/dashboard/services">Pagar servicios</Link>
        <Link href="/dashboard/cards">Tarjetas</Link>
        <button onClick={handleClick}>Cerrar sesion</button>
      </nav>
    </div>
  )
}