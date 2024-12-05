import { promises as fs } from "fs";

export default async function Page() {
  const file = await fs.readFile(process.cwd() + "@/app/data.json", "utf8");
  //...
}
