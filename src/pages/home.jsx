import Axios from 'axios';
import React from 'react'
import NavigationBar from '../component/navigationBar';
import {
    Carousel,
    Card,
    Button
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            carousel: [],
            products: [],
            page: 1,
            maxPage: 0,
            prodPerPage: 4
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:2000/slider')
            .then(res => {
                this.setState({ carousel: res.data })
                Axios.get(' http://localhost:2000/products')
                    .then(res => {
                        this.setState({ products: res.data, maxPage: Math.ceil(res.data.length / this.state.prodPerPage) })
                    })
            })
    }

    onNext = () => {
        this.setState({ page: this.state.page + 1 })
    }

    onPrev = () => {
        this.setState({ page: this.state.page - 1 })
    }

    showProducts = () => {
        let beginIndex = (this.state.page - 1) * this.state.prodPerPage
        let currentProd = this.state.products.slice(beginIndex, beginIndex + this.state.prodPerPage)
        console.log(currentProd)
        return (
            currentProd.map((item, index) => {
                return (
                    <Card key={index} style={{ width: '18rem', marginBottom: '20px', padding: '15px', backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '10%' }}>
                        <Card.Img style={{ height: '30vh', objectPosition: 'center', objectFit: 'cover', borderRadius: '10%' }} variant="top" src={item.images[0]} />
                        <Card.Body style={{ paddingBottom: '5px' }}>
                            <Card.Title style={styles.cardTitle}>{item.name}</Card.Title>
                            <Card.Text style={{ color: 'white' }}><strong>IDR. {item.price.toLocaleString()}</strong></Card.Text>
                            <div style={styles.contButton}>
                                <Button variant="warning" style={{ marginBottom: '10px' }}>
                                    <i className="fa-solid fa-check" style={{ marginRight: '10px' }}></i>
                                    Tandai aja dulu
                                </Button>
                                <Button as={Link} to={`/detail?${item.id}`} variant="success">
                                    <i className="fa-solid fa-cart-plus" style={{ marginRight: '10px' }}></i>
                                    Beli
                                </Button>
                            </div>
                        </Card.Body>
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
                    <Carousel fade style={styles.carousel}>
                        {this.state.carousel.map((item, index) => {
                            return (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block"
                                        src={item.image}
                                        alt="First slide"
                                        style={{ height: '70vh', width: '80vw' }}
                                    />
                                    <Carousel.Caption style={styles.caroCaption}>
                                        <h2>{item.title}</h2>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                    <div style={styles.sectProducts}>
                        <h1 style={styles.sectProductsTitle}>Produk Kami</h1>
                        <div style={styles.contProducts}>
                            {this.showProducts()}
                            <div style={{ display: 'flex', width: '30vw', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2vh', marginLeft:'auto', marginRight:'auto'}}>
                                <Button disabled={this.state.page <= 1 ? true : false} variant='warning' onClick={this.onPrev} >Sebelumnya</Button>
                                <strong style={{ marginBottom: '0px', color: 'orange' }}>Halaman {this.state.page} dari {this.state.maxPage}</strong>
                                <Button disabled={this.state.page >= this.state.maxPage ? true : false} variant='warning' onClick={this.onNext} >Selanjutnya</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        // marginTop: '10vh'
        background: 'url(https://images.unsplash.com/photo-1555505019-8c3f1c4aba5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)',
        backgroundSize: 'cover',
        paddingTop: '12vh'
    },
    carousel: {
        width: '80vw',
        height: '70vh',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    caroCaption: {
        marginBottom: '10vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '20px',
        width: '45vw',
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
        marginBottom: '30px',
        // width: '20vw',
        // marginLeft: "auto",
        // marginRight: 'auto',
        // padding: '10px',
        // borderRadius: '20px'
    },
    contProducts: {
        // backgroundColor: 'salmon',
        display: 'flex',
        justifyContent: 'space-between',
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

export default HomePage