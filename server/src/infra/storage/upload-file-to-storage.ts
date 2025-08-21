import { env } from '@/env'
import { Upload } from '@aws-sdk/lib-storage'
import { randomUUID } from 'node:crypto'
import { Readable } from 'node:stream'
import { z } from 'zod'
import { r2 } from './client'

const uploadFileToStorageInput = z.object({
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type UploadFileToStorageInput = z.infer<typeof uploadFileToStorageInput>

export async function uploadFileToStorage(input: UploadFileToStorageInput) {
  const { contentStream, contentType, fileName } =
    uploadFileToStorageInput.parse(input)

  const uniqueFileName = `${randomUUID()}-${fileName}`

  const upload = new Upload({
    client: r2,
    params: {
      Key: uniqueFileName,
      Bucket: env.CLOUDFLARE_BUCKET,
      Body: contentStream,
      ContentType: contentType,
    },
  })

  await upload.done()

  const baseUrl = env.CLOUDFLARE_PUBLIC_URL.replace(/\/$/, '')
  const url = `${baseUrl}/${uniqueFileName}`

  return { url }
}