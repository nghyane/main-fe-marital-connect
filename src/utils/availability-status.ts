import { AvailabilityStatus } from '@/app/experts/[id]/type';

export const getAvailabilityStatusText = (status: AvailabilityStatus): string => {
    const statusMap: Record<AvailabilityStatus, string> = {
        [AvailabilityStatus.ONLINE]: 'Online',
        [AvailabilityStatus.OFFLINE]: 'Offline',
        [AvailabilityStatus.BUSY]: 'Busy',
        [AvailabilityStatus.AWAY]: 'Away'
    };
    
    return statusMap[status];
}; 