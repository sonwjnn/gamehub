const config = {
  isProduction: process.env.NODE_ENV === 'production',
  socketURI:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : `http://${window.location.hostname}:8080/`,
}

export default config
