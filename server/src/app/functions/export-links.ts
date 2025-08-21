import { client, db } from '@/infra/db' // client já estava importado
import { links as linksSchema } from '@/infra/db/schemas'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'
import { stringify } from 'csv-stringify'
import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'

export async function exportLinks() {
  const { sql, params } = db
    .select()
    .from(linksSchema)
    .orderBy(linksSchema.createdAt)
    .toSQL()

  const cursor = client.unsafe(sql, params as any[]).cursor(100) // Diminuí um pouco o cursor para testes, pode ajustar

  const csv = stringify({
    header: true,
    columns: [
      { key: 'original_url', header: 'URL original' },
      { key: 'code', header: 'URL encurtada' },
      { key: 'visit_count', header: 'Contagem de acessos' },
      { key: 'created_at', header: 'Data de criação' },
    ],
  })

  const uploadToStorageStream = new PassThrough()

  const exportPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }
        callback()
      },
    }),
    csv,
    uploadToStorageStream,
  )

  const uploadToStorage = uploadFileToStorage({
    contentType: 'text/csv',
    fileName: `brevly-links-${new Date().toISOString()}.csv`,
    contentStream: uploadToStorageStream,
  })

  const [{ url }] = await Promise.all([uploadToStorage, exportPipeline])

  return { reportUrl: url }
}