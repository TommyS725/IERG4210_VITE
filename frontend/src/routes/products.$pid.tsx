import { createFileRoute, useNavigate } from "@tanstack/react-router";
import NavBar from "../components/navbar";

import CategoryMenu from "../components/categoryMenu";
import { useEditTitle } from "../utils/title";
import { Product } from "../models/products";
import { FC } from "react";
import AddToCart from "../components/addToCart";
import { FullImage } from "../components/images";
import { useSingleCategoryQuery } from "../services/getSingleCategory";
import { useSingleProductQuery } from "../services/getSingleProduct";
import { Category } from "../models/category";

const INVEENTORY_LOW = 3 as const;

export const Route = createFileRoute("/products/$pid")({
  component: ProductPage,
});

function ProductPage() {
  const navigate = useNavigate({ from: "/products/$pid" });
  const { pid } = Route.useParams();
  const { data: product, isLoading, isError } = useSingleProductQuery(pid);

  if (!product && !isLoading && !isError) {
    navigate({ to: "/", replace: true });
    return;
  }

  return (
    <>
      <main className={`flex py-1 gap-4 bg-transparent`}>
        <section className=" min-w-max">
          <CategoryMenu />
        </section>
        <section className="  overflow-y-auto max-h-[110vh]  grow ">
          {!!product && (
            <>
              <ProductNav product={product} />
              <ProductDescription product={product} />
            </>
          )}
        </section>
      </main>
    </>
  );
}

type ProductNavProps = {
  product: Product;
};

function ProductNav({ product }: ProductNavProps) {
  const { name, cid } = product;
  const {
    data: category,
    isLoading,
    isError,
  } = useSingleCategoryQuery(product.cid);
  if (isLoading || !category) {
    return <NavBar navItems={[{ name: "Home", path: "/" }]} />;
  }
  return (
    <NavBar
      navItems={[
        { name: "Home", path: "/" },
        { name: category?.name, path: `/?cid=${cid}` },
        { name: name, path: `/products/${product.pid}` },
      ]}
    />
  );
}

type ProductEntryProps = {
  product: Product;
};

const ProductDescription: FC<ProductEntryProps> = ({ product }) => {
  const remainFew = product.inventory <= INVEENTORY_LOW;
  useEditTitle([product.name]);

  return (
    <section className=" grid grid-cols-1 md:grid-cols-2 mt-4 mb-1 mr-6 gap-4">
      <div className=" flex justify-center">
        <FullImage filename={product.image} alt={product.name} />
      </div>
      <div className=" space-y-4">
        <h1 className=" text-xl font-semibold">{product.name}</h1>
        <div className=" flex gap-2 items-center">
          <span className=" text-base  font-medium"> Price: </span>
          <span className=" text-xl font-bold text-blue-800">
            ${product.price}
          </span>
        </div>
        {remainFew ? (
          <p className=" text-red-600 text-lg font-semibold space-x-2 ">
            <span>Only</span>
            <span className=" mx-2 text-xl font-bold">{product.inventory}</span>
            <span>left !</span>
          </p>
        ) : (
          <div className=" flex gap-2 items-center">
            <span className=" text-base  font-medium"> Inventory: </span>
            <span className={" text-lg  text-black  font-semibold"}>
              {product.inventory}
            </span>
          </div>
        )}
        <AddToCart product={product} text="full" />
        <div className="">
          <p className="text-base  font-medium"> Description:</p>
          <p className=" text-base  ">{product.description}</p>
        </div>
      </div>
    </section>
  );
};
