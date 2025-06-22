import PageMeta from '../../components/common/PageMeta';
import AuthLayout from './AuthPageLayout';
import SignUpForm from '../../components/auth/SignUpForm';

export default function SignUp() {
  return (
    <>
      <PageMeta title="SignUp Dashboard | SiPelMasD" description="This is Dashboard page for SiPelMasD" />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
