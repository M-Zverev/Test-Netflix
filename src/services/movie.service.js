export async function getMovies() {
    const res = await fetch('http://localhost:3001/movies');

    if (!res.ok) {
        throw new Error('Ошибка загрузки фильмов');
    }

    return res.json();
}
