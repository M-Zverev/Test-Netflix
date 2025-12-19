import { useState } from "react";
import { Modal } from "./Modal";

export function MovieCard({ name, image, year, genres, descr, rating }) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <>
            <div
                className="group cursor-pointer rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => setIsOpenModal(true)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => e.key === 'Enter' && setIsOpenModal(true)}
            >
                <div className="relative h-96 sm:h-80 overflow-hidden bg-neutral-800 rounded-lg">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                </div>
                <div className="bg-neutral-900 p-4 border-t border-neutral-800">
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition">{name}</h2>
                    <div className="flex justify-center">
                        <span className="text-lg font-semibold text-neutral-300">{year}</span>
                    </div>
                </div>
            </div>

            {isOpenModal && <Modal onClose={() => setIsOpenModal(false)}>
                <div className="flex flex-col lg:flex-row gap-6 relative max-h-[90vh] overflow-y-auto lg:overflow-visible">
                    <div className="lg:w-1/3 flex-shrink-0">
                        <img
                            src={image}
                            alt={name}
                            className="w-full aspect-video lg:aspect-[2/3] object-cover rounded-lg"
                        />
                    </div>
                    <div className="lg:w-2/3 flex flex-col justify-between pr-20">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">{name}</h2>
                            <p className="text-lg text-neutral-400 mb-4">{year}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {genres.map((genre, i) => (
                                    <span key={i} className="px-3 py-1 bg-neutral-700 rounded-full text-xs font-semibold text-neutral-200">
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex-grow mb-4">
                            {descr && <p className="text-neutral-300 text-sm leading-relaxed line-clamp-4">{descr}</p>}
                        </div>
                    </div>
                    {rating && (
                        <div className="absolute bottom-0 right-0 bg-neutral-800 rounded-lg px-4 py-3 inline-flex items-center">
                            <span className="text-2xl font-bold text-white">{rating}</span>
                        </div>
                    )}
                </div>
            </Modal>}
        </>
    )
}