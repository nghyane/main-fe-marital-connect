import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getExpertById } from './utils';
import { ExpertProvider } from './context';


interface ExpertLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}

export default async function ExpertLayout({ children, params }: ExpertLayoutProps) {
  const { id } = await params;

  try {
    const expertData = await getExpertById(id);

    return (
      <ExpertProvider expertData={expertData}>
          {children}
      </ExpertProvider>
    );
  } catch (error) {
    notFound();
  }
} 