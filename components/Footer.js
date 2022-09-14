import { Text } from "@nextui-org/react";

export function Footer() {
  return (
    <footer className="w-full h-12 absolute bottom-0 flex items-center justify-center">
      <span>All comics </span>
      <a href="https://xkcd.com/" target="_blank">
        <Text color="primary" className="ml-2 font-semibold">xkcd.com</Text>
      </a>
    </footer>
  )
}
