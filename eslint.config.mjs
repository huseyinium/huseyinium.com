import coreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...coreWebVitals,
  {
    // react-hooks/immutability is an experimental React Compiler rule that
    // doesn't understand R3F's useFrame animation loop — mutating camera,
    // geometry attributes, and shader uniforms inside useFrame is the
    // canonical R3F pattern and is intentional.
    files: ['components/3d/**/*.tsx', 'components/3d/**/*.ts'],
    rules: {
      'react-hooks/immutability': 'off',
    },
  },
]

export default config
