'use client';

import React, { useEffect } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { MdModeEdit } from "react-icons/md";
import CModal from '@/components/customModal';
import Input from '@/components/input/input';
import { useUpdateProfileMutation } from '@/redux/features/user/userApi';

const EditYourDepartment = ({ user }: { user: any }) => {
  const router = useRouter();
  const [updateDepartment, { isSuccess, isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (isSuccess) {
      router.push('/dashboard/profile');
      router.refresh();
      toast.success('Updated your field successfully!');
    }
  }, [isSuccess, router]);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      department: user?.department || '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await updateDepartment(data);
  };

  return (
    <div className="flex gap-2 items-center justify-between">
      <h1 className="text-[16px] md:text-xl lg:text-2xl xl:text-3xl font-medium tracking-tight leading-tight p-2 truncate">
        {user.department || 'What is your field?'}
      </h1>

      <CModal
        disabled={isLoading}
        buttonLabel={isLoading?'Saving...':'Save'}
        onClick={handleSubmit(onSubmit)}
        className="bg-transparent p-0 hover:bg-transparent hover:text-black hover:dark:text-white text-gray-600 dark:text-gray-200"
        modalName={<MdModeEdit size={20} className='text-gray-500 dark:text-gray-400'/>}
      >
        <div className="w-[300px] p-2  text-left">
          <Input
            defaultValue={user?.department}
            type="text"
            label="Department"
            register={register}
            errors={errors}
            id="department"
          />
        </div>
      </CModal>
    </div>
  );
};

export default EditYourDepartment;
