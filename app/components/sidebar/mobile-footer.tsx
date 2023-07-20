'use client';

import React from 'react';
import useRoutes from '@/app/hooks/use-routes.hook';
import useConversation from '@/app/hooks/use-conversation.hook';
import MobileItem from '@/app/components/sidebar/mobile-item';


const MobileFooter = () => {
    const routes     = useRoutes();
    const { isOpen } = useConversation();

    if (isOpen) {
        return null;
    }

    return (
        <div
            className="
               fixed
               justify-between
               w-full
               bottom-0
               z-40
               flex
               items-center
               bg-white
               border-t-[1px]
               lg:hidden
            "
        >
            {
                routes.map((route) => {
                    return <MobileItem
                        key={ route.href }
                        href={ route.href }
                        active={ route.active }
                        icon={ route.icon }
                        onClick={ route.onClick }
                    />;
                })
            }
        </div>
    );
};

export default MobileFooter;