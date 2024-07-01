'use client';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Form, Input } from 'antd';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { JSX, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { upsertApi } from '@/app/Api/crud-operations';
import { DepartmentSchemaInterface } from '@/app/departments/create/interfaces/department-schema.interface';
import { DepartmentSchema } from '@/app/departments/create/schemas/department.schema';
import { DepartmentInterface } from '@/app/departments/interfaces/department.interface';

const CreateDepartmentForm = (props: {
  id: number;
  department: DepartmentInterface;
}): JSX.Element => {
  const { control, handleSubmit, reset } = useForm<DepartmentSchema>({
    resolver: classValidatorResolver(DepartmentSchema),
  });
  const isUpdating: boolean = !!(props.department && props.id);
  const router: AppRouterInstance = useRouter();

  useEffect(() => {
    if (isUpdating && props.department) {
      reset(props.department);
    }
  }, [isUpdating, props.department, reset]);

  const onSubmit = async (data: DepartmentSchema): Promise<void> => {
    await upsertApi<DepartmentSchemaInterface>(
      'departments',
      data.toPlain(),
      props.id,
    );
    reset();
    router.replace('/departments');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form.Item label={'სახელი'}>
        <Controller
          name={'name'}
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item label={'მენეჯერი'}>
        <Controller
          name={'manager'}
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item label={'ლოკაცია'}>
        <Controller
          name={'location'}
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Button htmlType={'submit'}>{props.id ? 'განახლება' : 'დამატება'}</Button>
    </form>
  );
};

export default CreateDepartmentForm;
