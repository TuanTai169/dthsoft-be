import moment from "moment"

export const totalRoomCharge = (rooms, checkInDate, checkOutDate) => {
  let total

  const hourDiff = getNumberOfHour(checkInDate, checkOutDate)

  const sumRoomsPrice = rooms
    .map((item) => item.price)
    .reduce((prev, curr) => prev + curr, 0)

  if (hourDiff < 24) {
    total = priceInHour(hourDiff, sumRoomsPrice)
  } else {
    const early = earlyCheckIn(checkInDate, sumRoomsPrice)
    const late = lateCheckOut(checkOutDate, sumRoomsPrice)

    total =
      ((hourDiff - early.hour - late.hour) * sumRoomsPrice) / 24 +
      early.price +
      late.price
  }

  return total
}

const getNumberOfHour = (checkInDate, checkOutDate) => {
  const start = moment(checkInDate, "YYYY-MM-DD HH:mm")
  const end = moment(checkOutDate, "YYYY-MM-DD HH:mm")
  //Difference in number of days
  const hourDiff = moment.duration(end.diff(start)).asHours()
  return hourDiff
}
const earlyCheckIn = (checkInDate, roomCharge) => {
  let early = {}

  const start = moment(checkInDate, "YYYY-MM-DD HH:mm")
  const end = moment(checkInDate, "YYYY-MM-DD").set({
    hours: 12,
    minutes: 0,
  })

  //Difference in number of days
  const diff = moment.duration(end.diff(start)).asHours()
  early["hour"] = diff

  if (diff <= 4 && diff > 0) {
    early["price"] = 0.3 * roomCharge
  } else if (diff <= 7 && diff > 4) {
    early["price"] = 0.5 * roomCharge
  } else if (diff > 7) {
    early["price"] = 1 * roomCharge
  } else {
    early["price"] = 0 * roomCharge
  }
  return early
}

const lateCheckOut = (checkOutDate, roomCharge) => {
  let late = {}

  const start = moment(checkOutDate, "YYYY-MM-DD").set({
    hours: 12,
    minutes: 0,
  })
  const end = moment(checkOutDate, "YYYY-MM-DD HH:mm")

  //Difference in number of days
  const diff = moment.duration(end.diff(start)).asHours()
  late["hour"] = diff

  if (diff <= 3 && diff > 0) {
    late["price"] = 0.3 * roomCharge
  } else if (diff <= 6 && diff > 3) {
    late["price"] = 0.5 * roomCharge
  } else if (diff > 6) {
    late["price"] = 1 * roomCharge
  } else {
    late["price"] = 0 * roomCharge
  }
  return late
}
const priceInHour = (hourDiff, roomCharge) => {
  let price = 0
  if (hourDiff < 2) {
    price = 0.6 * roomCharge
  } else {
    price = 0.6 * roomCharge + (0.4 * roomCharge * (hourDiff - 2)) / 22
  }
  return price
}
