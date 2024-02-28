import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import NavBar from "../components/navbar";
import CategoryMenu from "../components/categoryMenu";
import { Product } from "../models/products";
import { useEditTitle } from "../utils/title";
import AddToCart from "../components/shopping-cart/addToCart";
import { Thumbnail } from "../components/images";
import { z } from "zod";
import { useProductsQuery } from "../services/getProducts";
import { useSingleCategoryQuery } from "../services/getSingleCategory";

const searchSchema = z.object({
  cid: z.string().optional(),
});

export const Route = createFileRoute("/")({
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
  product: Product;
  navigate: (opts: { to: string; params: (prev: any) => any }) => void;
};

function ProductEntry({ product, navigate }: ProductEntryProps) {
  const to = "/products/$pid";
  const params = (prev: any) => ({ ...prev, pid: String(product.pid) });

  return (
    <div className=" min-h-36 mr-auto   ">
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
          className="  text-center text-balance font-semibold text-base hover:underline underline-offset-2 "
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
}

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
  const { data: products } = useProductsQuery(cid);

  return (
    <>
      <main className={`flex py-1 gap-4 bg-transparent`}>
        <section className=" min-w-max">
          <CategoryMenu cid={cid} />
        </section>
        <section className="  overflow-y-auto max-h-[110vh]  grow ">
          {cid ? (
            <NavWithCid cid={cid} navigate={navigate}/>
          ) : (
            <NavBar navItems={[{ name: "Home", path: "/" }]} />
          )}
          <div></div>
          <section className="  gap-24 flex flex-wrap justify-start ">
            {products?.map((product, index) => {
              return (
                <ProductEntry
                  key={index}
                  product={product}
                  navigate={navigate}
                />
              );
            })}
          </section>
        </section>
      </main>
    </>
  );
}
