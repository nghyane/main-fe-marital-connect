
import { ExpertHeader } from './components/expert-header';
import { ExpertTabs } from './components/expert-tabs';
import { BookingSidebar } from './components/booking-sidebar';
import  DetailBreadcrumb from './components/detail-breadcrumb';

export default async function ExpertDetail() {
    return (
        <div className="container mx-auto px-4 py-12">
            <DetailBreadcrumb />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <ExpertHeader />
                    <ExpertTabs />
                </div>

                {/* Sidebar */}
                <BookingSidebar />
            </div>
        </div>
    );
} 