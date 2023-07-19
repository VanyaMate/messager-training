import Image from 'next/image';
import AuthForm from '@/app/(site)/components/auth-form';


const Page = () => {
    return (
        <div
            className="
                flex
                flex-col
                justify-center
                py-16
                sm:px-6
                lg:px-8
                min-h-full
                bg-gray-100
            "
        >
            <div
                className="
                    sm:mx-auto
                    sm:w-full
                    sm:max-w-md
                "
            >
                <Image
                    src={ '/images/messenger-logo.png' }
                    alt={ 'logo' }
                    width={48}
                    height={48}
                    className="
                        mx-auto
                    "
                />
                <h2
                    className="
                        mt-6
                        text-center
                        text-3xl
                        font-bold
                        tracking-tight
                        text-gray-900
                    "
                >
                    Sign in to your account
                </h2>
                <AuthForm/>
            </div>
        </div>
    );
};

export default Page;