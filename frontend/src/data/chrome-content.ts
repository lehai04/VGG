import { navigationGroups } from './site';
import { contactItems, aboutLinks, quickLinks, socialLinks, locations, legalLinks } from '../shared/components/layout/footer/footerData';
export const chromeContent = { brand: { image: '/images/logo/logo-vgg.png', alt: 'Viện Sau đại học Văn Lang' }, application: { href: 'https://tuyensinh.vlu.edu.vn/xet-tuyen/thac-si/' }, navigationGroups: navigationGroups.map(({slug,en,vi}) => ({slug,en,vi})), contactItems, aboutLinks, quickLinks, socialLinks, locations, legalLinks };
