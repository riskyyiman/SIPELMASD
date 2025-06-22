import PageMeta from '../../components/common/PageMeta';
import AuthLayout from './AuthPageLayout';
import SignInForm from '../../components/auth/SignInForm';

export default function SignIn() {
  return (
    <>
      <PageMeta title="SignIn Dashboard | SiPelMasD" description="This is Dashboard page for SiPelMasD" />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
