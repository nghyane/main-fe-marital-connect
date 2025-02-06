import Image from "next/image";
import Link from "next/link"

export default function Header() {
    return (
        <header className="bg-white shadow-sm border-b border-slate-200">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.svg" width={150} height={100} alt="logo" loading="eager" />
                </Link>

                <div className="flex items-center gap-x-4">
                    <Link href="/">Home</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/search">Search</Link>
                </div>

                <div className="flex items-center gap-x-4">
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
                </div>
            </nav>
        </header>

    );
}
