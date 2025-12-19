import './App.css'
import { useEffect, useState } from 'react'
import { MovieCard } from './components/MovieCard'
import { getMovies } from './services/movie.service'
import { useDebounce } from './hooks/useDebounce'

function App() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    const debouncedSearch = useDebounce(searchTerm, 500)

    useEffect(() => {
        setLoading(true)
        setError('')

        getMovies()
            .then(data => setMovies(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    const filteredMovies = movies.filter(movie =>
        movie.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
            <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-sm px-6 py-6 sm:px-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                        🎬 Каталог фильмов
                    </h1>
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Поиск фильма..."
                        className="w-full md:w-64 px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white"
                    />
                </div>
            </header>

            <main className="max-w-full lg:max-w-screen-xl mx-auto px-6 py-10 sm:px-10">
                {loading && (
                    <p className="text-neutral-400 text-center py-20">
                        ⏳ Загрузка фильмов...
                    </p>
                )}

                {error && (
                    <p className="text-red-500 text-center py-20">
                        ❌ {error}
                    </p>
                )}

                {!loading && !error && filteredMovies.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredMovies.map(movie => (
                            <MovieCard key={movie.id} {...movie} />
                        ))}
                    </div>
                )}

                {!loading && !error && filteredMovies.length === 0 && (
                    <div className="flex justify-center py-20">
                        <p className="text-neutral-400">🔍 Фильмы не найдены</p>
                    </div>
                )}
            </main>
        </div>
    )
}

export default App
