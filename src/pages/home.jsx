import Axios from 'axios';
import React from 'react'
import NavigationBar from '../component/navigationBar';
import {
    Carousel,
    Card,
    Button
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from '../component/footer';

const url = 'https://jajan-database.herokuapp.com'
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
        Axios.get(`${url}/slider`)
            .then(res => {
                this.setState({ carousel: res.data })
                Axios.get(`${url}/products`)
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
                                <Button as={Link} to={`/detail?${item.id}`} variant="warning">
                                    <i className="fa-solid fa-magnifying-glass" style={{ marginRight: '10px' }}></i>
                                    Lihat Deskripsi
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
                                        style={{ height: '40vw', width: '80vw', objectFit: 'cover', overflow: 'hidden' }}
                                    />
                                    <Carousel.Caption style={styles.caroCaption}>
                                        <h2>{item.title}</h2>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                    <div style={styles.sectProducts}>
                        <h1 id='produk' style={styles.sectProductsTitle}>Produk Kami</h1>
                        <div style={styles.contProducts}>
                            {this.showProducts()}
                        </div>
                        <div style={{ display: 'flex', gap:'5vh', width: '90vw', justifyContent: 'center', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                            <Button disabled={this.state.page <= 1 ? true : false} variant='warning' onClick={this.onPrev} >Sebelumnya</Button>
                            <strong style={{ marginBottom: '0px', color: 'orange' }}>Halaman {this.state.page} dari {this.state.maxPage}</strong>
                            <Button disabled={this.state.page >= this.state.maxPage ? true : false} variant='warning' onClick={this.onNext} >Selanjutnya</Button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const styles = {
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

export default HomePage