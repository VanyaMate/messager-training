'use client';

import React from 'react';
import clsx from 'clsx';
import useConversation from '@/app/hooks/use-conversation.hook';
import EmptyState from '@/app/components/empty-state';


const Conversations = () => {
    const { isOpen } = useConversation();
    return (
        <div
            className={ clsx(
                `
                    lg:pl-80 h-full lg:block
                `,
                isOpen ? 'block' : 'hidden',
            ) }
        >
            <EmptyState/>
        </div>
    );
};

export default Conversations;