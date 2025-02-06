import Header from "./header";
import Footer from "./footer";

export default function GuestLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div>
        <Header />
        <main className="bg-slate-50">{children}</main>
        <Footer />
      </div>
    );
  }
  