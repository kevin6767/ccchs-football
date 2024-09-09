import { Navbar } from "../component/navbar/navbar";
import styles from '../page.module.css'
export default function DashboardLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <div className={styles.page}>
        {/* Include shared UI here e.g. a header or sidebar */}
        <Navbar />
   
        {children}
      </div>
    )
  }