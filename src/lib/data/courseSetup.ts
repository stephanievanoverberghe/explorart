import { connectToDatabase } from '@/lib/db/connect';
import { CourseSetup } from '@/lib/models/CourseSetup';
import type { CourseSetupData } from '@/types/courseSetup';
import { buildDefaultResources, buildDefaultStructure, defaultAccess, defaultIdentity, defaultIntent, defaultPricing, defaultPublish } from '@/lib/utils/courseSetupDefaults';

export async function getCourseSetup(courseId: string): Promise<CourseSetupData> {
    await connectToDatabase();
    const setup = await CourseSetup.findOne({ courseId }).lean();
    const fallbackStructure = buildDefaultStructure();
    const fallbackResources = buildDefaultResources();

    return {
        courseId,
        identity: setup?.identity ? { ...defaultIdentity, ...setup.identity } : defaultIdentity,
        intent: setup?.intent
            ? {
                  ...defaultIntent,
                  ...setup.intent,
                  outcomes: setup.intent.outcomes?.length ? setup.intent.outcomes : defaultIntent.outcomes,
              }
            : defaultIntent,
        structure: setup?.structure
            ? {
                  ...fallbackStructure,
                  ...setup.structure,
                  modules: setup.structure.modules?.length ? setup.structure.modules : fallbackStructure.modules,
              }
            : fallbackStructure,
        access: setup?.access ? { ...defaultAccess, ...setup.access } : defaultAccess,
        pricing: setup?.pricing ? { ...defaultPricing, ...setup.pricing } : defaultPricing,
        resources: setup?.resources
            ? {
                  ...fallbackResources,
                  ...setup.resources,
                  resources: setup.resources.resources?.length ? setup.resources.resources : fallbackResources.resources,
              }
            : fallbackResources,
        publish: setup?.publish ? { ...defaultPublish, ...setup.publish } : defaultPublish,
    };
}
