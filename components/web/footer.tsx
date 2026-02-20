import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-12 ">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()}{" "}
          <Link href={"/"}>
            <span className="bg-linear-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent transition-all duration-300 group-hover:brightness-110">
              Peer
            </span>
            <span className="text-zinc-400 transition-colors">Path</span> All
          </Link>
          Right Reserved
        </p>
      </div>
    </footer>
  );
}
