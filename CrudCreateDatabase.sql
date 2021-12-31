create database bd_facturadora;
use bd_facturadora;

CREATE TABLE Ciudad(
id_ciudad INT AUTO_INCREMENT,
nombre_ciudad VARCHAR (150) NOT NULL,
activo BIT NOT NULL,
PRIMARY KEY (id_ciudad)
);

CREATE TABLE Empresa (
id_empresa INT AUTO_INCREMENT,
razon_social VARCHAR(100) NOT NULL,
slogan VARCHAR(250),
nit VARCHAR (20) NOT NULL,
url_logo VARCHAR (350) NOT NULL,
correo_electronico VARCHAR(100),
direccion VARCHAR(70) NOT NULL,
id_ciudad INT NOT NULL,
telefono VARCHAR(20) NOT NULL,
activo BIT NOT NULL,
PRIMARY KEY (id_empresa),
FOREIGN KEY (id_ciudad) references Ciudad (id_ciudad)
);

CREATE TABLE Usuario(
id_usuario INT AUTO_INCREMENT, 
nombre_user VARCHAR (300) NOT NULL,
correo_user VARCHAR (100) NOT NULL,
pass_user VARCHAR (200) NOT NULL,
telefono_user VARCHAR (30),
nivel_user INT NOT NULL,
id_empresa INT NOT NULL,
activo BIT NOT NULL,
PRIMARY KEY (id_usuario),
FOREIGN KEY (id_empresa) references Empresa (id_empresa)
);

CREATE TABLE Categoria (
id_categoria INT AUTO_INCREMENT,
nombre_categoria VARCHAR (60),
activo BIT NOT NULL,
PRIMARY KEY (id_categoria)
);

CREATE TABLE Impuesto(
id_impuesto INT AUTO_INCREMENT,
nombre_impuesto VARCHAR (30) NOT NULL,
porc_impuesto DOUBLE NOT NULL,
activo BIT NOT NULL,
PRIMARY KEY (id_impuesto)
);

CREATE TABLE Estado (
id_estado INT AUTO_INCREMENT,
nombre_estado VARCHAR (50) NOT NULL,
activo BIT NOT NULL,
PRIMARY KEY (id_estado)
);

CREATE TABLE FormaPago(
id_formapago INT AUTO_INCREMENT,
nombre_formapago VARCHAR (80) NOT NULL,
activo BIT NOT NULL,
PRIMARY KEY (id_formapago)
);

CREATE TABLE Documento(
id_tdocumento INT AUTO_INCREMENT,
nombre_tdocumento VARCHAR (80) NOT NULL,
activo BIT NOT NULL,
PRIMARY KEY (id_tdocumento)
);

CREATE TABLE Producto (
id_producto INT AUTO_INCREMENT, 
nombre_producto VARCHAR (300) NOT NULL,
valor_producto DOUBLE NOT NULL, 
id_categoria INT NOT NULL,
id_empresa INT NOT NULL,
activo BIT NOT NULL, 
PRIMARY KEY (id_producto),
FOREIGN KEY (id_categoria) references Categoria(id_categoria),
FOREIGN KEY (id_empresa) references Empresa (id_empresa)
);

CREATE TABLE Cliente(
id_cliente INT AUTO_INCREMENT, 
id_tdocumento INT NOT NULL, 
num_documento VARCHAR (20) NOT NULL,
nombre_cli VARCHAR (100) NOT NULL,
direccion_cli VARCHAR (100) NOT NULL,
id_ciudad INT NOT NULL,
id_empresa INT NOT NULL,
codpostal_cli VARCHAR (10) NOT NULL,
telefono_cli VARCHAR (30) NOT NULL,
activo BIT NOT NULL, 
PRIMARY KEY (id_cliente),
FOREIGN KEY (id_tdocumento) references Documento (id_tdocumento),
FOREIGN KEY (id_ciudad) references Ciudad (id_ciudad),
FOREIGN KEY (id_empresa) references Empresa (id_empresa)
);

CREATE TABLE Factura (
id_factura INT AUTO_INCREMENT, 
id_ciudad INT NOT NULL,
id_cliente INT NOT NULL,
id_usuario INT NOT NULL,
id_estado INT NOT NULL,
id_formapago INT NOT NULL,
formapago_personalizada VARCHAR(100), 
fecha_emision DATE NOT NULL, 
fecha_vencimiento DATE NOT NULL,
subtotal_factura DOUBLE NOT NULL,
total_fact DOUBLE NOT NULL,
valor_letras VARCHAR(300) NOT NULL,
ref_pago VARCHAR(300) NOT NULL,
PRIMARY KEY (id_factura),
FOREIGN KEY (id_ciudad) references Ciudad (id_ciudad),
FOREIGN KEY (id_cliente) references Cliente (id_cliente),
FOREIGN KEY (id_usuario) references Usuario (id_usuario),
FOREIGN KEY (id_estado) references Estado (id_estado),
FOREIGN KEY (id_formapago) references FormaPago (id_formapago)
);

CREATE TABLE ImpuestoFactura (
id_impuesto INT NOT NULL, 
id_factura INT NOT NULL, 
PRIMARY KEY (id_impuesto,id_factura),
FOREIGN KEY (id_impuesto) references Impuesto (id_impuesto),
FOREIGN KEY (id_factura) references Factura (id_factura)
);

CREATE TABLE Detalle (
id_factura INT NOT NULL,
id_producto INT NOT NULL,
cantidad INT NOT NULL,
valor_unitario DOUBLE NOT NULL,
valor_total DOUBLE NOT NULL, 
PRIMARY KEY (id_factura,id_producto),
FOREIGN KEY (id_factura) references Factura (id_factura),
FOREIGN KEY (id_producto) references Producto (id_producto)
);

CREATE TABLE CategoriaEmpresa (
id_categoria INT NOT NULL, 
id_empresa INT NOT NULL, 
PRIMARY KEY (id_categoria,id_empresa),
FOREIGN KEY (id_categoria) references Categoria(id_categoria),
FOREIGN KEY (id_empresa) references Empresa (id_empresa)
);