export interface ITicket {
  // Id билета
  id: string,
  // Цена в рублях
  price: number,
  // Код авиакомпании (iata)
  companyId: string,
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: string[]
}

export interface ISegment {
  // Id сегмента
  id: string,
  // время вылета туда
  dateStart: number,
  // время прилета туда
  dateEnd: number,
  // Код города (iata)
  origin: string,
  // Код города (iata)
  destination: string,
  // Массив кодов (iata) городов с пересадками
  stops: string[],
  // Общее время перелёта в минутах
  duration: number,
}

export interface ICompany {
  id: string,
  name: string,
  logo: string
}
