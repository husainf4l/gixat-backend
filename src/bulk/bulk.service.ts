import { Injectable } from '@nestjs/common';
import { CreateMakeModelDto } from './dto/create-make-model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BulkService {
    constructor(private readonly prisma: PrismaService) { }

    async bulkCreateMakesAndModels(makesAndModels: CreateMakeModelDto[]) {
        const results = [];

        for (const entry of makesAndModels) {
            // Define the type for make with models as optional
            type MakeWithOptionalModels = { id: string; name: string; models?: { id: string; name: string; makeId: string }[] };

            // Retrieve the make with models, allowing models to be optionally included
            let make = await this.prisma.make.findUnique({
                where: { name: entry.make },
                include: { models: true },
            }) as MakeWithOptionalModels | null;

            if (!make) {
                // Create make and associated models if make doesn't exist
                make = await this.prisma.make.create({
                    data: {
                        name: entry.make,
                        models: {
                            create: entry.models.map((modelName) => ({ name: modelName })),
                        },
                    },
                });
                results.push({ make: entry.make, status: 'created' });
            } else {
                // If make exists, add only new models
                const existingModelNames = make.models?.map((model) => model.name) || [];
                const newModels = entry.models.filter((model) => !existingModelNames.includes(model));

                if (newModels.length > 0) {
                    await this.prisma.model.createMany({
                        data: newModels.map((modelName) => ({ name: modelName, makeId: make!.id })),
                        skipDuplicates: true,
                    });
                    results.push({ make: entry.make, status: 'updated', newModels });
                } else {
                    results.push({ make: entry.make, status: 'no new models' });
                }
            }
        }

        return { message: 'Bulk operation completed', results };
    }
}
