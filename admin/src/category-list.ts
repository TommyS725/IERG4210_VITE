import { ConnectionConfig } from "./connection_config";
import { $, Category } from "./utils.js";

export async function setUpCategoryList() {
  const list = $("cid-list");
  const baseOption = list?.children[0] as HTMLOptionElement;
  if (!list) {
    console.error("No category list found");
    return;
  }
  if (!baseOption) {
    console.error("No base option found");
    return;
  }
  const originalText = baseOption.innerText;
  baseOption.innerText = "Loading...";
  const baseUrl = ConnectionConfig.getAPI("/categories");
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      console.error("Failed to fetch categories");
      return;
    }
    const categories = (await response.json()) as Category[];

    for (const category of categories) {
      const option = document.createElement("option");
      option.value = category.cid;
      option.textContent = category.name;
      list.appendChild(option);
    }
    baseOption.innerText = originalText;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    baseOption.innerText = "Failed to load categories";
  }
}
