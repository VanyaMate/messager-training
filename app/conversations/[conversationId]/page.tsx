import React from 'react';
import getConversationById from '@/app/actions/get-conversation-by-id';
import getMessages from '@/app/actions/get-messages';
import EmptyState from '@/app/components/empty-state';
import Header from '@/app/conversations/[conversationId]/components/header';
import Body from '@/app/conversations/[conversationId]/components/body';
import Form from '@/app/conversations/[conversationId]/components/form';


interface IParams {
    conversationId: string;
}

const ConversationIdPage = async ({ params }: { params: IParams }) => {
    const conversation = await getConversationById(params.conversationId);
    const messages     = await getMessages(params.conversationId);

    if (!conversation) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState/>
                </div>
            </div>
        );
    }

    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <Header conversation={ conversation }/>
                <Body initialMessages={messages}/>
                <Form/>
            </div>
        </div>
    );
};

export default ConversationIdPage;