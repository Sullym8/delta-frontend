import { Driver } from '../types/driver';

export const driverlist: Driver[] = [
    {
    driverCode: 'PIA',
    driverName: 'Oscar Piastri',
    teamName: 'McLaren Racing',
    cost: 32.1,
    deltaCost: 0.6,
    driverImage: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png',
    teamImage: 'src/assets/mclaren.png',
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
    cost: 32.1,
    deltaCost: 0.6,
    driverImage: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png',
    teamImage: 'src/assets/mclaren.png',
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
    cost: 32.1,
    deltaCost: 0.6,
    driverImage: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png',
    teamImage: 'src/assets/mclaren.png',
    colors : {
        main: '#001526', // Red Bull Blue
        accent: '#0073D0' // Blue for text highlights
    }
  },
  
  {
    driverCode: 'LEC',
    driverName: 'Charles Leclerc',
    teamName: 'Scuderia Ferrari',
    cost: 35.0,
    deltaCost: 0.5,
    driverImage: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png',
    teamImage: 'src/assets/mclaren.png',
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
    cost: 35.0,
    deltaCost: 0.5,
    driverImage: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png',
    teamImage: 'src/assets/mclaren.png',
    colors : {
        main: '#0A5A4F', // Ferrari Red
        accent: '#CEDC00', // White for text highlights
    }
  }
];