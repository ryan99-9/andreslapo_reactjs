import Axios from 'axios'


// const url = 'https://jajan-database.herokuapp.com'
// const url = 'http://localhost:2000'
// const url = 'https://lizard-tux.cyclic.app'
const url = 'https://andres-lapo.onrender.com'


export const addCart = (id, data, idProd) => {
    return (dispatch) => {
        Axios.get(`${url}/users/${id}`)
            .then(res => {
                let tempCart = res.data.cart
                const itemIndex = tempCart.findIndex(
                    (item) => item.name === data.name
                )
                if(itemIndex >= 0) {
                    tempCart[itemIndex].qty += data.qty
                } else {
                    tempCart.push(data)
                }
                Axios.patch(`${url}/users/${id}`, { cart: tempCart })
                    .then(res => {
                        let temp = 0
                        Axios.patch(`${url}/products/${idProd}`, {qty: temp})
                                    .then(res => {
                                        console.log(res.data)
                                        // this.fecthData()
                                    })
                                    Axios.get(`${url}/users/${id}`)
                                        .then(res => {
                                            return dispatch({
                                                type: 'LOGIN',
                                                payload: res.data
                                            })
                                        })
                    })
            })
    }
}

export const addProducts = (id, data) => {
    return (dispatch) => {
        Axios.get(`${url}/products/${id}`)
            .then(res => {
                let tempProducts = res.data.products
                const itemIndex = tempProducts.findIndex(
                    (item) => item.name === data.name
                )
                if(itemIndex >= 0) {
                    tempProducts[itemIndex].qty += data.qty
                } else {
                    tempProducts.push(data)
                }
                Axios.patch(`${url}/products/${id}`, { products: tempProducts })
                    .then(res => {
                        Axios.get(`${url}/products/${id}`)
                            .then(res => {
                                return dispatch({
                                    type: 'LOGIN',
                                    payload: res.data
                                })
                            })
                    })
            })
    }
}

export const delCart = (idUser, idProdCart) => {
    return (dispatch) => {
        Axios.get(`${url}/users/${idUser}`)
            .then(res => {
                let tempCart = res.data.cart
                tempCart.splice(idProdCart, 1)

                Axios.patch(`${url}/users/${idUser}`, { cart: tempCart })
                    .then(res => {
                        Axios.get(`${url}/users/${idUser}`)
                            .then(res => {
                                return dispatch({
                                    type: 'LOGIN',
                                    payload: res.data
                                })
                            })
                    })
            })
    }
}

export const delProduk = (idProd) => {
    return (dispatch) => {
        Axios.get(`${url}/products`)
            .then(res => {
                let tempProd = res.data.products
                tempProd.splice(idProd, 1)

                Axios.patch(`${url}/products`, { products: tempProd })
                    .then(res => {
                        Axios.get(`${url}/products`)
                            .then(res => {
                                return dispatch({
                                    type: 'LOGIN',
                                    payload: res.data
                                })
                            })
                    })
            })
    }
}

export const saveCart = (idUser, idProdCart, qtyUpdate) => {
    return (dispatch) => {
        Axios.get(`${url}/users/${idUser}`)
            .then(res => {
                // utk menampung data cart yg sekarang
                let tempCart = res.data.cart
                // utk menampung data produk yg mau diupdate qty nya
                let tempProd = res.data.cart[idProdCart]
                // update qty yg baru
                tempProd.qty = qtyUpdate
                // ganti data cart dg data yg sudah di update
                tempCart.splice(idProdCart, 1, tempProd)
                // patch data cart baru ke database
                Axios.patch(`${url}/users/${idUser}`, { cart: tempCart })
                    .then(res => {
                        // ambil data yg sudah dipatch utk dimasukkan ke Reducer agar data redux juga update
                        Axios.get(`${url}/users/${idUser}`)
                            .then(res => {
                                return dispatch({
                                    type: 'LOGIN',
                                    payload: res.data
                                })
                            })
                    })
            })
    }
}

export const checkout = (idUser, history) => {
    return (dispatch) => {
        //mengosongkan cart user
        Axios.patch(`${url}/users/${idUser}`, { cart: [] })
            .then(res => {
                // menambah data history kedalam database
                Axios.post(`${url}/history`, history)
                    .then(res => {
                        // update data di redux
                        Axios.get(`${url}/users/${idUser}`)
                            .then(res => {
                                return dispatch({
                                    type: 'LOGIN',
                                    payload: res.data
                                })
                            })
                    })
            })
    }
}