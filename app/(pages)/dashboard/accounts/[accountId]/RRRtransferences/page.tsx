import AccountTransferenceForm from '@/app/components/Account/AccountTransferenceForm';
import { getAccountData } from '@/app/services/account.services';
import { getCookies } from '@/app/services/getCookies.services';
import { AccountDataTypes } from '@/app/types/account.types';

export default async function TransferencesPage() {

  const { token, accountId } = getCookies()
  const accountData: AccountDataTypes = await getAccountData(token)

  return (
    <div className="card">
      <div>Nueva transferencia</div>
      <AccountTransferenceForm accountId={accountId} accountCVU={accountData.cvu} token={token} />
    </div>
  )
}
