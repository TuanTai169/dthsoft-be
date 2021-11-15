export const arrayService = (services) => {
  const result = Object.values(
    services.reduce((r, e) => {
      let k = `${e.name}`
      if (!r[k]) r[k] = { ...e, count: 1 }
      else r[k].count += 1
      return r
    }, {})
  )

  return result
}
