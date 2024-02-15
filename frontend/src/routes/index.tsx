import {
  Link,
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";
import NavBar from "../components/navbar";
import CategoryMenu from "../components/categoryMenu";
import { Product } from "../models/products";
import { dummy_products } from "../utils/dummy";
import {  useEditTitle } from "../utils/title";
import AddToCart from "../components/addToCart";

const dummy_products_array = new Array(20)
  .fill(dummy_products)
  .flat() as Product[];

export const Route = createFileRoute("/")({
  component: Index,
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

function ProductEntry({
  product,
  navigate,
}: ProductEntryProps) {
  const to = "/products/$pid";
  const params = (prev: any) => ({ ...prev, pid: String(product.pid) });

  return (
    <div className=" min-h-36 ">
      <img
        src={product.image}
        className=" cursor-pointer w-24 h-24 md:h-40 md:w-40 rounded-xl  hover:border-blue-500 border-2 border-transparent p-1   object-scale-down"
        alt={product.pname}
        onClick={() => navigate({ to, params })}
      />
      <div className=" m-1 justify-center grid">
        <Link
          to={to}
          params={params}
          className=" font-semibold text-base hover:underline underline-offset-2 "
        >
          {product.pname}
        </Link>
      </div>
      <div className=" mt-2 justify-end grid grid-cols-2 items-center">
        <p className=" text-base font-medium text-gray-900">
          ${product.price.toFixed(2)}
        </p>
        {/* <button
          className=" flex gap-1 py-1 pl-1 border-2 border-gray-700 rounded-2xl  hover:ring-1 ring-gray-700 hover:bg-blue-200 "
          onClick={() => handleAddToCart(product)}
        >
          <Plus /> Add
        </button> */}
        <AddToCart product={product} text="short" />
        {/* <p>Remain {product.remaining}</p> */}
      </div>
    </div>
  );
}

function MainSection() {
  const navigate = useNavigate({ from: "/" });
  useEditTitle(["Home"]);



  return (
    <>
      <main className={`flex py-1 gap-4 bg-transparent`}>
        <section className=" min-w-max">
          <CategoryMenu />
        </section>
        <section className="  overflow-y-auto max-h-[110vh]  grow ">
          <NavBar navItems={[{ name: "Home", path: "/" }]} />
          <section className=" gap-12  flex flex-wrap justify-evenly">
            {dummy_products_array.map((product, index) => {
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
