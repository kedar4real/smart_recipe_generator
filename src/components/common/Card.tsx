import { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
}

export function Card({ children, hover = false, className = '', ...props }: CardProps) {
  const hoverClasses = hover
    ? 'transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer'
    : ''

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

