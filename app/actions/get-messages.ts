import prisma from '@/app/libs/prisma.db';
import conversationBox from '@/app/conversations/components/conversation-box';


const getMessages = async (
    conversationId: string,
) => {
    try {
        const messages = await prisma.message.findMany(({
            where  : {
                conversationId,
            },
            include: {
                sender: true,
                seen  : true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        }));

        return messages;
    } catch (e: any) {
        return [];
    }
};

export default getMessages;