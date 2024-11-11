import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    // Endpoint to get key metrics
    @Get('metrics')
    getKeyMetrics() {
        return this.dashboardService.getKeyMetrics();
    }

    // Endpoint to get recent activities
    @Get('recent-activities')
    getRecentActivities() {
        return this.dashboardService.getRecentActivities();
    }

    // Endpoint to get parts awaiting delivery
    @Get('parts-awaiting')
    getPartsAwaiting() {
        return this.dashboardService.getPartsAwaiting();
    }


    @Get('company-data/:id')
    getCompanyId(@Param('id') id: string) {
        return this.dashboardService.getCompanyData(id);
    }
}
