import { prisma } from 'lib/prisma';

export async function getClientProjectSummary(projectId: string) {
    const pages = await prisma.page.findMany({
        where: { projectId },
        include: {
            scanResults: {
                orderBy: { createdAt: 'desc' },
                take: 1,
                include: {
                    violations: true,
                },
            },
        },
    });

    let totalIssues = 0;
    let scoreSum = 0;
    let checkedPages = 0;
    const impact = { critical: 0, serious: 0, moderate: 0, minor: 0 };

    for (const page of pages) {
        const latestScan = page.scanResults[0];
        if (latestScan) {
            checkedPages++;
            scoreSum += latestScan.score;
            totalIssues += latestScan.violations.length;
            for (const v of latestScan.violations) {
                impact[v.impact]++;
            }
        }
    }

    return {
        score: checkedPages > 0 ? Math.round(scoreSum / checkedPages) : 0,
        totalPages: pages.length,
        checkedPages,
        issues: impact,
        trend: [],
    };
}
