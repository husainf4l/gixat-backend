import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';  // Import ConfigService
import * as qs from 'qs';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class QuickbooksService {
    private readonly clientId: string;
    private readonly clientSecret: string;
    private readonly redirectUri: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,  // Inject ConfigService
    ) {
        this.clientId = this.configService.get<string>('CLIENT_ID');
        this.clientSecret = this.configService.get<string>('CLIENT_SECRET');
        this.redirectUri = this.configService.get<string>('REDIRECT_URI');
    }

    // Exchange authorization code for OAuth token
    async getOAuthToken(code: string): Promise<any> {
        const url = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';

        console.log(this.clientId, this.clientSecret, this.redirectUri)

        const data = qs.stringify({
            grant_type: 'authorization_code',
            code: code,  // The authorization code you received from QuickBooks
            redirect_uri: this.redirectUri,  // Ensure this matches the redirect URI in your QuickBooks app settings
        });

        const headers = {
            'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        try {
            // Send the POST request to exchange the code for a token
            const response = await firstValueFrom(this.httpService.post(url, data, { headers }));
            return response.data;  // The response will contain the access token and refresh token
        } catch (error) {
            console.error('OAuth token exchange failed:', error.response?.data);
            throw new Error(`Error getting OAuth token: ${error.message}`);
        }
    }

    // Get company info from QuickBooks
    async getCompanyInfo(accessToken: string): Promise<any> {
        const url = 'https://quickbooks.api.intuit.com/v3/company/9341453443035550/query'; // Replace with your company ID
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
        };

        try {
            const response = await firstValueFrom(this.httpService.get(url, { headers }));
            return response.data;
        } catch (error) {
            throw new Error(`Error retrieving company info: ${error.message}`);
        }
    }
}
