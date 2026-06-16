interface Props {
  children: React.ReactNode
  className?: string
}

export function Prose({ children, className = '' }: Props) {
  return <div className={['prose-content', className].filter(Boolean).join(' ')}>{children}</div>
}
