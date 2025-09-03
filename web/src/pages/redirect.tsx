import { useQuery } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import logo from '../assets/Logo.svg'
import { api } from '../lib/axios'

export function RedirectPage() {
    const navigate = useNavigate()
    const { code } = useParams<{ code: string }>()

    const {
        data: link,
        isError,
        isSuccess,
    } = useQuery({
        queryKey: ['get-link', code],
        queryFn: async () => {
            const response = await api.get(`/api/links/${code}`)
            return response.data
        },
        retry: false,
    })

    useEffect(() => {
        if (isSuccess && link) {
            setTimeout(() => {
                window.location.href = link.originalUrl
            }, 500)
        }

        if (isError) {
            navigate('/not-found')
        }
    }, [isSuccess, isError, link, navigate])

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-100">
            <div className="flex flex-col items-center gap-6 rounded-lg bg-white p-12 shadow-sm">
                <img src={logo} alt="Logo da Brev.ly" className="h-8" />
                <h1 className="text-2xl font-bold">Redirecionando...</h1>
                <LoaderCircle className="h-8 w-8 animate-spin text-blue-base" />
                <p className="text-center text-sm text-gray-400">
                    O link será aberto automaticamente em alguns instantes.
                    <br />
                    Não foi redirecionado?{' '}
                    {link ? (
                        <a href={link.originalUrl} className="text-blue-base hover:underline">
                            Acesse aqui
                        </a>
                    ) : (
                        <span className="text-gray-400">Acesse aqui</span>
                    )}
                </p>
            </div>
        </div>
    )
}