import apiServices  from "@/services/api";
import ProductDetail from "@/components/e-commerce-product-detail";




export default async function Productid({ params }: { params: Promise<{ productid: string }> }) {

  const resolvedParams = await params;

  console.log(resolvedParams.productid);

  const product = await apiServices.getProductdetails(resolvedParams.productid);
  console.log(product);

  return <ProductDetail product={product} />;
}