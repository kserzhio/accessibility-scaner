import { prisma } from 'lib/prisma';
interface SaveAuditInput {
    projectId: string;
    criterionId: string;
    outcome: string;
    observations: string;
}

export async function getAuditCriteriaForProject(projectId: string) {
    const criteria = await prisma.wcagCriterion.findMany();

    const results = await prisma.auditResult.findMany({
        where: { projectId },
    });

    const resultMap = new Map(results.map(r => [r.criterionId, r]));

    return criteria.map((criterion) => {
        const result = resultMap.get(criterion.id);
        return {
            id: criterion.id,
            title: criterion.title,
            level: criterion.level,
            principle: criterion.principle,
            description: criterion.description,
            understandingUrl: criterion.understandingUrl,
            howToMeetUrl: criterion.howToMeetUrl,
            outcome: result?.outcome ?? 'NOT_CHECKED',
            observations: result?.observations ?? '',
        };
    });
}
export async function saveAuditResult({
    projectId,
    criterionId,
    outcome,
    observations
}: SaveAuditInput) {
    const existing = await prisma.auditResult.findFirst({
        where: { projectId, criterionId },
    });
    if (existing) {
        return await prisma.auditResult.update({
            where: { id: existing.id },
            data: { outcome, observations },
        });
    } else {
        return await prisma.auditResult.create({
            data: { projectId, criterionId, outcome, observations },
        });
    }
}
