import GuestLayout from "@/layouts/guest-layout";
import { HeroSection } from "@/components/home/hero-section";
import { SearchSection } from "@/components/home/search-section";
import { ExpertCard } from "@/components/home/expert-card";
import { Expert } from "@/types/expert";

import { api } from '@/lib/api-client';

interface HomeProps {
  searchParams: Promise<{
    name?: string;
    location?: string;
  }>;
}

async function getExperts(searchParams: Awaited<HomeProps['searchParams']>): Promise<Expert[]> {
  const params = new URLSearchParams();
  if (searchParams.name) {
    params.set("name", searchParams.name);
  }
  if (searchParams.location) {
    params.set("location", searchParams.location);
  }

  const res = await api.fetch<any>(`/experts?${params.toString()}`, {
    cache: 'no-store'
  });

  return res.data;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const experts = await getExperts(params);

  return (
    <GuestLayout mainClassName="main-wrapper-home">
      <HeroSection />
      
      <div className="bg-white">
        <div className="container mx-auto px-4 py-4">
          <SearchSection />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-8">
            {experts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
