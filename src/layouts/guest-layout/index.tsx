import { FC, PropsWithChildren } from 'react';
import Header from "./header";
import Footer from "./footer";
import { cn } from "@/lib/utils";

interface GuestLayoutProps extends PropsWithChildren {
  readonly mainClassName?: string;
}

const GuestLayout: FC<GuestLayoutProps> = ({ 
  children, 
  mainClassName = 'main-wrapper-page' 
}) => (
  <div className="min-h-screen flex flex-col">
    <main className={cn('flex-grow', mainClassName)}>
      <Header />
      {children}
    </main>
    <Footer />
  </div>
);

export default GuestLayout;