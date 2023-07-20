import React from 'react';
import Sidebar from '@/app/components/sidebar/sidebar';
import ConversationList from '@/app/conversations/components/conversation-list';
import getConversations from '@/app/actions/get-conversations';


const Layout = async ({ children }: { children: React.ReactNode }) => {
    const conversations = await getConversations();
    return (
        <Sidebar>
            <div className={ 'h-full' }>
                <ConversationList
                    initialItems={ conversations }
                />
                { children }
            </div>
        </Sidebar>
    );
};

export default Layout;