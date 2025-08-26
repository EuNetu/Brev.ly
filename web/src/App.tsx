import { useMutation } from '@tanstack/react-query'
import { Link, LoaderCircle, PlusCircle } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { api } from './lib/axios'

export function App() {
  const [url, setUrl] = useState('')
  const [code, setCode] = useState('')

  const { mutateAsync: createLink, isPending } = useMutation({
    mutationFn: async ({ url, code }: { url: string; code: string }) => {
      await api.post('/links', { url, code })
    },
    onSuccess: () => {
      // Limpa os campos após o sucesso
      setUrl('')
      setCode('')
      // Futuramente, vamos invalidar a query de listagem para atualizar a lista
      alert('Link criado com sucesso!')
    },
    onError: (error) => {
      // Idealmente, usaríamos uma biblioteca de "toasts" para mostrar erros
      console.error(error)
      alert('Erro ao criar o link. Verifique a consola.')
    },
  })

  async function handleCreateLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!url || !code) {
      return
    }

    await createLink({ url, code })
  }

  return (
    <div className="min-h-screen space-y-8 bg-gray-100 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-600">Brev.ly</h1>
      </header>

      <main className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-600">Novo link</h2>
          <form
            onSubmit={handleCreateLink}
            className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 sm:flex-row"
          >
            <div className="relative flex-1">
              <Link className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Digite ou cole o link original"
                className="pl-10"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            <div className="relative flex-1 sm:max-w-[240px]">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                brev.ly/
              </span>
              <Input
                placeholder="slug-personalizado"
                className="pl-[68px]"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <PlusCircle className="h-4 w-4" />
              )}
              Salvar link
            </Button>
          </form>
        </div>

        <div className="h-px w-full bg-gray-300" />

        <div>
          <h2 className="text-xl font-semibold text-gray-600">Meus links</h2>
          {/* A listagem dos links virá aqui */}
        </div>
      </main>
    </div>
  )
}