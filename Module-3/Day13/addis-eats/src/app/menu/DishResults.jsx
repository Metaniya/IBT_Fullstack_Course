import DishList from "./DishList";
import { getDishes } from "./dishes";

export default async function DishResults() {
  const dishes = await getDishes(); // the slow part
  return <DishList dishes={dishes} />;
}