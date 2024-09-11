import './globals.css'

export const metadata = {
    title: 'Cheatham County Central Cubs Dashboard',
    description: 'Dashboard for Cheatham Country Central Cubs',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
