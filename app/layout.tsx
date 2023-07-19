import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ToasterContext from '@/app/context/toaster-context';


const inter = Inter({ subsets: [ 'latin' ] });

export const metadata = {
    title      : 'Messenger',
    description: 'Messenger',
};

export default function RootLayout ({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={ inter.className }>
                <ToasterContext/>
                { children }
            </body>
        </html>
    );
}
