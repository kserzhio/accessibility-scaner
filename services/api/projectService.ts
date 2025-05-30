import { CreateProjectFormValues } from 'lib/validators/createProjectSchema';

export const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    if (!res.ok) throw new Error('Failed to fetch projects');
    const data = await res.json();
    return data.projects;
};
export const fetchProjectSummary = async (projectId: string) => {
    const res = await fetch(`/api/projects/${projectId}/summary`);
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || 'Failed to fetch project summary');
    }

    return res.json();
};
export const fetchProjectMembers = async (projectId: string) => {
    const res = await fetch(`/api/projects/${projectId}/members`);
    if (!res.ok) throw new Error('Failed to fetch members');
    const data = await res.json();
    return data.members;
};

export const assignUserToProject = async (projectId: string, userEmail: string) => {
    const res = await fetch('/api/projects/access/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, userEmail }),
    });
    if (!res.ok) throw new Error('Failed to assign user');
    return res.json();
};
export const removeUserFromProject = async (projectId: string, userId: string) => {
    const res = await fetch('/api/projects/access/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, userId }),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.message || 'Failed to remove user');
    }

    return res.json();
};


export const createProject = async (data: CreateProjectFormValues) => {
    const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || 'Failed to create project');
    }

    return res.json();
};
export const fetchProjectPages = async (projectId: string) => {
    const res = await fetch(`/api/projects/${projectId}/pages`);
    if (!res.ok) throw new Error('Failed to fetch pages');
    const data = await res.json();
    return data.pages || [];
};

export const scanAllPages = async (projectId: string) => {
    const res = await fetch(`/api/projects/${projectId}/scan`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to scan project');
    return res.json(); // { results: [...] }
};

export const scanSinglePage = async (pageId: string) => {
    const res = await fetch(`/api/pages/${pageId}/scan`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to scan page');
    return res.json();
};

export const addPageToProject = async (projectId: string, url: string) => {
    const res = await fetch(`/api/projects/${projectId}/pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
    });
    if (!res.ok) throw new Error('Failed to add page');
    return res.json();
};
export const fetchPageScanDetails = async (projectId: string, pageId: string) => {
    const res = await fetch(`/api/projects/${projectId}/pages/${pageId}/details`);
    if (!res.ok) throw new Error('Failed to fetch scan details');
    const data = await res.json();
    return data.scanResult;
};


export const updateAuditCriterion = async (
    projectId: string,
    criterionId: string,
    update: { outcome: string; observations: string }
) => {
    const res = await fetch(`/api/projects/${projectId}/audit/${criterionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || 'Failed to update criterion');
    }

    return res.json();
};
export const fetchAuditCriteria = async (projectId: string): Promise<Criterion[]> => {
    const res = await fetch(`/api/projects/${projectId}/audit`);
    if (!res.ok) throw new Error('Failed to fetch audit criteria');
    const data = await res.json();
    return data.criteria;
};

export const completeAudit = async (projectId: string): Promise<{ success: boolean }> => {
    const res = await fetch(`/api/projects/${projectId}/complete`, {
        method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to complete audit');
    return res.json();
};