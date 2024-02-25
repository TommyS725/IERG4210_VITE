import { capitalize,$ } from "./utils";


export const tables = ["category", "product"] as const;
export const operations = [
  {
    name: "insert",
    verb: "Add",
    alt: (name: string) => `Add a new ${name} in the database.`,
  },

  {
    name: "update",
    verb: "Update",
    alt: (name: string) => `Update an existing ${name} in the database.`,
  },
  {
    name: "delete",
    verb: "Remove",
    alt: (name: string) => `Remove an existing ${name} from the database.`,
  },
];


export function setCards(table: (typeof tables)[number]) {
    const div = $(`${table}-ops`);
    if (!div) {
      console.error(`Div with id ${table}-ops not found`);
        return 
    }
    for (const operation of operations) {
      const card = createCard(table, operation);
      div.appendChild(card);
    }
}

function createCard(
  type: (typeof tables)[number],
  operation: (typeof operations)[number]
) {
  const { name, verb, alt } = operation;
  const card = document.createElement("a");
  const cardClassNames = `card text-center bg-white  
    group cursor-pointer hover:bg-opacity-20 hover:bg-blue-500 grid place-items-center
    ring-slate-800 hover:ring-4 hover:border-slate-800 transition-all`;
  const clasList = cardClassNames
    .replace(/\n/g, " ")
    .split(" ")
    .filter(Boolean);
  card.classList.add(...clasList);
  card.href = `/${type}/${name}/`;
  card.innerHTML = `

        <img
        class="size-24 group-hover:scale-105 transition-transform"
        src="/${name}.svg"
        alt="${alt(type)}"
        />
        <p class="font-semibold font-sans text-xl 
        group-hover:underline  group-hover:scale-105 transition-transform">
        ${capitalize(verb)} ${capitalize(type)}
        </p>
    `;
  return card;
}
