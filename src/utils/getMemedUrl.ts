export const getMemedURL = (api = false) => {
  const base = `memed.com.br`;
  const AMBIENT = process.env.REACT_APP_MEMED_AMBIENT

  return `${base}`;
  // if (AMBIENT === 'beta') return `beta.${base}`

  // return base
}
