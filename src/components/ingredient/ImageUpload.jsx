import { useRef, useState } from 'react'
import { useImageRecognition } from '@/hooks/useImageRecognition.js'

export function ImageUpload({ onIngredientsDetected }) {
  const fileInputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const { results, loading, error, analyze } = useImageRecognition()

  const handleFiles = async (files) => {
    const file = files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    await analyze(file)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    handleFiles(event.dataTransfer.files)
  }

  const handleAddAll = () => {
    if (results.length === 0) return
    onIngredientsDetected?.(results.map((item) => item.name))
  }

  return (
    <div className="surface-panel p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-500">
            Ingredient scan
          </p>
          <h3 className="text-lg font-semibold text-secondary-900">Upload your fridge</h3>
        </div>
        <img src="/images/icons/camera.svg" alt="" className="h-10 w-10" />
      </div>

      <div
        className="mt-4 flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-secondary-200 bg-white/90 px-4 py-6 text-center text-secondary-600 transition hover:border-primary-300 hover:bg-primary-50/40"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
      >
        {preview ? (
          <img
            src={preview}
            alt="Ingredient upload preview"
            className="h-36 w-full rounded-2xl object-cover shadow-md"
          />
        ) : (
          <p className="text-sm font-semibold text-secondary-700">
            Drag a pantry photo or tap browse
          </p>
        )}
        <button
          type="button"
          className="rounded-full border border-primary-300 px-5 py-2 text-sm font-semibold text-primary-700 shadow-sm hover:bg-primary-100"
          onClick={() => fileInputRef.current?.click()}
        >
          Browse files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />
        <p className="text-xs text-secondary-500">PNG or JPG · up to 5MB</p>
      </div>

      {loading && (
        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-secondary-600 shadow animate-pulse">
          <span className="h-3 w-3 rounded-full bg-primary-400" />
          Analyzing your image…
        </div>
      )}

      {error && (
        <div className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      {results.length > 0 && !loading && (
        <div className="mt-4 space-y-3 rounded-3xl border border-secondary-100 bg-white/90 p-4 shadow-inner">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-secondary-800">Detected ingredients</p>
            <button
              type="button"
              onClick={handleAddAll}
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              Add all
            </button>
          </div>
          <ul className="space-y-2 text-sm text-secondary-700">
            {results.map((result) => (
              <li
                key={result.name}
                className="flex items-center justify-between rounded-2xl bg-secondary-50/80 px-3 py-2"
              >
                <span>{result.name}</span>
                <span className="text-xs text-secondary-500">
                  {(result.confidence * 100).toFixed(0)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
