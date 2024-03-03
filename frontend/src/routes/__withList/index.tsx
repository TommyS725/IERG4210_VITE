import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import NavBar from "../../components/navbar";
import { SimplifiedProduct } from "../../models/products";
import { useEditTitle } from "../../utils/title";
import AddToCart from "../../components/shopping-cart/addToCart";
import { Thumbnail } from "../../components/images";
import { z } from "zod";
import { useSingleCategoryQuery } from "../../services/getSingleCategory";
import { useInfiniteProductsQuery } from "../../services/getInfiniteProducts";
import { Loader2 } from "lucide-react";
import { useIntersection } from "@mantine/hooks";
import { ElementRef, useEffect, forwardRef } from "react";

const PAGE_SIZE = 3 as const;

const searchSchema = z.object({
  cid: z.string().optional(),
});

export const Route = createFileRoute("/__withList/")({
  component: Index,
  validateSearch: (search) => searchSchema.parse(search),
 
});

function Index() {
  return (
    <>
      <MainSection />
    </>
  );
}


type ProductEntryProps = {
  product: SimplifiedProduct
  navigate: (opts: { to: string; params: (prev: any) => any }) => void;
}
  ;

const ProductEntry = forwardRef<ElementRef<"div">, ProductEntryProps>(({ product, navigate }, ref) => {
  const to = "/products/$pid";
  const params = (prev: any) => ({ ...prev, pid: String(product.pid) });

  return (
    <div className=" min-h-36 mx-auto  md:ml-0" ref={ref}>
      <Thumbnail
        filename={product.image}
        alt={product.name}
        onClick={() => navigate({ to, params })}
        className=" m-auto"
      />
      <div className=" m-1 justify-center grid">
        <Link
          to={to}
          params={params}
          className="  w-40  text-center text-balance font-semibold text-base hover:underline underline-offset-2 "
        >
          {product.name}
        </Link>
      </div>
      <div className=" min-w-full mt-2 justify-end grid grid-cols-2 gap-1 items-center">
        <p className=" text-base font-medium text-gray-900">
          ${product.price.toFixed(2)}
        </p>
        <AddToCart product={product} text="short" />
      </div>
    </div>
  );
})

type NavWithCidProps = {
  cid: string;
  navigate: (opts: { to: string; params: (prev: any) => any }) => void;
};

function NavWithCid({ cid }: NavWithCidProps) {
  const baseNav = { name: "Home", path: "/" };
  const { data: category } = useSingleCategoryQuery(cid);
  if (!category) {
    return <NavBar navItems={[baseNav]} />;
  }
  return (
    <NavBar
      navItems={[
        {
          ...baseNav,
          active: false,
        },
        { name: category.name, path: `/?cid=${cid}`, active: true },
      ]}
    />
  );
}



function MainSection() {
  const { cid } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  useEditTitle(["Home"]);
  const { data, isLoading, fetchNextPage } = useInfiniteProductsQuery({
    pageSize: PAGE_SIZE,
    cid
  })
  const { ref, entry } = useIntersection({
    root: null, //using browser viewport
    threshold: 0.7,
  })
  const products = data?.pages.flatMap(e => e)
  const hasMore = isLoading || data?.pages.at(-1)?.length === PAGE_SIZE;


  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
      // console.log("fetching next page")
    }
  }
    , [entry])
  return (
    <>
      {cid ? (
        <NavWithCid cid={cid} navigate={navigate} />
      ) : (
        <NavBar navItems={[{ name: "Home", path: "/" }]} />
      )}
      <section className="  gap-24 flex flex-wrap justify-start ">
        {/* <div className="w-full">{isLoading ? "loading" : "not loading"}</div> */}
        {products?.map((product, index) => {

          return (
            <ProductEntry
              key={index}
              product={product}
              navigate={navigate}
              ref={index === products.length - 1 ? ref : undefined}
            />
          );
        })}
      </section>
      <div className=" w-full h-40 flex justify-center ">
        {hasMore&&<Loader2  className="animate-spin size-24 place-self-center " />}
        {!hasMore && <p className=" place-self-center text-xl font-medium text-neutral-500  italic">No More ...</p>}
      </div>
    </>
  );
}
