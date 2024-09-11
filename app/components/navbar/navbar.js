import Link from "next/link"
import './styles/style.css'

export const NAV_LINKS = {
    dashboard: '/dashboard',
    home: '/',
    attendance: '/attendance'
}


export const Navbar = () => {
   return (<header className="navbar-container">
        <div className="home-link">
            <Link href={NAV_LINKS.home}>Home</Link>
        </div>
        <div className="nav-links">
            <Link href={NAV_LINKS.dashboard}>Dashboard</Link>
            <Link href="_blank">Schedule</Link>
            <Link href={NAV_LINKS.attendance}>Attendance</Link>
            <Link href="_blank">Login</Link>
        </div>
    </header>)
}