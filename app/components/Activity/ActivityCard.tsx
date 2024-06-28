import { ActivityDataTypes } from '../../types/account.types'
import Link from 'next/link'

export default async function ActivityCard({ activities }: { activities: ActivityDataTypes[] }) {
  return (
    <div>
      <h2>Tu actividad</h2>
      <div className='py-2'>
        {activities.length === 0 && <span>No hay actividad</span>}
        {activities.length !== 0 &&
          activities.map(activity =>
            <ActivityRow key={activity.id} activity={activity} />
          )
        }
      </div>
    </div>
  )
}

const ActivityRow = ({ activity }: { activity: ActivityDataTypes }) => {

  return (
    <Link href={`dashboard/accounts/${activity.account_id}/activity/${activity.id}`} className="w-full flex justify-between py-4 hover:bg-white">
      <span className='w-[20%]'>{activity.description}</span>
      <span>{activity.type}</span>
      <span>{activity.dated.substring(0, 10)}</span>
      <span>{activity.amount}</span>
    </Link>
  )
}