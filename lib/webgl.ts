export function checkWebGLSupport(): boolean {
  try {
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    return false
  }
}

export function getNodeCount(): number {
  return navigator.maxTouchPoints > 0 ? 150 : 500
}
