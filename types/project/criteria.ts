interface Criterion {
    id: string;
    title: string;
    level: 'A' | 'AA' | 'AAA';
    principle?: string;
    outcome?: string;
    observations?: string;
}
