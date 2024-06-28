import UserEditForm from '@/app/components/User/UserEditForm'
import { getCookies } from '@/app/services/getCookies.services';
import { getUserData } from '@/app/services/user.services'
import { cookies } from 'next/headers';

export default async function ProfileEdit() {

  const { token, accountId } = getCookies()
  const userId = cookies().get('userid')?.value ?? '';
  const userData = await getUserData(userId, token)

  return (
    <>
      <div className="w-full flex flex-col p-8 border border-gray-500">
        <h2>Edit profile</h2>
        <UserEditForm userData={userData} userId={userId} token={token} />
      </div>

    </>
  )
}
