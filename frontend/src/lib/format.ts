export function formatPrice(amount: number) {
  return `$ ${amount.toLocaleString("en-US")}`;
}

export function productNameLines(name: string) {
  const lastSpace = name.lastIndexOf(" ");
  return [name.slice(0, lastSpace), name.slice(lastSpace + 1)];
}
