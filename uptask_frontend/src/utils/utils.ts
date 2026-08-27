
export function formatDate(isoString: string) : string {
  const date = new Date(isoString)
  const formatter = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month:'long',
    day:'numeric'
  })

  return formatter.format(date)
}
//formatea la fecha en algo mas amigable para el usuario