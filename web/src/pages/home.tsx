import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Download, Link, LoaderCircle } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import logo from '../assets/Logo.svg'
import { LinkCard } from '../components/link-card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { api } from '../lib/axios'
import Swal from 'sweetalert2'

interface Link {
    id: string
    code: string
    originalUrl: string
    visitCount: number
    createdAt: string
}

export function HomePage() {
    const [url, setUrl] = useState('')
    const [code, setCode] = useState('')
    const queryClient = useQueryClient()

    const { data: links, isLoading } = useQuery<Link[]>({
        queryKey: ['get-links'],
        queryFn: async () => {
            const response = await api.get('/links')
            return response.data.links
        },
    })

    const { mutateAsync: createLink, isPending } = useMutation({
        mutationFn: async ({ url, code }: { url: string; code: string }) => {
            await api.post('/links', { url, code })
        },
        onSuccess: () => {
            setUrl('')
            setCode('')
            queryClient.invalidateQueries({ queryKey: ['get-links'] })
        },
        onError: (error) => {
            console.error(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Erro ao criar o link. O código já pode existir.',
                confirmButtonColor: '#2C46B1',
            })
        },
    })

    const { mutateAsync: deleteLink } = useMutation({
        mutationFn: async (linkId: string) => {
            await api.delete(`/links/${linkId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-links'] })
        },
        onError: (error) => {
            console.error(error)
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Não foi possível apagar o link.',
                confirmButtonColor: '#2C46B1',
            })
        },
    })

    const { mutateAsync: downloadCsv, isPending: isDownloadingCsv } = useMutation({
        mutationFn: async () => {
            const response = await api.post('/links/export')
            window.open(response.data.reportUrl, '_blank')
        },
        onError: (error) => {
            console.error(error)
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Não foi possível baixar o relatório CSV.',
                confirmButtonColor: '#2C46B1',
            })
        },
    })

    async function handleCreateLink(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!url || !code) return
        await createLink({ url, code })
    }

    return (
        <div className="min-h-screen space-y-8 bg-gray-100 p-6">
            <header className="mx-auto flex max-w-5xl justify-center md:justify-start">
                <img src={logo} alt="Logo da Brev.ly" className="h-8" />
            </header>
            <main className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-bold text-gray-600">Novo link</h2>
                        <form onSubmit={handleCreateLink} className="space-y-4">
                            <div className="space-y-1">
                                <label
                                    htmlFor="originalUrl"
                                    className="text-xs font-semibold uppercase text-gray-400"
                                >
                                    Link Original
                                </label>
                                <Input
                                    id="originalUrl"
                                    placeholder="www.exemplo.com.br"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label
                                    htmlFor="code"
                                    className="text-xs font-semibold uppercase text-gray-400"
                                >
                                    Link Encurtado
                                </label>
                                <div className="relative">
                                    <Input
                                        id="code"
                                        placeholder="brev.ly/"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                type="submit"
                                className="w-full"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        Salvar link
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-600">Meus links</h2>
                            <Button
                                variant="secondary"
                                onClick={() => downloadCsv()}
                                disabled={isDownloadingCsv}
                            >
                                {isDownloadingCsv ? (
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Download className="mr-2 h-4 w-4" />
                                )}
                                Baixar CSV
                            </Button>
                        </div>

                        {isLoading && <p>A carregar links...</p>}

                        {links && links.length > 0 ? (
                            <div className="space-y-4">
                                {links.map((link) => (
                                    <LinkCard
                                        key={link.id}
                                        id={link.id}
                                        code={link.code}
                                        originalUrl={link.originalUrl}
                                        visitCount={link.visitCount}
                                        onDelete={() => deleteLink(link.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            !isLoading && (
                                <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-dashed border-gray-300 py-12">
                                    <Link className="h-8 w-8 text-gray-400" />
                                    <p className="text-sm font-semibold uppercase text-gray-400">
                                        Ainda não existem links cadastrados
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}