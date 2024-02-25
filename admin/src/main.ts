import "./styles/global.css";
import { setHeader } from "./header";
import { setCards } from "./card";

main();

function main() {
  setHeader();
  setCards("category");
  setCards("product");
}
