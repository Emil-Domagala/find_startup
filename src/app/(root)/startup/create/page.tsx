import Header from '@/components/Header/Header';
import StartupForm from '@/components/StartupForm/StartupForm';

const CreateStartup = () => {
  return (
    <>
      <Header className="min-h-[230px]" heading="Submit Your Startup" />
      <StartupForm />
    </>
  );
};

export default CreateStartup;
