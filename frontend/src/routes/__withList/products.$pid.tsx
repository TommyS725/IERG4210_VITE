/* eslint-disable react-hooks/rules-of-hooks */
import { createFileRoute, } from "@tanstack/react-router";
import NavBar from "../../components/navbar";

import { useEditTitle } from "../../utils/title";
import { Product } from "../../models/products";
import { FC } from "react";
import AddToCart from "../../components/shopping-cart/addToCart";
import { FullImage } from "../../components/images";
import { useSingleCategoryQuery } from "../../services/getSingleCategory";
import { singleProductQueryOptions } from "../../services/getSingleProduct";

const INVEENTORY_LOW = 3 as const;

export const Route = createFileRoute("/__withList/products/$pid")({
  component: ProductPage,
  loader: (args) => {
    const queryClient = args.context.queryClient;
    const { pid } = args.params;
    return queryClient.ensureQueryData(singleProductQueryOptions(pid));
  },
  notFoundComponent: () => {
    const { pid } = Route.useParams();
    return (
      <div>
        <code>Product with ID:{pid} Not Found</code>
      </div>
    );
  },
});

function ProductPage() {
  const product = Route.useLoaderData();

  return (
    <>
      <ProductNav product={product} />
      <ProductDescription product={product} />
    </>
  );
}

type ProductNavProps = {
  product: Product;
};

function ProductNav({ product }: ProductNavProps) {
  const { name, cid } = product;
  const { data: category} = useSingleCategoryQuery(product.cid);
 
  if (!category) {
    return (
      <NavBar
        navItems={[
          { name: "Home", path: "/" },
          { name: name, path: `/products/${product.pid}` },
        ]}
      />
    );
  }
  return (
    <NavBar
      navItems={[
        { name: "Home", path: "/" },
        { name: category.name, path: `/?cid=${cid}` },
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
