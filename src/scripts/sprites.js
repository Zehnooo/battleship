const images = require.context('../assets/ships', false, /\.png$/);

export const getShipImage = (shipType, orientation, variant = 1) => {
    const name = shipType.toLowerCase().replaceAll('_', '-');

    return images(`./${name}-${orientation}-${variant}.png`);
};