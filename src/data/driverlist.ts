import { Driver } from '../types/driver';

export const driverlist: Driver[] = [
    {
    driverCode: 'PIA',
    driverName: 'Oscar Piastri',
    teamName: 'McLaren Racing',
    cost: 25.2,
    deltaCost: 0.6,
    driverImage: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png',
    teamImage: 'src/assets/mclaren.avif',
    colors : {
        main: '#DE6A10', // McLaren Papaya
        accent: '#000000', // White for text highlights
        secondary: '#FF8700'
    }
  },
  {
    driverCode: 'NOR',
    driverName: 'Lando Norris',
    teamName: 'McLaren Racing',
    cost: 31.0,
    deltaCost: 0.6,
    driverImage: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png',
    teamImage: 'src/assets/mclaren.avif',
    colors : {
        main: '#DE6A10', // McLaren Papaya
        accent: '#000000', // White for text highlights
        secondary: '#FF8700'
    }
  },
  {
    driverCode: 'VER',
    driverName: 'Max Verstappen',
    teamName: 'Red Bull Racing',
    cost: 29.2,
    deltaCost: 0.6,
    driverImage: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png',
    teamImage: 'src/assets/redbull.avif',
    colors : {
        main: '#001526', // Red Bull Blue
        accent: '#0073D0' // Blue for text highlights
    }
  },
  
  {
    driverCode: 'LEC',
    driverName: 'Charles Leclerc',
    teamName: 'Scuderia Ferrari',
    cost: 24.3,
    deltaCost: 0.5,
    driverImage: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png',
    teamImage: 'src/assets/ferrari.avif',
    colors : {
        main: '#B41726', // Ferrari Red
        accent: '#FFFFFF', // White for text highlights
        secondary: '#B41726'
    }
  },

  {
    driverCode: 'ALO',
    driverName: 'Fernando Alonso',
    teamName: 'Aston Martin',
    cost: 5.1,
    deltaCost: 0.5,
    driverImage: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png',
    teamImage: 'src/assets/aston_martin.avif',
    colors : {
        main: '#0A5A4F', // Ferrari Red
        accent: '#CEDC00', // White for text highlights
    }
  },
  {
    driverCode: 'SAI',
    driverName: 'Carlos Sainz',
    teamName: 'Williams Racing',
    cost: 8.3,
    deltaCost: 0.5,
    driverImage: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png',
    teamImage: 'src/assets/williams.avif',
    colors : {
        main: '#041E42', // Williams Blue
        accent: '#FFFFFF', // White for text highlights
    }
  },
  {
    driverCode: 'RUS',
    driverName: 'George Russell',
    teamName: 'Mercedes-AMG Petronas',
    cost: 22.0,
    deltaCost: 0.5,
    driverImage: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png',
    teamImage: 'src/assets/mercedes.avif',
    colors : {
        main: '#00d7b7', // Mercedes Teal
        accent: '#000000', // White for text highlights
        secondary: '#FFFFFF' // White for text highlights
    }
  }, 
  {
    driverCode: 'LAW',
    driverName: 'Liam Lawson',
    teamName: 'Racing Bulls',
    cost: 4.8,
    deltaCost: 0.5,
    driverImage: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png',
    teamImage: 'src/assets/vcarb.avif',
    colors : {
        main: '#1433C9',
        accent: '#FFFFFF'

    }
  }, 
  {
    driverCode: 'BEA',
    driverName: 'Oliver Bearman',
    teamName: 'Haas F1 Team',
    cost: 6.7,
    deltaCost: 0.5,
    driverImage: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png',
    teamImage: 'src/assets/haas.avif',
    colors : {
        main: '#000',
        accent: '#D92A1C', // Haas Red
        secondary: '#FFFFFF', // White for text highlights
    }
  }, 
  {
    driverCode: 'GAS',
    driverName: 'Pierre Gasly',
    teamName: 'Alpine F1 Team',
    cost: 5.8,
    deltaCost: 0.5,
    driverImage: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png',
    teamImage: 'src/assets/alpine.avif',
    colors : {
        accent: '#FF87BC', // Alpine Blue
        main: '#061A4D', // White for text highlights
    }
  },
    {
    driverCode: 'HUL',
    driverName: 'Nico Hülkenberg',
    teamName: 'Kick Sauber',
    cost: 7.2,
    deltaCost: 0.5,
    driverImage: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png',
    teamImage: 'src/assets/kick_sauber.avif',
    colors : {
        main: '#07C00F', // Alpine Blue
        accent: '#00000', // White for text highlights
    }
  }
];