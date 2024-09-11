import Image from 'next/image'
import styles from './page.module.css'
import { RosterActions } from './components/roster-add-or-update/roster-add-or-update'
import Link from 'next/link'
import { Navbar } from './components/navbar/navbar'

export default function Home() {
    return (
        <div className={styles.page}>
            <Navbar />
        </div>
    )
}
