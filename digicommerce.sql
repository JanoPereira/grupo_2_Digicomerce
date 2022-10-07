-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-10-2022 a las 03:03:36
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `digicommerce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `file_name` text DEFAULT NULL,
  `products_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `images`
--

INSERT INTO `images` (`id`, `file_name`, `products_id`) VALUES
(1, 'img-te-negro.jpg', 1),
(2, 'img-te-verde.jpg', 2),
(3, 'img-te-verde.jpg', 3),
(4, 'img-te-oolong.jpg', 4),
(5, 'img-te-sakura.jpg', 5),
(6, 'img-te-earl.jpg', 6),
(7, 'img-te-ceylon.jpg', 7),
(8, 'img-te-ceylon.jpg', 8),
(9, 'img-te-blanco.jpg', 9),
(10, 'img-te-berry.jpg', 10),
(11, 'img-te-african.jpg', 11),
(12, 'img-te-english.jpg', 12),
(13, 'img-te-tilo.jpg', 13),
(14, 'img-te-camomilla.jpg', 14),
(15, 'img-te-strawberry.jpg', 15),
(16, 'img-te-fruit.jpg', 16),
(17, 'ac-mate-y-bombilla-.jpg', 17),
(18, 'te-inti-zen-tea-box-de-madera-paraiso-x60-saquitos-011-04990408eeef199b0816470107383842-640-0.jpg', 18),
(19, 'ac-mate-y-bombilla-mathienzo-de-vidrio-forardo-en-cuero-001-fe8c1e673287bed5cc16498753875575-640-0.jpg', 19),
(20, 'ac-bomba-taumer-con-anel-linha-atlas-001-14b5bc5ce7540d33da16563549236508-640-0.jpg', 20),
(21, 'ac-infusor-circular-abierto-para-te-en-hebras-inox-001-26454f4635099b749416554033582686-640-0.jpg', 21),
(22, 'kitorigennegro21-99449998acff48605816425380695425-640-0.png', 22),
(23, 'ac-mate-as-de-bastos-calabaza-sin-virola-001-8f1963bf1a1f92e99c16497761062817-640-0.jpg', 23),
(25, '61006_Cucharita_1000X1000_l-.jpg', 25),
(26, '65272_AllInOneJumboBerry_1000X1000_l-.jpg', 26),
(27, '52154_AllInOneTeapotArabiaSky06L_21000X1000_l-.jpg', 27),
(28, '35115_Cha-Jing.-El-primer-libro-sobre-el-te_1000X1000_l.jpg', 28),
(29, '52155_FrenchPress1L_1000X1000_l-.jpg', 29),
(30, '50017_Hervidor-commodore-blanco-2-1000x1000.jpg', 30),
(31, 'ym-la-oberena.jpg', 31),
(32, 'ym-fidel-organica-con-moringa-oleifera-500gr.jpg', 32),
(33, 'ym-fidel-organica-con-moringa-oleifera-500gr.jpg', 33),
(34, 'ym-arapegua-molida-organica-500gr.jpg', 34),
(35, 'ym-mate-co-bolsita-repuesto-220gr-spicy-choco.jpg', 35),
(36, 'ym-mate-co-lata-220gr-tres-mentas.jpg', 36),
(37, 'ym-la-oberena-organica-bolsa-arpillera.jpg', 37),
(38, 'ym-grapia-milenaria-tradicional.jpg', 38),
(39, 'ym-verdeada-premium-500gr-.jpg', 39),
(40, 'ym-apostolenia-tradicional-.jpg', 40),
(41, 'ym-chamame-tradicional-.jpg', 41),
(42, 'ym-andresito-.jpg', 42),
(43, 'ym-kurupi-menta-y-boldo-.jpg', 43),
(44, 'ym-cachamate-del-litoral-.jpg', 44),
(45, 'ym-adelgamate-compuesta-.jpg', 45),
(46, 'ym-fronteras.jpg', 46),
(69, 'image-1664934735897.jpg', 58),
(70, 'image-1664934735899.jpg', 58),
(71, 'image-1664934735900.jpg', 58),
(72, 'image-1664934735902.jpg', 58),
(73, 'image-1664935500130.jpg', 58);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `discount` tinyint(4) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `featured` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `products_categories_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `discount`, `description`, `featured`, `createdAt`, `updatedAt`, `deletedAt`, `products_categories_id`) VALUES
(1, 'Té Negro', '100.00', 10, 'Un clásico. El Té Negro nos aporta antioxidantes y la teína para mantenernos activos durante todo el día.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 2),
(2, 'Té Verde Sencha', '1000.00', 30, 'Té Sencha de origen Japonés, elaborado con el tradicional proceso de vaporizado. Se caracteriza por contar con mucho cuerpo, sabor refrescante y su suave toque herbal.', 0, '2022-09-09 02:30:17', '2022-10-05 01:43:11', NULL, 2),
(3, 'Té Rojo Pu Erh Royal', '1000.00', 0, 'Pu Erh Chino de la provincia de Yunnan, de hojas de grado superior y fermentación especial. De sabor liso sin astringencia. El Pu Erh es un té de comprobado efecto depurativo y digestivo, considerado como el Té de la salud para la maedicina traidicional China', 1, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 2),
(4, 'Té Azul Oolong', '1500.00', 5, 'Té Oolong semioxidado que ayuda a la digestión y a mantener la vitalidad  durante el día. La flor de azahar acompaña muy bien a este Té Oolong por sus notas aromáticas dulces y florales.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 2),
(5, 'Té Sakura Beauty Blend', '1500.00', 10, 'Perfumada mezcla de Té Blanco y Verde con la sabrosa cereza morello y una pincelada de almendra y rosa. Una mezcla diferente y original, que fideliza a los paladares más amantes de los sabores singulares. Una alquimia de sabores para purificarse.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 2),
(6, 'Té Negro Earl Grey Santos Special', '1500.00', 5, 'Una de las mezclas más famosas y consumidas en el mundo. Un té fragante, con mucha personalidad. El Earl Grey más cítrico con Té Negro, cáscara de limón, bergamota y aromas cítricos.', 1, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 2),
(7, 'Té Ceylon Decaf', '1000.00', 5, 'Los tés de Sri Lanka son reconocidos por su esencia intensa y aroma amaderado y tabacoso. Perfecto para ser consumido en cualquier momento del día. El Té Negro se descafeína de forma natural con vapor a presión extrayendo el 99% de la teína.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 2),
(8, 'Té Negro Darjeeling', '1000.00', 15, 'Procedente del jardín Teesta Valley and Gielle situado en la región india de Darjeeling. Alta calidad. Ligero y sedoso con pequeño toque herbal. Perfecto para tomar en los desayunos o después de las comidas.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 2),
(9, 'Té Blanco Pai Mu Tan', '1500.00', 0, 'Té Blanco conocido como Pai Mu Tan, procedente de de la zona de Fujian, China. Este exclusivo té de producción muy limitada se recolecta de forma manual y sólo se utilizan los brotes y las primeras dos hojas tiernas. Famoso por su fino aroma floral.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 2),
(10, 'Té Negro Berry Fields', '2000.00', 10, 'Mezcla de Té Negro con frutos silvestre, ideal para los desayunos y las meriendas. Su dulce y envolvente aroma ofrece versatilidad en su consumo en caliente o en frío.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 2),
(11, 'Té Rooibos African Sunset', '2000.00', 10, 'Exclusivo de la zona sudafricana de Cederberg, de limitada producción. El Rooibos es una planta sudafricana, libre de teína y sin calorías que ayuda a hidratar el cuerpo. Destaca también su poder antioxidante. De sabor dulce, aromático y sin notas de astringencia', 1, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 2),
(12, 'Té English Breakfast', '1000.00', 10, 'Tradicional mezcla de Tés Negros de Sri Lanka para empezar el día con vitalidad. Una taza de Té Negro por la mañana activa el cuerpo y la mente, nos deleita con una ola de energía. Unas gotas de leche matizarán la astringencia y aportarán cremosidad.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 2),
(13, 'Té Tilo y Melisa', '500.00', 20, 'Infusión con tilo y melisa, de relajante aroma y sabor dulce con propiedades relajantes, diuréticas y digestivas de sabor herbal y meloso.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 2),
(14, 'Té Camomilla Golden', '500.00', 20, 'Una mezcla muy aromática con el aporte de las propiedades de la camomila y el delicioso sabor de la manzana. Destacan sus propiedades relajantes y digestivas.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 2),
(15, 'Té Blanco Strawberry Fresh', '1500.00', 20, 'Una mezcla ideal para los que buscan un buen sabor pero con poca teína. Su carácter joven y fresco, ideal para consumo en caliente o al estilo Ice Tea.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 2),
(16, 'Té Fruit explosion', '1500.00', 5, 'Colorida explosión de sabores y nutrientes con 15 virtuosas frutas: la unión perfecta para sentirse vital y en forma. Un concentrado vital de micronutrientes esenciales que reforzará nuestro sistema inmunitario.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 2),
(17, 'Mate Y Bombilla Mathienzo de Silicona', '759.00', 5, 'Mate Mathienzo de silicona 100% y polipropileno (PP). Sus materiales evitan la sobre oxigenación de la Yerba, haciendo que se lave mucho más lento. Es totalmente atóxico, aislante térmico e higiénico. Carga 70 gramos', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 3),
(18, 'Tea Box de Madera Paraiso x60 Saquitos', '8473.00', 5, 'Caja con 60 saquitos surtidos de Té INTI - ZEN, ideal para que puedas hacer un viaje con tus papilas gustativas descubriendo sabores y aromas exquisitos de todo el mundo.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 3),
(19, 'Mate Y Bombilla Mathienzo de Vidrio Forrado en Cuero', '1353.00', 5, 'Mate Mathienzo con interior de vidrio, forrado con cuero vaqueta. Incluye bombilla de acero inoxidable, desmontable para su lavado.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 3),
(20, 'Bombilla Taumer con Anillo', '1194.00', 0, 'Bombilla de alpaca para Mate o Chimarrao en Brasil, con un delicado anillo con detalle de piedra de color y puntera.', 1, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 3),
(21, 'Infusor Circular Abierto para Té en Hebras - INOX', '530.00', 0, 'Infusor abierto para preparar Té en hebras. Hecho de acero inoxidable para garantizar su limpieza y máxima duración.', 1, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 3),
(22, 'Kit Matero Origen: Mate Metalico, Bombilla y Yerba Mate 500gr', '4305.00', 5, 'Kit compuesto por: Mate metálico Origen, Bombilla de acero inoxidable Origen y Yerba Mate Origen Barbacuá Selección Especial 500Gr', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 3),
(23, 'Mate As de Bastos - Calabaza sin Virola', '1355.00', 5, 'El mate de Calabaza As De Bastos es un recipiente natural para disfrutar de nuestra amada infusión. Al ser un producto natural puede variar el tamaño y la forma de la misma.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 3),
(25, 'Medida de té de acero inoxidable', '872.00', 5, 'La medida permite coger la cantidad de té necesaria para una taza en volumen y no en peso, lo que ayudará a que el té o infusión no quede con un sabor muy suave o, por el contrario, muy fuerte.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 3),
(26, 'Taza de cristal termorresistente con infusor de acero inoxidable', '2616.00', 5, 'Elegante y funcional taza de cristal termorresistente con infusor de acero inoxidable y recubrimiento de silicona. Está fabricada en cristal termo resistente para evitar quemaduras. Incluye filtro de acero inoxidable y recubrimiento de silicona de color turquesa a juego con el diseño de la taza.Infusor y tapa incluidos para hacer las infusiones más aromáticas.Calentar el agua en un hervidor, colocar el té(2g) en el filtro y verter el agua caliente sobre las hojas.Retirar el filtro tras el tiempo de infusión.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 3),
(27, 'Tetera de cristal con infusor de acero inoxidable', '3215.00', 5, 'Elegante y funcional tetera de cristal con infusor de acero inoxidable y silicona ideal para ver el color de tu té o infusión. Está fabricada en cristal termo resistente para evitar quemaduras. Incluye filtro de acero inoxidable y recubrimiento de silicona en color lila a juego con el diseño de la taza.Infusor y tapa incluidos para hacer las infusiones más aromáticas.Calentar el agua en un hervidor, colocar el té(5g) en el filtro y verter el agua caliente sobre las hojas.Retirar el filtro tras el tiempo de infusión.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 3),
(28, 'Cha Jing - El primer libro sobre el té', '2010.00', 5, 'Dividido en tres secciones, este antiguo libro nos enseña más sobre la bebida más consumida en el mundo. En la primera sección se habla del té y de su producción, en la segunda se enumeran los utensilios usados para su producción y, en la tercera, se tratan varios temas: desde la valoración del té hasta los antiguos archivos que sobre él existían en la Antigua China.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 3),
(29, 'French Press 1L', '4696.00', 5, 'Fabricada en doble cristal de borosilicato resistente a altas temperaturas y émbolo de acero inoxidable 18/8.  Perfecta para hacer tu té, infusiones o café en esta elegante French Press de 1 L de capacidad. Poner el té en el interior de la tetera y verter el agua caliente sobre las hojas. Colocar la tapa con el émbolo hacia arriba. Tras el tiempo de infusión, presionar el émbolo hacia abajo y servir el té. ', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 3),
(30, 'Hervidor Commodore', '11942.00', 10, 'Este hervidor inspirado en el diseño de teteras japonés te permite calentar y mantener el calor del agua a distintas temperaturas, controlando el progreso mediante su pantalla digital y recibiendo un aviso cuando alcanza la temperatura deseada. Un hervidor se caracteriza por tener buenos diseños que harán lucir mejor la decoración de tu cocina, además, no solo son elegantes sinó que también son equipos ideales para realizar tazas de té o café de manera instantánea.Incluye termostato y autoapagado para mayor seguridad.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 3),
(31, 'Yerba mate Obereña', '564.00', 5, 'La Yerba Mate llega fresca desde nuestras chacras y sectores productivos, y es pre-seleccionada para ingresar al secado. Se realiza el proceso en un sistema rotatorio contínuo con calor controlado. Luego se clasifica con una zaranda que separa las hojas de los palos. El proceso culmina con un tratamiento selectivo de molienda para luego pasar al último paso: Estacionamiento natural por un mínimo de 12 meses.', 1, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 1),
(32, 'Yerba Mate Fidel Orgánica con Moringa Oleifera', '1079.00', 5, 'Moringa Fidel presenta un producto renovado de producción limitada libre de agrotóxicos que combina la Moringa con la Yerba Mate Orgánica y sus distintas formas de consumirla. La Moringa Oleifera es un Árbol reconocido por sus cualidades. Sus hojas fueron incorporadas en este exquisito blend. Este producto está compuesto por un 96% de Yerba Mate Orgánica estacionada naturalmente por 12 meses, y un 4% de Hojas Secas de Moringa Oleifera.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 1),
(33, 'Yerba Mate Fidel Orgánica con Moringa Oleifera', '1079.00', 5, 'Moringa Fidel presenta un producto renovado de producción limitada libre de agrotóxicos que combina la Moringa con la Yerba Mate Orgánica y sus distintas formas de consumirla. La Moringa Oleifera es un Árbol reconocido por sus cualidades. Sus hojas fueron incorporadas en este exquisito blend. Este producto está compuesto por un 96% de Yerba Mate Orgánica estacionada naturalmente por 12 meses, y un 4% de Hojas Secas de Moringa Oleifera.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 1),
(34, 'Yerba Mate Arapeguá Molida Orgánica', '820.00', 5, ' La yerba mate es el principal producto de la Cooperativa Agropecuaria La Abundancia. Tiene un estacionamiento natural de 24 meses, lo que hace que tenga un sabor suave y añejado. No provoca acidez y su sabor recuerda a como se hacia la yerba antes. Su molienda gruesa la hace ideal para preparar un Mate suave, o un buen Tereré. Es un producto de la Agricultura ORGÁNICA libre de agroquímicos, la cual promueve la integración entre el ser humano, el reino animal, el vegetal y el suelo, con el objetivo de conformar una individualidad agrícola que logre su auto sustentabilidad, tanto en el aspecto productivo como en el económico, fortaleciendo las aptitudes del productor agropecuario y las relaciones con su entorno.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 1),
(35, 'Yerba Mate Mate & Co.  Spicy Choco', '1062.00', 5, 'Un blend delicioso que combina el dulzor de la cascarilla de cacao con el picante del jengibre y el sabor inconfundible de nuestra Yerba Mate Orgánica Especial. Las propiedades estimulantes y antioxidantes de sus ingredientes son la esencia de este blend.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 1),
(36, 'Yerba Mate Mate & Co. Tres Mentas', '1454.00', 5, ' El más fresco de los blends, para disfrutar en todo momento y aprovechar las propiedades de sus ingredientes naturales. Con base de Yerba Mate Orgánica Despalada, se mezclan tres tipos de mentas; hierba buena, de sabor suave y dulce, peppermint, y menta egipcia, la más fresca de las mentas. Un blend para revitalizar tus sentidos.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 1),
(37, 'Yerba Mate La Obereña Orgánica Bolsa Arpillera', '1251.00', 5, 'La Yerba Mate llega fresca desde nuestras chacras y sectores productivos, en bolsas de arpillera de 40Kg. y son pre-seleccionadas para ingresar al secado. Previa selección y análisis.Se realiza el secado en un sistema rotatorio continuo con calor controlado.Luego se clasifica con una zaranda que separa hojas de los palos.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 1),
(38, 'Yerba Mate Grapia Milenaria Tradicional', '742.00', 5, 'Yerba Mate libre de agro-tóxicos secada y estacionada de forma natural, lo que le otorga una maduración y características únicas. De sabor intenso y duradero que se mantendrá intacto durante mas cebadas.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 1),
(39, 'Yerba Mate Verdeada Premium', '424.00', 5, 'Verdeada Yerba Mate es de elaboración Artesanal, de cosecha limitada, estacionada durante 2 años y su equilibrio perfecto entre hoja - palo - polvo.  Desde el verde amanecer Misionero, Verdeada, se complace en compartir la sana costumbre y tradición de saborear una nueva Yerba Mate, la cual es estacionada naturalmente, permitiendo así, destacar sus virtudes y propiedades para que la infusión sea de su gusto.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 1),
(40, 'Yerba Mate Apostoleñia', '712.00', 5, 'Yerba Mate tradicional elaborada con palo oriunda de una ciudad Yerbatera por excelencia. Apostoleñia nos trae una yerba de gran durabilidad y con personalidad robusta, estacionada naturalmente por 12 meses para resaltar y pulir las cualidades de la Yerba Mate. Un blend ideal para cualquier amante de un buen mate.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 1),
(41, 'Yerba Mate Chamamé', '370.00', 0, 'Te ofrecemos un producto elaborado por la empresa Campos del Chamamé. Una de las pocas empresas Yerbateras que Cultiva, Produce, Elabora y Envasa por su cuenta. Es una Yerba Mate con sabor Tradicional. Cantidad de palo equilibrado. Sabor intenso.', 1, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 1),
(42, 'Yerba Mate Andresito', '438.00', 10, ' La Yerba Mate cultivada por la Cooperativa Yerbatera Andresito en la provincia de Misiones, es producida, elaborada y procesada en forma natural por los productores rurales de la zona, a la que circundan áreas protegidas de la talla del célebre Parque Nacional Iguazú, lo que asegura una altísima sanidad ambiental y, lógicamente, la obtención de productos de máxima pureza.  Cada uno de los productores asociados recibe el permanente asesoramiento de la empresa, del mismo modo que acepta los estrictos controles de calidad que ésta ejerce a lo largo de toda la cadena productiva.Debido a esto y a los procedimientos artesanales y naturales empleados, Cooperativa Yerbatera Andresito puede ofrecer y asegurar a sus clientes productos idóneos en los que se conservan perfectamente las múltiples virtudes de la yerba mate.', 1, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 1),
(43, 'Yerba Mate Kurupí Compuesta Menta y Boldo', '621.00', 20, 'El proceso de elaboración de la Yerba Mate, después de la cosecha de las hojas, pasa por los siguientes procesos: Preparación, Maduración, Finalización. En la etapa de finalización, se selecciona la Yerba Mate, separando las hojas de los tallos para que el producto pueda ser debidamente empaquetado y distribuido en los mercados. La Yerba Mate Kurupí, Compuesta con hierbas Menta y Boldo, posee propiedades notoriamente saludables.Un producto 100% natural.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 1),
(44, 'Yerba Mate Cachamate del Litoral', '194.00', 5, 'Cachamate Hierbas Del Litoral es una combinación de lemon grass, una hierba autóctona de la region, Yerba Mate, Salvia y Marcela, que además de darle su particular sabor, es antioxidante y llena de vitalidad. Un sabor imperdible en un tereré fresco para compartir con amigos', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 1),
(45, 'Yerba Mate Adelgamate con Limon', '234.00', 5, ' ADELGAMATE COMPUESTA CON LIMÓN ofrece las virtudes de las Hierbas Naturales; Té Verde, Poleo, Cedrón y Peperina, y además un suave y delicioso aroma de Limón en su justa medida. ¡Para Matear En Forma! ', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 1),
(46, 'Yerba Mate Fronteras con Manzanilla y Naranja', '829.00', 5, 'Proba este blend ideal para arrancar un buen día, decorando el tan buscado sabor de la Yerba Mate con el toque dulzon y floral de la Manzanilla, acompañado del toque cítrico de la Naranja. COMPOSICIÓN: 88 % Yerba Mate, 9% Naranja, 3% Manzanilla.', 0, '2022-09-09 02:30:17', '2022-09-09 02:30:17', NULL, 1),
(58, 'Borrar', '10000.00', 10, 'sadsasa', 0, '2022-10-05 01:52:15', '2022-10-05 02:05:00', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_categories`
--

