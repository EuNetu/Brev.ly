import { Link as RouterLink } from 'react-router-dom'
import imagem404 from '../assets/404.svg'

export function NotFoundPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
            <div className="flex flex-col items-center gap-6 rounded-lg bg-white p-12 text-center shadow-sm">
                <img src={imagem404} alt="Logo da Brev.ly"  />
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-600">Link não encontrado</h2>
                    <p className="max-w-sm text-sm text-gray-400">
                        O link que você está tentando acessar não existe, foi removido ou é
                        uma URL inválida. Saiba mais em{' '}
                        <RouterLink to="/" className="text-blue-base hover:underline">
                            brev.ly
                        </RouterLink>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}