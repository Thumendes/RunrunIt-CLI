import { promises as fs } from "fs";

export async function writeJSON(data: any, path: string): Promise<void> {
  const previousContent = await readJSON(path);
  const newContent = { ...previousContent, ...data };
  const content = JSON.stringify(newContent, null, 2);

  return await fs.writeFile(path, content);
}

export async function readJSON(path: string): Promise<any> {
  const content = await fs.readFile(path, "utf8").catch(() => null);

  if (!content) return null;

  return JSON.parse(content);
}
