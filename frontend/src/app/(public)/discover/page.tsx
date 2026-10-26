import { DiscoverIntroduction } from "@/features/discover/components/DiscoverIntroduction";
import {withPageSeo} from '@/lib/page-seo';

const defaultMetadata = {
  title: "Viện Sau Đại học | Về Viện Sau Đại học",
  description:
    "Viện Sau Đại học – Trường Đại học Văn Lang: tầm nhìn, sứ mệnh, triết lý giáo dục, giá trị LEAD và định hướng phát triển đến năm 2030.",
};
export async function generateMetadata(){return withPageSeo(defaultMetadata);}

export default function DiscoverPage() {
  return <DiscoverIntroduction />;
}
