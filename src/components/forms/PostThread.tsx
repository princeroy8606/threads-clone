"use client"
import * as z from 'zod'
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "../ui/form";
import { zodResolver } from '@hookform/resolvers/zod'
import { userValidation } from "@/lib/validations/user";
import { Button } from "@/components/ui/button"
import { useUploadThing } from '@/lib/uploadthing'
import { updateUser } from '@/lib/actions/users.actions';
import { usePathname, useRouter } from 'next/navigation';
import { ThreadValidation } from '@/lib/validations/thread';
import { createThread } from '@/lib/actions/thread.actions';


function PostThread({ userId }: { userId: string }) {
    const pathname = usePathname()
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: '',
            accountId: userId
        }
    })
    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThread({
            text: values.thread,
            author: userId,
            communityId: '',
            path: pathname
        })
        router.push('/')
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10  mt-10">
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className='flex items-start flex-col gap-4 w-full'>
                            <FormLabel className='text-base-semibold text-gray-200'>
                                Content
                            </FormLabel>
                            <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'  >
                                <textarea rows={10} className='account-form_input no-focus w-full' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type='submit' className='bg-primary-500'>
                    Post Thread
                </Button>
            </form>
        </Form>
    )
}

export default PostThread