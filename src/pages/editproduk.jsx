import React from 'react'
import Axios from 'axios'
import NavigationBar from '../component/navigationBar';
import Footer from '../component/footer'
import {
    Button,
    Form,
    FormControl
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { addCart } from '../redux/actions'
import Swal from 'sweetalert2'

// const url = 'https://jajan-database.herokuapp.com'
// const url = 'http://localhost:2000'
// const url = 'https://lizard-tux.cyclic.app'
const url = 'https://andres-lapo.onrender.com'




class EditProduk extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            qty: 1,
            toLogin: false,
            indexEdit: null,
        }
    }

    componentDidMount() {
        Axios.get(`${url}/products/${document.location.search.substring(1)}`)
            .then(res => {
                this.setState({ product: res.data })
            })
    }

  

    onSave = () => {
        const name = this.refs.nama.value
        const description = this.refs.deskripsi.value
        const price = +this.refs.harga.value
        const stock = +this.refs.stok.value
        const images = [this.refs.gambar.value]

        const body = {
            name,
            description,
            price,
            stock,
            images

        }
        console.log(body)

        Axios.patch(`${url}/products/${document.location.search.substring(1)}`, body)
            .then(res => {
                console.log(res.data)
                Swal.fire('Berhasil Mengedit Produk, Silahkan kembali ke Home')
                return <Navigate to="/" />
            })
            .catch(err => {
                console.log(err)
            })

    }


    render() {
        const { product, qty, toLogin } = this.state

        if (toLogin) {
            return <Navigate to="/login" />
        }
        return (
            <div>
                <div style={{ background: 'url(https://images.unsplash.com/photo-1555505019-8c3f1c4aba5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)', minHeight: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                    <NavigationBar />
                    
                        <div style={{ display: 'flex', height: 'fit-content', padding: '2vh', paddingTop: '8em', paddingBottom: '5em', flexWrap: 'wrap' }}>
                            <div style={styles.contImg}>
                                {(product.images ? product.images : []).map((item, index) => {
                                    return (
                                        <img style={styles.img} src={item} alt="" key={index} />
                                    )
                                })}
                            </div>
                            <div style={styles.contDesc}>
                                
                                <div style={{ color: 'white' }}>
                                    <strong style={{ color: 'orange' }}>Nama Produk:</strong>
                                    <h1>{product.name ?
                                        <FormControl
                                            // placeholder={this.state.product ? this.state.product.dosis : ""}
                                            as="textarea"
                                            defaultValue={product.name}
                                            //  type="number"
                                            ref="nama"
                                            style={{ height: '2rem' }}
                                        />
                                    // product.name 
                                    : ''}</h1>
                                    <p> <strong style={{ color: 'orange' }}>Deskripsi:</strong> {product.description ?
                                        <FormControl
                                            // placeholder={this.state.product ? this.state.product.dosis : ""}
                                            as="textarea"
                                            defaultValue={product.description}
                                            type="text"
                                            ref="deskripsi"
                                            style={{ height: '10rem' }}
                                        />
                                        : ''}</p>
                                    <p> <strong style={{ color: 'orange' }}>Harga:</strong> IDR. {(product.price ?
                                        <FormControl
                                            // placeholder={this.state.product ? this.state.product.dosis : ""}
                                            as="textarea"
                                            defaultValue={product.price}
                                            //  type="number"
                                            ref="harga"
                                            style={{ height: '2rem' }}
                                        />
                                        // product.price 
                                        : '')}</p>
                                    <p> <strong style={{ color: 'orange' }}>Stok Tersedia:</strong> {product.stock ?
                                        <FormControl
                                            // placeholder={this.state.product ? this.state.product.dosis : ""}
                                            as="textarea"
                                            defaultValue={product.stock}
                                            //  type="number"
                                            ref="stok"
                                            style={{ height: '2rem' }}
                                        />
                                        // product.stock 
                                        : ''}</p>
                                    <p> <strong style={{ color: 'orange' }}>URL Gambar:</strong> {product.images ?
                                        <FormControl
                                            // placeholder={this.state.product ? this.state.product.dosis : ""}
                                            as="textarea"
                                            defaultValue={product.images}
                                            // type="text"
                                            ref="gambar"
                                            style={{ height: '10rem' }}
                                        />
                                        : ''}</p>


                                    <Button style={{ marginTop: '25px', marginBottom:'2rem', width: 'fit-content' }} onClick={this.onSave} variant='warning' >
                                        Save Hasil Edit
                                    </Button>
                                    
                                    <p style={styles.parRegislink}>Kembali ke <Link style={styles.regisLink} to='/'>Home</Link></p>

                                </div>
                            </div>
                        </div>

                        
                </div>
                <Footer />
            </div>
        )
    }
}

const styles = {
    contImg: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100vh',
        padding: '3%',
    },
    contDesc: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100vh',
        padding: '3%'
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center'

    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        id: state.userReducer.id,
        role: state.userReducer.role
    }
}

export default connect(mapStateToProps, { addCart })(EditProduk)