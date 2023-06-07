import { useRouter } from "next/router";

interface BreadcrumbItem {
  label: string;
  path: string;
}

const getRoute = (): BreadcrumbItem[] => {
  const router = useRouter();
  const currentUri: string = router.asPath;
  const out: string[] = currentUri.split('/').filter(Boolean);
  const breadcrumbItems: BreadcrumbItem[] = out.map((part, index) => ({
    label: part,
    path: out.slice(0, index + 1).join('/'),
  }));

  return breadcrumbItems;
};

export default getRoute;
