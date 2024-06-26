import AccountData from '@/app/components/Account/AccountData';
import { getAccountData } from '@/app/services/account.services';
import { getCookies } from '@/app/services/getCookies.services';
import { getUserData } from '@/app/services/user.services';
import { AccountDataTypes } from '@/app/types/account.types';
import { UserDataTypes } from '@/app/types/user.types';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function ProfilePage() {

  const { token, accountId } = getCookies()
  const userId = cookies().get('userid')?.value ?? '';
  const accountDataPromise: Promise<AccountDataTypes> = await getAccountData(token)
  const userDataPromise: Promise<UserDataTypes> = await getUserData(userId, token)
  const [accountData, userData] = await Promise.all([accountDataPromise, userDataPromise])
  if (!accountData || !userData) return <>No hay datos</>

  return (
    <>
      <div className="card">
        <ProfileRow rowKey="Email:" rowValue={userData.email} />
        <ProfileRow rowKey="Nombre:" rowValue={`${userData.firstname}, ${userData.lastname}`} />
        <ProfileRow rowKey="DNI:" rowValue={userData.dni.toString()} />
        <ProfileRow rowKey="Telefono:" rowValue={userData.phone} />

      </div>
      <div className="card"><Link href={`/dashboard/accounts/${accountData.id}/cards`}>Medios de pago</Link></div>
      <AccountData accountData={accountData} />
    </>
  )
}

const ProfileRow = ({ rowKey, rowValue }: { rowKey: string, rowValue: string }) => {
  return (
    <div className='flex justify-between'>
      <div className='flex gap-2'>
        <span>{rowKey}</span>
        <span>{rowValue}</span>
      </div>
      <Link href="/dashboard/profile/edit">editar</Link>
    </div>
  )
}
