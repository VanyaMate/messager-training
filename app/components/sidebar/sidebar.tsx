import React from 'react';
import DesktopSidebar from '@/app/components/sidebar/desktop-sidebar';
import MobileFooter from '@/app/components/sidebar/mobile-footer';
import { getCurrentUser } from '@/app/actions/get-current-user';


const Sidebar = async ({ children }: { children: React.ReactNode }) => {
    const currentUser = await getCurrentUser()
    return (
        <div className={'h-full'}>
            <DesktopSidebar currentUser={currentUser!}/>
            <MobileFooter/>
            <main className='
                lg:pl-20 h-full
            '>
                {children}
            </main>
        </div>
    );
};

export default Sidebar;