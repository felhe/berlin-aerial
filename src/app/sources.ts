const SOURCES = {
  'berlin-1928': {
    name: 'Luftbilder',
    year: 1928,
    url: 'berlin-1928',
  },
  'berlin-1953': {
    name: 'Luftbilder',
    year: 1953,
    url: 'berlin-1953',
  },
  'berlin-2004': {
    name: 'Luftbilder',
    year: 2004,
    url: 'berlin-2004-dop25rgb',
  },
  'berlin-2006': {
    name: 'Luftbilder',
    year: 2006,
    url: 'berlin-2006-dop15pan',
  },
  'berlin-2007': {
    name: 'Luftbilder',
    year: 2007,
    url: 'berlin-2007-dop20rgb',
  },
  'berlin-2010': {
    name: 'Luftbilder',
    year: 2010,
    url: 'berlin-2010-dop20rgb',
  },
  'berlin-2014': {
    name: 'Luftbilder',
    year: 2014,
    url: 'berlin-2014-dop20rgb',
  },
  'berlin-2015': {
    name: 'Luftbilder',
    year: 2015,
    url: 'berlin-2015-dop20rgb',
  },
  'berlin-2016': {
    name: 'Luftbilder',
    year: 2016,
    url: 'berlin-2016-dop20rgb',
  },
  'berlin-2017': {
    name: 'Luftbilder',
    year: 2017,
    url: 'berlin-2017-dop20rgb',
  },
  'berlin-2018': {
    name: 'Luftbilder',
    year: 2018,
    url: 'berlin-2018-dop20rgb',
  },
  'berlin-2019': {
    name: 'Luftbilder',
    year: 2019,
    url: 'berlin-2019-dop20rgb',
  },
  'berlin-2020': {
    name: 'Luftbilder',
    year: 2020,
    url: 'berlin-2020-dop20rgb',
  },
  'berlin-2021': {
    name: 'Luftbilder',
    year: 2021,
    url: 'berlin-2021-dop20rgbi',
  },
  'berlin-2022': {
    name: 'Luftbilder',
    year: 2022,
    url: 'berlin-2022-dop20rgbi',
  },
  'berlin-2023': {
    name: 'Luftbilder',
    year: 2023,
    url: 'berlin-2023-dop20rgbi',
  },
  'berlin-2024': {
    name: 'Luftbilder',
    year: 2024,
    url: 'berlin-2024-dop20rgbi',
  },
} satisfies Record<string, Source>;

// add label function () => name + year, to all sources but keep the original type
export const TILE_SOURCES = Object.entries(SOURCES).reduce(
  (acc, [key, source]) => {
    acc[key as keyof typeof SOURCES] = {
      ...source,
      label: `${source.name} ${source.year}`,
    };
    return acc;
  },
  {} as Record<keyof typeof SOURCES, Source & { label: string }>,
);

export type Source = {
  name: string;
  year: number;
  url: string;
  label?: string;
};
