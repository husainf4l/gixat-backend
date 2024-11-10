import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {

    constructor(private readonly prisma: PrismaService) { }

    // Mocking database responses
    private recentActivities = [
        { id: 'JX101', vehicle: 'Land Cruiser', service: 'Oil Change', status: 'Completed', date: '2024-11-08' },
        { id: 'JX102', vehicle: 'Hilux', service: 'Brake Replacement', status: 'In Service', date: '2024-11-08' },
        { id: 'JX103', vehicle: 'Ford F-150', service: 'Transmission Check', status: 'Awaiting Parts', date: '2024-11-07' },
    ];

    private partsAwaiting = [
        { partName: 'Brake Pads', vehicle: 'Nissan Patrol', eta: '2024-11-10' },
        { partName: 'Alternator', vehicle: 'Toyota Hilux', eta: '2024-11-11' },
        { partName: 'Timing Belt', vehicle: 'Mitsubishi Pajero', eta: '2024-11-12' },
    ];




    async getKeyMetrics() {
        // Get total vehicles
        const totalVehicles = await this.prisma.car.count();

        // Get vehicles currently in service
        const activeVehicles = await this.prisma.car.count({
            where: {
                status: 'IN_SERVICE',
            },
        });

        const incompleteJobs = await this.prisma.car.count({
            where: {
                status: {
                    notIn: ['CANCELLED', 'IN_SERVICE'],
                },
            },
        });
        const awaitingParts = await this.prisma.car.count({
            where: {
                status: 'AWAITING_PARTS',
            },
        });

        // Get total clients
        const totalClients = await this.prisma.accountReceivable.count();

        // Get completed jobs today
        const completedToday = await this.prisma.jobCard.count({
            where: {
                status: 'COMPLETED',
                createdAt: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    lte: new Date(new Date().setHours(23, 59, 59, 999)),
                },
            },
        });

        return {
            totalVehicles,
            activeVehicles,
            completedToday,
            totalClients,
            incompleteJobs,
            awaitingParts
        };
    }
    // Get Recent Activities
    getRecentActivities() {
        return this.recentActivities;
    }

    // Get Parts Awaiting Delivery
    getPartsAwaiting() {
        return this.partsAwaiting;
    }
}
