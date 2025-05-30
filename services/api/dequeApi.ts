export const fetchDequeInfo = async (url: string) => {
    const res = await fetch(`/api/deque-info?url=${encodeURIComponent(url)}`);
    if (!res.ok) throw new Error('Failed to fetch Deque info');
    return res.json(); // очікуємо, що повертається вже HTML-блоки
};