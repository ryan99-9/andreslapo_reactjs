import Axios from 'axios';
import React from 'react'
import NavigationBar from '../component/navigationBar';
import {
    Carousel,
    Card,
    Button,
    Form
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from '../component/footer';
import { connect } from 'react-redux'
import axios from 'axios'
import { delProduk, addCart } from '../redux/actions'
import Swal from 'sweetalert2'

// const url = 'https://jajan-database.herokuapp.com'
// const url = 'http://localhost:2000'
// const url = 'https://lizard-tux.cyclic.app'
const url = 'https://andres-lapo.onrender.com'
// const urlz = 'http://andreslapo.com/img'

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            carousel: [],
            products: [],
            page: 1,
            maxPage: 0,
            prodPerPage: 4,
            product: {},
            // qty: 0,
            toLogin: false,
            indexEdit: null,
            goods:''
        }
    }

    componentDidMount() {
        this.fecthData()
    }
    fecthData = () => {
        Axios.get(`${url}/products`)
            .then(res => {
                let data = res.data
                this.setState({ products: data, maxPage: Math.ceil(res.data.length / this.state.prodPerPage) })
                console.log(res.data)
                // console.log(res.data[].qty)
            }).catch(err => console.log(err))
        Axios.get(`${url}/slider`)
            .then(res => {
                this.setState({ carousel: res.data })
            })

    }

    onNext = () => {
        this.setState({ page: this.state.page + 1 })
    }

    onPrev = () => {
        this.setState({ page: this.state.page - 1 })
    }

    onPlus = (index, qty2) => {
        // this.setState({ qty: this.state.qty + 1 })
        let temp = qty2 + 1
        Axios.patch(`${url}/products/${index}`, { qty: temp })
            .then(res => {
                console.log(res.data)
                this.fecthData()
            })


        console.log(index)
    }

    onMinus = (index, qty2) => {
        let temp = qty2 - 1
        Axios.patch(`${url}/products/${index}`, { qty: temp })
            .then(res => {
                console.log(res.data)
                this.fecthData()
            })

        // this.setState({ qty: this.state.qty - 1 })
        console.log(index)
    }

    onInputClick = (index) => {
        this.setState({ qty: '' })
    }

    onDelete1 = (e) => {
        if (e.keyCode === 8) {
            this.setState({ qty: '' })
        }
    }

    onInput = (e) => {
        this.setState({ qty: 0 })
        let value = +e.target.value
        if (value < 1) {
            this.setState({ qty: 0 })
        } else if (value > this.state.product.stock) {
            this.setState({ qty: this.state.product.stock })
        } else if (value >= 1 || value <= this.state.product.stock) {
            this.setState({ qty: value })
        }
    }


    onMasukKeranjang = (index) => {
        const { products, qty } = this.state
        console.log(products)
        if (!this.props.username) {
            return this.setState({ toLogin: true })
        }

        //siapkan data yg mau dipush kedalam cart


        function filterOn(z) {
            return z.id === index
        }

        let fil = products.filter(filterOn)
        console.log(fil)

        this.props.addCart(this.props.id, fil[0], index)
        // this.fecthData()
        let temp = 0
        Axios.patch(`${url}/products/${index}`, { qty: temp })
            .then(res => {
                console.log(res.data)
                this.fecthData()
            })
        Swal.fire('berhasil memasukan produk ke cart')
        // this.setState({ qty: '' })
    }

    showProducts = () => {
        const { product, qty, goods,products} = this.state
        let show = ''
        if(goods=='snack'){
            function filterA(z) {
                return z.description.toLowerCase() === "snack"
            }
            show = products.filter(filterA)
        } else if (goods=='minuman'){
            function filterB(z) {
                return z.description.toLowerCase() === "minuman"
            }
            show = products.filter(filterB)
        } else if (goods =='semua'){
            show = products
        }
        else {
            function filterOn(z) {
                return z.description.toLowerCase() === "makanan"
            }
            show = products.filter(filterOn)
        }
        console.log(show)
        return (
            show.map((item, index) => {
                return (
                    <>
                        {this.props.role === 'user' ?
                            <Card key={index} style={{ width: '18rem', marginBottom: '20px', padding: '15px', backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '10%' }}>
                                <Card.Img style={{ height: '30vh', objectPosition: 'center', objectFit: 'cover', borderRadius: '10%' }} variant="top" src={item.images[0]} />
                                <Card.Body style={{ paddingBottom: '5px' }}>
                                    <Card.Title style={styles.cardTitle}>{item.name}</Card.Title>
                                    <Card.Text style={{ color: 'white' }}><strong>IDR. {item.price.toLocaleString()}</strong></Card.Text>
                                    <div style={styles.contDesc}>
                                        <div style={{ color: 'white' }}>

                                            <p> <strong style={{ color: 'orange' }}>Jumlah Pembelian:</strong></p>
                                            <div style={{ display: 'flex', justifyContent: "space-around", width: '100%' }}>
                                                <Button onClick={() => this.onMinus(item.id, item.qty)} style={{ flexBasis: '5%' }} variant='outline-danger' disabled={qty <= 1 ? true : false}>-</Button>
                                                <Form.Control
                                                    style={{ marginRight: '10px', marginLeft: '10px', flexBasis: '20%' }}
                                                    value={item.qty}
                                                    defaultValue={item.qty}
                                                    onClick={() => this.onInputClick(item.id)}
                                                    onKeyDown={(e) => this.onDelete1(e)}
                                                    onChange={(e) => this.onInput(e)}
                                                />
                                                <Button onClick={() => this.onPlus(item.id, item.qty)} variant='outline-success' style={{ flexBasis: '5%' }} disabled={qty >= product.stock ? true : false} >+</Button>
                                                <Form.Text className="text-danger" style={{ marginTop: '10px', flexBasis: '80%', marginLeft: '20px' }}>
                                                    {/* {qty === '' ? `Jumlah tidak boleh kosong (Min: 1, Max: ${product.stock})` : ''} */}
                                                </Form.Text>
                                            </div>
                                            {/* <Button style={{ marginTop: '25px', width: 'fit-content' }} disabled={qty === '' ? true : false} variant='warning' onClick={() => this.onMasukKeranjang(item.id)}>
                                        <i className="fa-solid fa-cart-plus" style={{ marginRight: '10px' }} ></i>
                                        Masukkan Keranjang
                                    </Button> */}
                                            {this.props.role === 'user'
                                                ?
                                                <Button style={{ marginTop: '25px', width: 'fit-content' }} disabled={qty === '' ? true : false} variant='warning' onClick={() => this.onMasukKeranjang(item.id)}>
                                                    <i className="fa-solid fa-cart-plus" style={{ marginRight: '10px' }} ></i>
                                                    Masukkan Keranjang
                                                </Button>
                                                :
                                                null
                                            }
                                        </div>

                                    </div>

                                </Card.Body>
                            </Card>
                            :
                            <Card key={index} style={{ width: '18rem', marginBottom: '20px', padding: '15px', backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '10%' }}>
                                <Card.Img style={{ height: '30vh', objectPosition: 'center', objectFit: 'cover', borderRadius: '10%' }} variant="top" src={item.images[0]} />
                                <Card.Body style={{ paddingBottom: '5px' }}>
                                    <Card.Title style={styles.cardTitle}>{item.name}</Card.Title>
                                    <Card.Text style={{ color: 'white' }}><strong>IDR. {item.price.toLocaleString()}</strong></Card.Text>
                                    <div style={styles.contDesc}>
                                        <div style={{ color: 'white' }}>

                                        </div>

                                    </div>

                                </Card.Body>
                            </Card>

                        }
                    </>
                )
            })
        )
    }

  
    onDelete = (index) => {
        // let idproduct = this.props.location.pathname.slice(13)
        console.log(index)
        // this.props.delProduk(index)
        axios.delete(`${url}/products/${index}`)
            .then(res => {
                console.log(res.data)
                Swal.fire(`berhasil hapus produk ke ${index}`)
                this.fecthData()

                // this.fetchData()eror
            })
            .catch(err => {
                console.log(err + 'ini  delete');
            })
    }
    showProductsAdmin = () => {
        let beginIndex = (this.state.page - 1) * this.state.prodPerPage
        let currentProd = this.state.products.slice(beginIndex, beginIndex + this.state.prodPerPage)
        console.log(currentProd)
        return (
            this.state.products.map((item, index) => {
                console.log(index)
                return (
                    <Card key={index} style={{ width: '18rem', marginBottom: '20px', padding: '15px', backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '10%' }}>
                        <Card.Img style={{ height: '30vh', objectPosition: 'center', objectFit: 'cover', borderRadius: '10%' }} variant="top" src={item.images[0]} />
                        <Card.Body style={{ paddingBottom: '5px' }}>
                            <Card.Title style={styles.cardTitle}>{item.name}</Card.Title>
                            <Card.Text style={{ color: 'white' }}><strong>IDR. {item.price.toLocaleString()}</strong></Card.Text>
                            <div style={styles.contButton}>
                                <Button as={Link} to={`/detail?${item.id}`} variant="warning">
                                    <i className="fa-solid fa-magnifying-glass" style={{ marginRight: '1rem' }}></i>
                                    Lihat Deskripsi
                                </Button>
                                <br></br>
                                <Button as={Link} to={`/editproduk?${item.id}`} variant="success">
                                    <i className="fa-solid fa-magnifying-glass" style={{ marginRight: '1rem' }}></i>
                                    Edit Produk
                                </Button>
                            </div>
                        </Card.Body>
                        <Button variant='danger' onClick={() => this.onDelete(item.id)} style={{ width: '10rem', marginLeft: '3rem' }} >Hapus</Button>
                    </Card>
                )
            })
        )
    }
 

    render() {

        return (
            <div>
                <NavigationBar />
                <div style={styles.container}>
                    {this.props.role === 'admin' ?
                        //admin home
                        <div style={styles.sectProducts}>
                            <h1 id='produk' style={styles.sectProductsTitle}>Produk Kami by Admin</h1>
                            <Button as={Link} to='/addproduct' variant='success' style={{ margin: '2rem' }}>Tambah Produk</Button>
                            <div style={styles.contProducts}>
                                {this.showProductsAdmin()}

                            </div>
                        </div>
                        :
                        <div style={styles.sectProducts}>
                            <h1 id='produk' style={styles.sectProductsTitle}>Produk Kami</h1>
                            <div style={{ display: 'flex',width:'50%',marginBottom:'5%' }}>
                                <Button onClick={()=>this.setState({goods:'semua'})} variant='warning' style={{ margin: '5%' }}>All</Button>
                                <Button onClick={()=>this.setState({goods:'makanan'})} variant='warning' style={{ margin: '5%' }}>Food</Button>
                                <Button onClick={()=>this.setState({goods:'minuman'})} variant='warning' style={{ margin: '5%' }}>Beverage</Button>
                                <Button onClick={()=>this.setState({goods:'snack'})} variant='warning' style={{ margin: '5%' }}>Snack</Button>
                            </div>
                            <div style={styles.contProducts}>
                                {this.showProducts()}
                            </div>

                        </div>


                    }

                </div>
                <Footer />
            </div>
        )
    }
}

