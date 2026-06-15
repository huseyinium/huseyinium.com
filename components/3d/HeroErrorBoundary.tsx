import { Component, type ReactNode } from 'react'
import { StaticHeroFallback } from './StaticHeroFallback'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class HeroErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return <StaticHeroFallback />
    return this.props.children
  }
}
