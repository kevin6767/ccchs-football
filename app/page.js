import Image from 'next/image'
import styles from './page.module.css'
import { RosterActions } from './component/roster-actions'

export default function Home() {
    return (
        <div className={styles.page}>
            <RosterActions />
        </div>
    )
}
