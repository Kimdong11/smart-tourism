export const makeUrl = (img: string, width: string = "w500") =>
    `https://image.tmdb.org/t/p/${width}${img}`;

export const makeUri = (img: string) =>
    `http://203.253.207.111:8080/jsmith_image${img}`;
