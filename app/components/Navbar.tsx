"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../services/auth.services";

export default function Navbar({ username }: { username: string | undefined }) {

  const router = useRouter();

  const handleClick = async () => {
    await logout()
    router.push("/login")
    router.refresh();
  }

  return (
    <header className="bg-gray-600 w-full p-6">
      <nav className="w-full flex justify-between items-center">
        <Link className="btn" href="/">Home</Link>
        <Link className="btn" href="/dashboard">Dashboard</Link>
        {username ?
          <button onClick={handleClick}>{username}</button>
          :
          <Link className="btn" href="/login">Login</Link>
        }
      </nav>
    </header>
  )
}
