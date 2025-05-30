import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ClientProject {
  projectId: string;
  projectName: string;
  status: 'active' | 'completed';
}

interface ProjectContextValue {
  project: ClientProject | null;
  loading: boolean;
}

const ProjectContext = createContext<ProjectContextValue>({
  project: null,
  loading: true,
});

export function useClientProject() {
  return useContext(ProjectContext);
}

export function ClientProjectProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<ClientProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch('/api/client/projects', { credentials: 'include' });
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error('Failed to load project', err);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, []);

  return (
    <ProjectContext.Provider value={{ project, loading }}>
      {children}
    </ProjectContext.Provider>
  );
}
