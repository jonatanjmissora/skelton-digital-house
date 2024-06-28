import AccountEditForm from '@/app/components/Account/AccountEditForm';
import { getAccountData } from '@/app/services/account.services';
import { getCookies } from '@/app/services/getCookies.services';

export default async function AccountPage() {

  const { token, accountId } = getCookies()
  const accountData = await getAccountData(token)

  return (
    <>
      <div className="w-full flex flex-col p-8 border border-gray-500">
        <h2>Edit account</h2>
        <AccountEditForm accountData={accountData} token={token} />
      </div>

    </>
  )
}


