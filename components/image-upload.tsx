
import { ImagePlus } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { toast } from 'sonner';

type Props = {
  storeFiles: (files: File[]) => void
  storeImagePreview: (preview: string[]) => void
}

export default function ImageUpload({ storeFiles, storeImagePreview }: Props) {


  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length < 1) return

    const filesArray = Array.from(e.target.files)
    if (filesArray.length > 5) {
      toast.error('You can only upload up to 5 files')
      return
    }
    storeFiles(filesArray)

    const filesRes = filesArray.map(file => {
      const reader = new FileReader()

      return new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string)

        reader.onerror = () => reject(new Error("Failed to read file"))
        reader.readAsDataURL(file)
      })
    })

    try {
      const res = await Promise.all(filesRes)
      storeImagePreview(res)

    } catch (error) {
      toast.error("Failed to read files")
    }
  }

  return (
    <div className=' max-w-[500px]'>
      <label htmlFor="file-upload" className='block'>
        <ImagePlus className='text-gray-500' size={20} />
      </label>
      <input onChange={handleChange} type="file" id="file-upload" name='files' multiple className="hidden" />
    </div>

  )

}
