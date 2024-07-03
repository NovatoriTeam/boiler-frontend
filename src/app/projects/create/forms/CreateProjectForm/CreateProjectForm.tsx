'use client';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Form, Input } from 'antd';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { JSX, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ProjectSchema } from '@/src/app/projects/create/forms/schemas/project.schema';
import { ProjectSchemaInterface } from '@/src/app/projects/create/types/interfaces/project-schema.interface';
import { ProjectInterface } from '@/src/app/projects/interfaces/project.interface';
import { upsertApi } from '@/src/shared/api/crud-operations';

const CreateProjectForm = (props: {
  id: number;
  project: ProjectInterface;
}): JSX.Element => {
  const { control, handleSubmit, reset } = useForm<ProjectSchema>({
    resolver: classValidatorResolver(ProjectSchema),
  });
  const isUpdating = !!(props.project && props.id);
  const router: AppRouterInstance = useRouter();

  useEffect(() => {
    if (isUpdating && props.project) {
      reset(props.project);
    }
  }, [isUpdating, props.project, reset]);

  const onSubmit = async (data: ProjectSchema): Promise<void> => {
    await upsertApi<ProjectSchemaInterface>(
      'projects',
      data.toPlain(),
      props.id,
    );
    reset();
    router.replace('/projects');
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
      <Form.Item label={'აღწერა'}>
        <Controller
          name={'description'}
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item label={'ბიუჯეტი'}>
        <Controller
          name={'budget'}
          control={control}
          render={({ field }) => <Input type={'number'} {...field} />}
        />
      </Form.Item>
      <Form.Item label={'სტატუსი'}>
        <Controller
          name={'status'}
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Button htmlType={'submit'}>{props.id ? 'განახლება' : 'დამატება'}</Button>
    </form>
  );
};

export default CreateProjectForm;