const styles = {
    // contDesc: {
    //     backgroundColor: 'rgba(0, 0, 0, 0.7)',
    //     width: '100vh',
    //     padding: '3%'
    // },
    container: {
        background: 'url(https://images.unsplash.com/photo-1555505019-8c3f1c4aba5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)',
        backgroundSize: 'cover',
        paddingTop: '12vh',
        paddingBottom: '5vh'
    },
    carousel: {
        width: '80vw',
        // height: '500px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    caroCaption: {
        // marginBottom: '10vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '20px',
        // width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: '5px',
        paddingBottom: '5px'
    },
    sectProducts: {
        marginTop: '10px',
        marginLeft: "5vw",
        marginRight: '5vw',
    },
    sectProductsTitle: {
        textAlign: 'center',
        color: 'orange',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        marginTop: '40px',
        marginBottom: '30px'
    },
    contProducts: {
        display: 'flex',
        justifyContent: 'center',
        gap: '3vh',
        flexWrap: 'wrap'
    },
    cardTitle: {
        // overflow: 'hidden',
        // textOverflow: 'ellipsis',
        // whiteSpaces: 'nowrap'
        color: 'orange'
    },
    contButton: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        cart: state.userReducer.cart,
        products: state.userReducer.products,
        // id:state.userReducer.
        role: state.userReducer.role,
        id: state.userReducer.id,

    }
}


export default connect(mapStateToProps, { delProduk, addCart })(HomePage)
