import { prisma } from 'lib/prisma';

export async function getClientPagesWithScore(projectId: string) {
  const pages = await prisma.page.findMany({
    where: { projectId },
    include: {
      scanResults: {
        include: { violations: true },
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  return pages.map((page) => {
    const latestScan = page.scanResults[0];

    const violations = latestScan?.violations || [];

    const impactWeights: Record<string, number> = {
      CRITICAL: 4,
      SERIOUS: 3,
      MODERATE: 2,
      MINOR: 1,
    };

    const totalWeight = violations.reduce(
      (sum, v) => sum + (impactWeights[v.impact] || 0),
      0
    );
    const score = violations.length > 0
      ? Math.max(0, 100 - totalWeight * 2)
      : 100;

    const status: 'Compliant' | 'Partial' | 'Not Compliant' =
      score >= 90 ? 'Compliant' : score >= 70 ? 'Partial' : 'Not Compliant';

    return {
      id: page.id,
      url: page.url,
      score,
      issues: violations.length,
      status,
    };
  });
}
