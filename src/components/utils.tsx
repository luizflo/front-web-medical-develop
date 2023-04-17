import Payment from 'payment'

function clearNumber(value: String = '') {
  return value;
}

export function formatCreditCardNumber(value: any) {
  if (!value) {
    return value
  }

  const issuer = Payment.fns.cardType(value)
  const clearValue = clearNumber(value.toString())
  let nextValue

  switch (issuer) {
    case 'amex':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10,
      )} ${clearValue.slice(10, 15)}`
      break
    case 'dinersclub':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10,
      )} ${clearValue.slice(10, 14)}`
      break
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        8,
      )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`
      break
  }

  return nextValue.trim()
}

export function formatCVC(value: String) {
  const clearValue = clearNumber(value.toString())
  let maxLength = 4

  if (value) {
    const issuer = Payment.fns.cardType(value.toString())
    maxLength = issuer === 'amex' ? 4 : 3
  }

  return clearValue.slice(0, maxLength)
}

export function formatExpirationDate(value: String) {
  const clearValue = clearNumber(value.toString())

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`
  }

  return clearValue
}

export function formatDate(date: string) {
  if (date) {
    let dateText = date.split('T')
    let dateFormat = new Date(date)
    let month = dateFormat.getMonth() + 1
    let day = dateFormat.getDate()
    let year = dateFormat.getFullYear()
    let dateFormatedSlash =
      (day < 10 ? '0' : '') +
      day +
      '/' +
      (month < 10 ? '0' : '') +
      month +
      '/' +
      year

    let dateFormatted = dateText[0]
    return dateFormatedSlash
  }
}
export function formatDateToSlots(date: string) {
  if (date) {
    let dateText = date.split("T");
    let dateFormat = new Date(date);
    let month = dateFormat.getMonth() + 1;
    let day = dateFormat.getDate();
    let year = dateFormat.getFullYear();
    let dateFormatedSlash =
      year +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      (day < 10 ? "0" : "") +
      day;
    return dateFormatedSlash;
  }
}

export function formatHour(date: string) {
  if (date) {
    let dateText = date.split('T')
    let dateFormatted = dateText[1].split(':')
    return dateFormatted[0] + ':' + dateFormatted[1]
  }
}
export function calculateAge(date: Date | string) {
  if (date) {
    let birthDate = new Date(date)
    let today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    let m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }
}

export function formatDateWithWeekDay(date: string) {
  const weekDays = [
    'Domingo',
    'Segunda-Feira',
    'Terça-feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-feira',
    'Sábado',
  ]
  const monthName = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]
  if (date) {
    let dateFormat = new Date(date)
    let weekDayName = weekDays[dateFormat.getDay()]
    let monthDateName = monthName[dateFormat.getMonth()]
    let day = dateFormat.getDate()
    let year = dateFormat.getFullYear()
    let dateFormatedSlash =
      weekDayName +
      ', ' +
      (day < 10 ? '0' : '') +
      day +
      ' de ' +
      monthDateName +
      ' de ' +
      year
    return dateFormatedSlash
  }
}
export function formatDateForSlots(date: string, mode: string) {
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const monthName = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  if (date) {
    let dateName = date.split(", ");
    let weekDayName =
      dateName[1].slice(0, 3).charAt(0).toUpperCase() + dateName[1].slice(1, 3);
    let dayAndMonthText = dateName[0].split("/");
    let month = monthName[parseInt(dayAndMonthText[1]) - 1];
    let dateFormated = dayAndMonthText[0] + " " + month;
    return mode === "week" ? weekDayName : dateFormated;
  }
}

export function formatHourRange(date: string) {
  if (date) {
    let dateText = date.split('T')
    let dateFormatted = dateText[1].split(':')
    let minuteFinal = parseInt(dateFormatted[1]) + 20
    return (
      dateFormatted[0] +
      ':' +
      dateFormatted[1] +
      ' às ' +
      dateFormatted[0] +
      ':' +
      minuteFinal +
      ` (20 Minutos)`
    )
  }
}

export function countUniqueValues(value: any) {
  if (value) {
    return new Set(value).size;
  }
}
