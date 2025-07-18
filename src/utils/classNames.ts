export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function capitalizeFirstLetter(val : string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}