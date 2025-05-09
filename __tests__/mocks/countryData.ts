export const mockCountries = [
  {
    name: {
      common: "United States",
      official: "United States of America",
      nativeName: {
        eng: {
          official: "United States of America",
          common: "United States",
        },
      },
    },
    capital: ["Washington, D.C."],
    region: "Americas",
    subregion: "North America",
    population: 329484123,
    flags: {
      png: "https://flagcdn.com/w320/us.png",
      svg: "https://flagcdn.com/us.svg",
      alt: "The flag of the United States of America is composed of thirteen equal horizontal stripes of red alternating with white, with a blue rectangle bearing fifty small white five-pointed stars arranged in nine rows where rows of six stars alternate with rows of five stars. The fifty stars represent the fifty states while the thirteen stripes represent the original thirteen colonies.",
    },
    languages: {
      eng: "English",
    },
    borders: ["CAN", "MEX"],
    currencies: {
      USD: {
        name: "United States dollar",
        symbol: "$",
      },
    },
    cca3: "USA",
    area: 9372610,
    timezones: [
      "UTC-12:00",
      "UTC-11:00",
      "UTC-10:00",
      "UTC-09:00",
      "UTC-08:00",
      "UTC-07:00",
      "UTC-06:00",
      "UTC-05:00",
      "UTC-04:00",
      "UTC+10:00",
      "UTC+12:00",
    ],
  },
  {
    name: {
      common: "Germany",
      official: "Federal Republic of Germany",
      nativeName: {
        deu: {
          official: "Bundesrepublik Deutschland",
          common: "Deutschland",
        },
      },
    },
    capital: ["Berlin"],
    region: "Europe",
    subregion: "Western Europe",
    population: 83240525,
    flags: {
      png: "https://flagcdn.com/w320/de.png",
      svg: "https://flagcdn.com/de.svg",
      alt: "The flag of Germany is composed of three equal horizontal bands of black, red and gold.",
    },
    languages: {
      deu: "German",
    },
    borders: ["AUT", "BEL", "CZE", "DNK", "FRA", "LUX", "NLD", "POL", "CHE"],
    currencies: {
      EUR: {
        name: "Euro",
        symbol: "€",
      },
    },
    cca3: "DEU",
    area: 357114,
    timezones: ["UTC+01:00"],
  },
  {
    name: {
      common: "Japan",
      official: "Japan",
      nativeName: {
        jpn: {
          official: "日本",
          common: "日本",
        },
      },
    },
    capital: ["Tokyo"],
    region: "Asia",
    subregion: "Eastern Asia",
    population: 125836021,
    flags: {
      png: "https://flagcdn.com/w320/jp.png",
      svg: "https://flagcdn.com/jp.svg",
      alt: "The flag of Japan has a white rectangular field bearing a crimson-red circle at its center.",
    },
    languages: {
      jpn: "Japanese",
    },
    borders: [],
    currencies: {
      JPY: {
        name: "Japanese yen",
        symbol: "¥",
      },
    },
    cca3: "JPN",
    area: 377930,
    timezones: ["UTC+09:00"],
  },
]

export const mockBorderCountries = [
  {
    name: {
      common: "Canada",
    },
    cca3: "CAN",
  },
  {
    name: {
      common: "Mexico",
    },
    cca3: "MEX",
  },
]

export const mockLanguages = ["English", "German", "Japanese", "French", "Spanish"]
