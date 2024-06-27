
Segun SWAGGER, 

ACCOUNT =>  GET => api/account  obtengo datos de la cuenta:
                                entrada: token 
                                salida:  {alias, available_amount, cvu, id, user_id}

        =>  PATCH => api/accounts/{account_id}    actualizo el alias de la cuenta
                                                  entrada: toke, account_id, {"alias": "..."}
                                                  salida: account data updated

---------------------------------------------------------------------------------------------------------

TRANSACTIONS => GET => api/accounts/{account_id}/activity   obtengo todas las operaciones realizadas (depositos, transferencias
                                                            y transacciones)
                                                            entrada: token, account_id
                                                            salida: arreglo con  { account_id, amount, dated, description, destination, id, origin, type }

             => POST => api/accounts/{account_id}/transactions  creo una transaccion
                                                                entrada: token, account_id
                                                                salida { amount, dated, description }

                                                                ******* amount negativo *********

            => GET => api/accounts/{account_id}/activity   obtengo transaccion segun id
                                                            entrada: token, account_id, transaction_id
                                                            salida: arreglo con  { account_id, amount, dated, description, destination, id, origin, type }

---------------------------------------------------------------------------------------------------------

CARDS       => GET => api/accounts/{account_id}/cards       obtengo todas las tarjetas adheridas
                                                            entrada: token
                                                            salida: arreglo con  { account_id, cod, expiration_date, first_last_name, id, number_id }

             => POST => api/accounts/{account_id}/cards     adhiero una nueva tarjeta
                                                            entrada: token, account_id, { cod, expiration_date, first_last_name, number_id }
                                                            salida { cod, expiration_date, first_last_name, number_id, id, account_id }

            => GET => api/accounts/{account_id}/cards/{card_id}   obtengo la trajeta segun id
                                                                  entrada: token, account_id, card_id
                                                                  salida:  { cod, expiration_date, first_last_name, number_id, id, account_id }

            => DELETE => api/accounts/{account_id}/cards/{card_id}   elimino la trajeta segun id
                                                                     entrada: token, account_id, card_id
                                                                     salida: null

---------------------------------------------------------------------------------------------------------

TRANSFERENCES => POST => api/accounts/{account_id}/deposits   creo un nuevo deposito
                                                              entrada: token, account_id, { amount, dated, destination, origin }
                                                              salida: arreglo con  { account_id, amount, dated, description, destination, id, origin, type }

                                                              ******* amount positivo **********

              => GET => api/accounts/{account_id}/transferences  obtengo todas las transferencias
                                                                 entrada: token, account_id
                                                                 salida arreglo de { account_id, amount, dated, description, destination, id, origin, type }

              => POST => api/accounts/{account_id}/transferences  creo una nueva transferencia
                                                                  entrada: token, account_id, { amount, dated, destination, origin }
                                                                  salida: { account_id, amount, dated, description, destination, id, origin, type }

                                                                  ****** amount negativo, origin accountCVU ******

---------------------------------------------------------------------------------------------------------

AUTHORIZATION => POST => api/login    verifica al usuario si esta registrado
                                      entrada: { email, password }
                                      salida: token

              => POST => api/logout   termino la sesion

---------------------------------------------------------------------------------------------------------

USERS       => POST => api/users     registro un nuevo usuario
                                    entrada: { dni, email, firstname, lastname, password, phone }
                                    salida { account_id, email, user_id }

            => GET => api/users/{user_id}   obtengo usuario segun id
                                            entrada: token, user_id
                                            salida:  { dni, email, firstname, lastname, phone }

            => PATCH => api/users/{user_id}   actualizo usuario segun id
                                              entrada: token, user_id
                                              salida:  { dni, email, firstname, lastname, phone }

---------------------------------------------------------------------------------------------------------

SERVICE       => GET => service     obtengo todos los servicios
                                    entrada: 
                                    salida { id, name, date }

            => GET => sevice/{id}   obtengo servicio segun id
                                    entrada: service_id
                                    salida:  { id, name, date, invoice_value }

            => GET => service/{id}   actualizo usuario segun id
                                              entrada: token, user_id
                                              salida:  { dni, email, firstname, lastname, phone }
