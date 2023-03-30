import { fetchSetList } from "./scryfallApi";

const run = async () => {
  const sets = await fetchSetList();
  console.log(sets);
};

run();

