import { useRouter } from "next/router";

const getRoute = ()=>{
    const router  = useRouter();
    const currentUri = router.asPath;
    const out = currentUri.split('/').filter(Boolean)
    const breadcrumbItems = out.map((part, index) => ({
        label: part,
        path: out.slice(0, index + 1).join('/'),
      }));
    // console.log(breadcrumbItems);
    return breadcrumbItems;
}





export default getRoute;