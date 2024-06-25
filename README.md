Las operaciones monetarias que me deja hacer el swagger son:

POST
depósito: ingresar dinero a nuestra cuenta. Requisito: amount siempre positivo.

transferencia: salida de dinero de nuestra cuenta. Requisitos:  amount siempre negativo, 
                                                                origin tiene que ser nuestro CVU.

transacción: salida de dinero de nuestra cuenta. Requisitos: amount siempre negativo.

tajeta: ingresar una tajeta nueva


GET
Listar activity : lista todas las transferencias, transacciones y depósitos

Listar transaccion/es: lista las transferencias

Listar tarjeta/s asociadas a la cuenta

Listar tranferencias 

Lista usuario

Listar servicio/s a pagar

