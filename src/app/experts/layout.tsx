import GuestLayout from "@/layouts/guest-layout";

export default function ExpertsLayout({ children }: { children: React.ReactNode }) {
    return (
        <GuestLayout>{children}</GuestLayout>
    );
}