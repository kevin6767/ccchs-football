import Image from 'next/image'
import styles from './page.module.css'
import { RosterActions } from './component/roster-add/roster-add'
import Link from 'next/link'
import { Navbar } from './component/navbar/navbar'

export default function Home() {
    return (
        <div className={styles.page}>
            <Navbar />
        </div>
    )
}
