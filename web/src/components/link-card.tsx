import {  Copy, Trash2 } from 'lucide-react'
import { Button } from './ui/button'

interface LinkCardProps {
    id: string
    code: string
    originalUrl: string
    visitCount: number
    onDelete: () => void
}

export function LinkCard({ id, code, originalUrl, visitCount, onDelete }: LinkCardProps) {
    // Idealmente, esta URL base viria de uma variável de ambiente
    const shortUrl = `brev.ly/${code}`

    function handleCopy() {
        navigator.clipboard.writeText(`http://${shortUrl}`)
        alert('Link copiado!') // Idealmente, usar um "toast"
    }

    return (
        <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 sm:flex-row sm:items-center">
            <div className="flex flex-1 flex-col gap-2 w-[40%]">
                <a
                    href={`http://${shortUrl}`}
                    target="_blank"
                    className="truncate font-semibold text-blue-base hover:underline"
                    rel="noreferrer"
                >
                    {shortUrl}
                </a>
                <span className="truncate text-sm text-gray-400">{originalUrl}</span>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{visitCount} acessos</span>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                </Button>
                <Button variant="secondary" onClick={onDelete}>
                    <Trash2 className="h-4 w-4 text-danger" />
                </Button>
            </div>
        </div>
    )
}