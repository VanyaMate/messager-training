'use client';

import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/app/components/ui/inputs/input';
import Button from '@/app/components/ui/buttons/button';
import AuthSocialButton from '@/app/(site)/components/auth-social-button';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const session                     = useSession();
    const router                      = useRouter();
    const [ variant, setVariant ]     = useState<Variant>('LOGIN');
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const toggleVariant               = useCallback(() => {
        setVariant((prev) => prev === 'LOGIN' ? 'REGISTER' : 'LOGIN');
    }, [ variant ]);
    const {
              register,
              handleSubmit,
              formState: {
                  errors,
              },
          }                           = useForm<FieldValues>({
        defaultValues: {
            name    : '',
            email   : '',
            password: '',
        },
    });

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users');
        }
    }, [ session?.status, router ]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        toast.dismiss('RegError');

        if (variant === 'REGISTER') {
            toast.loading('Registration', {
                id      : 'Registration',
                position: 'bottom-right',
            });
            axios.post('/api/register', data)
                .then(() => toast.success('Welcome!', {
                    position: 'bottom-right',
                    duration: 2000,
                }))
                .then(() => signIn('credentials', data))
                .catch(() => toast.error('Registration Error!', {
                    position: 'bottom-right',
                    id      : 'RegError',
                }))
                .finally(() => setIsLoading(false))
                .finally(() => toast.dismiss('Registration'));
        } else if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false,
            })
                .then((response) => {
                    if (response?.error) {
                        toast.error('Invalid credentials', {
                            position: 'bottom-right',
                        });
                    }
                    if (response?.ok && !response?.error) {
                        toast.success('Welcome', {
                            duration: 2000,
                            position: 'bottom-right',
                        });
                        router.push('/users');
                    }
                })
                .finally(() => setIsLoading(false));
        }
    };
    const socialAction                         = (action: string) => {
        setIsLoading(true);

        signIn(action, { redirect: false })
            .then((response) => {
                if (response?.error) {
                    toast.error('Invalid credentials', {
                        position: 'bottom-right',
                    });
                }
                if (response?.ok && !response?.error) {
                    toast.success('Welcome', {
                        duration: 2000,
                        position: 'bottom-right',
                    });
                }
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <div
            className="
                mt-8
                sm:mx-auto
                sm:w-full
                sm:max-w-md
            "
        >
            <div
                className="
                    bg-white
                    px-4
                    py-8
                    shadow
                    rounded-lg
                    sm:px-10
                    mx-4
                "
            >
                <form
                    className="
                        space-y-6
                    "
                    onSubmit={ handleSubmit(onSubmit) }
                >
                    {
                        variant === 'REGISTER' && (
                            <Input
                                id={ 'name' }
                                label={ 'Name' }
                                register={ register }
                                errors={ errors }
                                disabled={ isLoading }
                            />
                        )
                    }
                    <Input
                        id={ 'email' }
                        label={ 'Email address' }
                        type={ 'email' }
                        register={ register }
                        errors={ errors }
                        disabled={ isLoading }
                    />
                    <Input
                        id={ 'password' }
                        label={ 'Password' }
                        type={ 'password' }
                        register={ register }
                        errors={ errors }
                        disabled={ isLoading }
                    />
                    <div>
                        <Button
                            disabled={ isLoading }
                            fullWidth
                            type={ 'submit' }
                        >
                            {
                                variant === 'LOGIN' ? 'Sign In'
                                                    : 'Register'
                            }
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div
                                className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2 justify-center">
                        <AuthSocialButton
                            icon={ BsGithub }
                            onClick={ () => socialAction('github') }
                        />
                        <AuthSocialButton
                            icon={ BsGoogle }
                            onClick={ () => socialAction('google') }
                        />
                    </div>
                </div>

                <div
                    className="
                        flex
                        gap-2
                        justify-center
                        text-sm
                        mt-6
                        px-2
                        text-gray-500
                    "
                >
                    <div>
                        { variant === 'LOGIN' ? 'New to messenger?'
                                              : 'Already have an account?' }
                    </div>
                    <div
                        onClick={ toggleVariant }
                        className="underline cursor-pointer"
                    >
                        { variant === 'LOGIN' ? 'Create account'
                                              : 'Login' }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;