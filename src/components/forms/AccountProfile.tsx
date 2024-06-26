"use client"
import * as z from 'zod'
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "../ui/form";
import { zodResolver } from '@hookform/resolvers/zod'
import { userValidation } from "@/lib/validations/user";
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing'
import { updateUser } from '@/lib/actions/users.actions';
import { usePathname, useRouter } from 'next/navigation';


interface Props {
    user: {
        id: any;
        objectId: any;
        username: any | null;
        name: any;
        bio: any;
        image: any;
    };
    btnTitle: any;
}

const AccountProfile = ({ user, btnTitle }: Props) => {

    const pathname = usePathname()
    const router = useRouter()

    const [files, setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing("media")

    const form = useForm({
        resolver: zodResolver(userValidation),
        defaultValues: {
            profile_photo: user?.image || '',
            username: user?.username || '',
            name: user?.name || '',
            bio: user?.bio || ''
        }
    })

    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    };

    const onSubmit = async (values: z.infer<typeof userValidation>) => {
        const blob = values.profile_photo;
        const hasImageChanged = isBase64Image(blob);
        if (hasImageChanged) {
            const imgRes = await startUpload(files);
            if (imgRes && imgRes[0].url) {
                values.profile_photo = imgRes[0].url;
            }
        }
        await updateUser(
            user.id,
            values.username,
            values.name,
            values.bio,
            values.profile_photo,
            pathname
        );
        if (pathname === '/profile/edit') {
            router.back()
        } else {
            router.push('/')
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-4'>
                            <FormLabel className='account-form_image-label'>
                                {
                                    field?.value ? (<Image src={field?.value} alt='profile_photo' width={96} height={96} priority className='rounded-full object-contain' />)
                                        : (<Image src="/assets/profile.svg" alt='profile_photo' width={24} height={24} className='object-contain' />)
                                }
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'  >
                                <Input type='file' accept='image/*' placeholder='Upload a photo' className='account-form_image-input' onChange={(e) => handleImage(e, field.onChange)} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className='flex items-start flex-col gap-4 '>
                            <FormLabel className='text-base-semibold text-gray-200'>
                                Name
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'  >
                                <Input type='text' placeholder='Your name' className='account-form_input no-focus' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className='flex flex-col items-start gap-4'>
                            <FormLabel className='text-base-semibold text-gray-200'>
                                Username
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'  >
                                <Input type='text' placeholder='username' className='account-form_input no-focus' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className='flex flex-col items-start gap-3 w-full'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Bio
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200 w-full'  >
                                <textarea rows={10} placeholder='Your bio' className='account-form_input no-focus' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className='bg-primary-500 hover:bg-gray-400'>Submit</Button>
            </form>
        </Form>
    )
}

export default AccountProfile