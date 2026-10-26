import { StudentSuccessPage } from '@/features/student-success/components/StudentSuccessPage';
import { withPageSeo } from '@/lib/page-seo';

export async function generateMetadata() {
  return withPageSeo({
    title: 'Hành trình người học | Viện Sau Đại học',
    description: 'Hệ sinh thái học tập, hỗ trợ và phát triển nghề nghiệp đồng hành cùng người học Viện Sau Đại học.',
  });
}

export default function Page() {
  return <StudentSuccessPage />;
}
