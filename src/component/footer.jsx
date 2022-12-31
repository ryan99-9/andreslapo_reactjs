import React from 'react'

class Footer extends React.Component {
    render() {
        return (
            <div id='footer' style={styles.cont}>
                {/* <div>
                    <i className="fa-brands fa-square-whatsapp fa-2xl"></i> <nsbp/>
                    0812-3456-78910
                </div>
                <div>
                    <i className="fa-brands fa-square-instagram fa-2xl"></i> <nsbp/>
                    JajankuOfficial
                </div>
                <div>
                    <i className="fa-brands fa-square-facebook fa-2xl"></i> <nsbp/>
                    JajankuOfficial
                </div> */}
            </div>
        )
    }
}

const styles = {
    cont: {
        backgroundColor: 'orange',
        display: 'flex',
        justifyContent: 'space-around',
        fontWeight: 'bold',
        padding: '5vh',
        flexWrap: 'wrap',
    }
}

export default Footer