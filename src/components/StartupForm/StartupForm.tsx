'use client';

import { useActionState, useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/actions';

type errorType = {
  title?: string;
  description?: string;
  category?: string;
  link?: string;
  pitch?: string;
};

const StartupForm = () => {
  const [errors, setErrors] = useState<errorType>({});
  const [pitch, setPitch] = useState('');
  const router = useRouter();

  const handleFormSubmition = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        link: formData.get('link') as string,
        pitch,
      };
      await formSchema.parseAsync(formValues);
      const result = await createPitch(prevState, formData, pitch);

      console.log(result);
      if (result.status === 'SUCCESS') {
        toast.success('Your startup pitch has been created successfully');
        router.push(`/${result._id}`);
      }
      return result;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast.error('Please check your inputs and try again');
        return { ...prevState, error: 'Validation failed', status: 'ERROR' };
      }
      toast.error('An unexpected Error occured');
      return { ...prevState, error: 'An unexpected Error occured', status: 'ERROR' };
    } finally {
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmition, { error: '', status: 'INITIAL' });
  return (
    <form action={formAction} className="max-w-2xl mx-auto bg-white my-10 space-y-8 px-6">
      <div>
        <label htmlFor="title" className="font-bold text-[1.1rem] text-black uppercase">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="border-[3px] border-black px-5 py-7 text-[1.1rem] text-black font-semibold rounded-full mt-3 placeholder:text-black-300"
          required
          placeholder="Startup Title"
        />
        {errors.title && <p className="text-red-500 mt-2 ml-5">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="font-bold text-[1.1rem] text-black uppercase">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="border-[3px] border-black p-5 text-[1.1rem] text-black font-semibold rounded-[20px] mt-3 placeholder:text-black-300"
          required
          placeholder="Startup description"
        />
        {errors.description && <p className="text-red-500 mt-2 ml-5">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="category" className="font-bold text-[1.1rem] text-black uppercase">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="border-[3px] border-black px-5 py-7 text-[1.1rem] text-black font-semibold rounded-full mt-3 placeholder:text-black-300"
          required
          placeholder="Startup category(Tech, Education, Biology)"
        />
        {errors.category && <p className="text-red-500 mt-2 ml-5">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="link" className="font-bold text-[1.1rem] text-black uppercase">
          Link
        </label>
        <Input
          id="link"
          name="link"
          className="border-[3px] border-black px-5 py-7 text-[1.1rem] text-black font-semibold rounded-full mt-3 placeholder:text-black-300"
          required
          placeholder="Startup link URL"
        />
        {errors.link && <p className="text-red-500 mt-2 ml-5">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="font-bold text-[1.1rem] text-black uppercase">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: 'hidden' }}
          textareaProps={{
            placeholder: 'Briefly describy your idea',
          }}
          previewOptions={{ disallowedElements: ['style'] }}
        />
      </div>
      <button
        disabled={isPending}
        type="submit"
        className="bg-primary border-[4px] border-black rounded-full p-5 min-h-[4.5rem] w-full font-bold text-[1.1rem] text-white">
        {isPending ? 'Submitting...' : 'Submit your Startup'}
      </button>
    </form>
  );
};

export default StartupForm;
