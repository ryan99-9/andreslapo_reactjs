import React from 'react'
import Axios from 'axios'
import NavigationBar from '../component/navigationBar';
import {
    Button,
    Form
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { addCart } from '../redux/actions'

class DetailPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            qty: 1,
            toLogin: false,
        }
    }

    componentDidMount() {
        Axios.get(`http://localhost:2000/products/${document.location.search.substring(1)}`)
            .then(res => {
                this.setState({ product: res.data })
            })
    }

    onPlus = () => {
        this.setState({ qty: this.state.qty + 1 })
    }

    onMinus = () => {
        this.setState({ qty: this.state.qty - 1 })
    }

    onInputClick = () => {
        this.setState({ qty: '' })
    }

    onDelete = (e) => {
        if (e.keyCode === 8) {
            this.setState({ qty: '' })
        }
    }

    onInput = (e) => {
        this.setState({ qty: 1 })
        let value = +e.target.value
        if (value < 1) {
            this.setState({ qty: 1 })
        } else if (value > this.state.product.stock) {
            this.setState({ qty: this.state.product.stock })
        } else if (value >= 1 || value <= this.state.product.stock) {
            this.setState({ qty: value })
        }
    }

    onMasukKeranjang = () => {
        const { product, qty } = this.state
        if (!this.props.username) {
            return this.setState({ toLogin: true })
        }

        //siapkan data yg mau dipush kedalam cart
        let obj = {
            id: product.id,
            name: product.name,
            image: product.images[0],
            price: product.price,
            stock: product.stock,
            qty
        }
        this.props.addCart(this.props.id, obj)
    }

    render() {
        const { product, qty, toLogin } = this.state

        if (toLogin) {
            return <Navigate to="/login" />
        }
        return (
            <div style={{ background: 'url(https://images.unsplash.com/photo-1555505019-8c3f1c4aba5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)' }}>
                <NavigationBar />
                <div style={{ display: 'flex', height: '100vh', padding: '10vh', paddingTop: '20vh' }}>
                    <div style={styles.contImg}>
                        {(product.images ? product.images : []).map((item, index) => {
                            return (
                                <img style={styles.img} src={item} alt="" key={index} />
                            )
                        })}
                    </div>
                    <div style={styles.contDesc}>
                        <div style={{ color: 'white' }}>
                            <h1>{product.name ? product.name : ''}</h1>
                            <p> <strong style={{ color: 'orange' }}>Deskripsi:</strong> {product.description ? product.description : ''}</p>
                            <p> <strong style={{ color: 'orange' }}>Harga:</strong> IDR. {(product.price ? product.price : '').toLocaleString()}</p>
                            <p> <strong style={{ color: 'orange' }}>Stok Tersedia:</strong> {product.stock ? product.stock : ''}</p>
                            <p> <strong style={{ color: 'orange' }}>Jumlah Pembelian:</strong></p>
                            <div style={{ display: 'flex', justifyContent: "space-around", width: '100%' }}>
                                <Button onClick={this.onMinus} style={{ flexBasis: '5%' }} variant='outline-danger' disabled={qty <= 1 ? true : false}>-</Button>
                                <Form.Control
                                    style={{ marginRight: '10px', marginLeft: '10px', flexBasis: '10%' }}
                                    value={qty}
                                    onClick={this.onInputClick}
                                    onKeyDown={(e) => this.onDelete(e)}
                                    onChange={(e) => this.onInput(e)}
                                />
                                <Button onClick={this.onPlus} variant='outline-success' style={{ flexBasis: '5%' }} disabled={qty >= product.stock ? true : false} >+</Button>
                                <Form.Text className="text-danger" style={{ marginTop: '10px', flexBasis: '80%', marginLeft: '20px' }}>
                                    {qty === '' ? `Jumlah tidak boleh kosong (Min: 1, Max: ${product.stock})` : ''}
                                </Form.Text>
                            </div>
                            {this.props.role === 'user'
                                ?
                                <Button style={{ marginTop: '25px', width: '30%' }} disabled={qty === '' ? true : false} variant='warning' onClick={this.onMasukKeranjang}>
                                    <i className="fa-solid fa-cart-plus" style={{ marginRight: '10px' }} ></i>
                                    Masukkan Keranjang
                                </Button>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    contImg: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flexBasis: '40%',
        padding: '3%',
    },
    contDesc: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flexBasis: '60%',
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

export default connect(mapStateToProps, { addCart })(DetailPage)