CREATE TABLE `products_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products_categories`
--

INSERT INTO `products_categories` (`id`, `name`) VALUES
(1, 'yerba'),
(2, 'te'),
(3, 'accesorio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `users_categories_id` int(11) DEFAULT NULL,
  `avatar` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone_number`, `createdAt`, `updatedAt`, `deletedAt`, `users_categories_id`, `avatar`) VALUES
(1, 'Jano Pereira Kent', 'janoo.pereira@gmail.com', '$2a$10$77tvQwvRg4cTNGH0KnJZ0.AwD3W6hLIsVYiw6j/nggB/K7IqkaNzO', '1158817312', '2022-09-05 22:49:33', '2022-09-05 22:49:33', NULL, 1, 'default.jpg'),
(2, 'Diego Barzizza', 'diego@gmail.com', '$2a$10$6XOGDNtnEDcDINr.tx593.mNuiUNfBtyg3a4rl7muhcstDPcmmqbG', '1122334455', '2022-09-05 22:50:48', '2022-09-05 22:50:48', NULL, 2, 'default.jpg'),
(3, 'Juan Perez', 'usuario@prueba.com', '$2a$10$j1WMVBCPE8uZQLXLKfkBtuv3kIjNr7NU20TiWSlu/l1q.vmt/fTEq', '12345674212', '2022-10-04 21:59:55', '2022-10-05 02:20:46', NULL, 2, 'avatar-1664936446221.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_categories`
--

CREATE TABLE `users_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users_categories`
--

INSERT INTO `users_categories` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'comprador'),
(3, 'vendedor');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_id` (`products_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_categories_id` (`products_categories_id`);

--
-- Indices de la tabla `products_categories`
--
ALTER TABLE `products_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_categories_id` (`users_categories_id`);

--
-- Indices de la tabla `users_categories`
--
ALTER TABLE `users_categories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `products_categories`
--
ALTER TABLE `products_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users_categories`
--
ALTER TABLE `users_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`products_categories_id`) REFERENCES `products_categories` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`users_categories_id`) REFERENCES `users_categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
