import { useState } from 'react'

export function Tabs({ tabs, value, defaultValue, onChange }) {
  const [internalValue, setInternalValue] = useState(defaultValue || tabs[0]?.value)
  const activeTab = value ?? internalValue

  const handleSelect = (nextValue) => {
    if (typeof value === 'undefined') {
      setInternalValue(nextValue)
    }
    onChange?.(nextValue)
  }

  return (
    <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => handleSelect(tab.value)}
          className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
            activeTab === tab.value
              ? 'bg-white text-secondary-900 shadow'
              : 'text-secondary-600 hover:text-secondary-800'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
