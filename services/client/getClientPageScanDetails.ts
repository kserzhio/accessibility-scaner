import { prisma } from 'lib/prisma';
function calculateScanStats(violations: { impact: string }[]) {
    const impactWeights = { CRITICAL: 4, SERIOUS: 3, MODERATE: 2, MINOR: 1 };

    const total = violations.length;
    const totalWeight = violations.reduce(
        (sum, v) => sum + (impactWeights[v.impact] || 0),
        0
    );
    const score = total > 0 ? Math.max(0, 100 - totalWeight * 2) : 100;

    return { score, totalIssues: total };
}
export async function getClientPageScanDetails(pageId: string) {
    const page = await prisma.page.findUnique({
        where: { id: pageId },
        include: {
            scanResults: {
                include: { violations: true },
                orderBy: { createdAt: 'desc' },
                take: 1,
            },
        },
    });

    if (!page || !page.scanResults[0]) {
        throw new Error('Scan not found');
    }

    const scan = page.scanResults[0];
    const { score, totalIssues } = calculateScanStats(scan.violations);

    return {
        id: scan.id,
        createdAt: scan.createdAt,
        page: { id: page.id, url: page.url },
        totalIssues,
        score,
        violations: scan.violations,
    };
}
