import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ALL_CATEGORIES } from "../models/category";
import NavBar from "../components/navbar";

//!ONLY USE FOR UI
import { dummy_products } from "../utils/dummy";
import CategoryMenu from "../components/categoryMenu";
import { useEditTitle } from "../utils/title";
import { Product } from "../models/products";
import { FC } from "react";
import AddToCart from "../components/addToCart";

const INVEENTORY_LOW = 3 as const;

export const Route = createFileRoute("/products/$pid")({
  component: ProductPage,
});

function ProductPage() {
  const navigate = useNavigate({ from: "/products/$pid" });
  const { pid } = Route.useParams();
  const product = dummy_products.find((p) => p.pid === +pid);
  if (!product) {
    navigate({ to: "/", replace: true });
    return;
  }
  const { pname, category: ckey } = product;
  const category = ALL_CATEGORIES.find((c) => c.ckey === ckey);
  const cname = category?.cname || "Unknown";

  useEditTitle([pname]);

  return (
    <>
      <main className={`flex py-1 gap-4 bg-transparent`}>
        <section className=" min-w-max">
          <CategoryMenu />
        </section>
        <section className="  overflow-y-auto max-h-[110vh]  grow ">
          <NavBar
            navItems={[
              { name: "Home", path: "/" },
              { name: cname, path: `/categories/${ckey}` },
              { name: pname, path: `/products/${pid}` },
            ]}
          />
          <ProductDescription product={product} />
        </section>
      </main>
    </>
  );
}

type ProductEntryProps = {
  product: Product;
};

const ProductDescription: FC<ProductEntryProps> = ({ product }) => {
  const remainFew = product.remaining <= INVEENTORY_LOW;

  return (
    <section className=" grid grid-cols-1 md:grid-cols-2 mt-4 mb-1 mr-6 gap-4">
      <div className=" flex justify-center">
        <img
          src={product.image}
          alt={product.pname}
          className="  mx-h-64 lg:max-h-96 object-scale-down"
        />
      </div>
      <div className=" space-y-4">
        <h1 className=" text-xl font-semibold">{product.pname}</h1>
        <div className=" flex gap-2 items-center">
          <span className=" text-base  font-medium"> Price: </span>
          <span className=" text-xl font-bold text-blue-800">
            ${product.price}
          </span>
        </div>
        {remainFew ? (
          <p className=" text-red-600 text-lg font-semibold space-x-2 ">
            <span>Only</span>
            <span className=" mx-2 text-xl font-bold">{product.remaining}</span>
            <span>left !</span>
          </p>
        ) : (
          <div className=" flex gap-2 items-center">
            <span className=" text-base  font-medium"> Inventory: </span>
            <span className={" text-lg  text-black  font-semibold"}>
              {product.remaining}
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
