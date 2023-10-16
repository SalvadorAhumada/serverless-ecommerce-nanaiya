
exports.handler = async () => {
    const products = [
        {
            "inventario": "7",
            "descripcion": "Benefícios de este Producto:\n Eliminación de células muertas\n Exfoliación uniforme\n Práctico de aplicar\n Refina la textura de la piel",
            "id": "1",
            "imagen": "https://hinodemexico.vtexassets.com/arquivos/ids/155440-800-auto?v=637778531825070000&width=800&height=auto&aspect=true",
            "nombre": "Exfoliante Corporal Corps Lignea Body Contour 200g",
            "precio": "249,00"
        },
        {
            "inventario": "5",
            "descripcion": "Benefícios de este Producto:\n Hidratación profunda\n Fragancia refrescante\n Fórmula no grasa\n Suaviza la piel",
            "id": "2",
            "imagen": "https://example.com/product2.jpg",
            "nombre": "Crema Hidratante Suave 150ml",
            "precio": "19.99"
        },
        {
            "inventario": "10",
            "descripcion": "Benefícios de este Producto:\n Control de la caspa\n Fortalece el cabello\n Aroma agradable\n Fácil de enjuagar",
            "id": "3",
            "imagen": "https://example.com/product3.jpg",
            "nombre": "Champú Anticaspa Revitalizante 300ml",
            "precio": "12.50"
        },
        {
            "inventario": "3",
            "descripcion": "Benefícios de este Producto:\n Protección solar SPF 50+\n Resistente al agua\n ideal para deportes acuáticos\n Dermatológicamente probado",
            "id": "4",
            "imagen": "https://example.com/product4.jpg",
            "nombre": "Protector Solar Deportivo SPF 50+ 100ml",
            "precio": "9.99"
        },
        {
            "inventario": "6",
            "descripcion": "Benefícios de este Producto:\n Efecto antiarrugas\n Hidratación profunda\n Textura suave\n Apto para todo tipo de piel",
            "id": "5",
            "imagen": "https://example.com/product5.jpg",
            "nombre": "Crema Antiarrugas Regeneradora 50ml",
            "precio": "29.99"
        },
        {
            "inventario": "8",
            "descripcion": "Benefícios de este Producto:\n Aromaterapia relajante\n Alivia el estrés\n Apto para baño de burbujas\n Fragancia suave y duradera",
            "id": "6",
            "imagen": "https://example.com/product6.jpg",
            "nombre": "Aceite de Baño Relajante 250ml",
            "precio": "15.99"
        },
        {
            "inventario": "4",
            "descripcion": "Benefícios de este Producto:\n Frescura todo el día\n Protección duradera\n No irrita la piel\n Libre de aluminio",
            "id": "7",
            "imagen": "https://example.com/product7.jpg",
            "nombre": "Desodorante Roll-On Frescura Duradera 50ml",
            "precio": "7.99"
        },
        {
            "inventario": "9",
            "descripcion": "Benefícios de este Producto:\n Limpieza profunda\n Controla el exceso de grasa\n Ingredientes naturales\n Sin parabenos",
            "id": "8",
            "imagen": "https://example.com/product8.jpg",
            "nombre": "Limpiador Facial Purificante 150ml",
            "precio": "10.99"
        }
    ]
    return {
        statusCode: 200,
        body: JSON.stringify(products),
    }
}