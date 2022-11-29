import './home.css';

function Home() {
    return (
        <div className="home">
            <div className="home-title">
                Welcome to JJAMS!
            </div>
            <div className="home-section">
                <div className="home-section-title">
                    Personal Details
                </div>
                <div className="idcard-container">
                    <div className="idcard">
                        <div className="idcard-title">
                            ID Card
                        </div>
                        <div className="idcard-content">
                            <div className='idcard-content-left'>
                                <div className="idcard-content-name">
                                    Name: John Doe
                                </div>
                                <div className="idcard-content-rollno">
                                    Roll No: B20AI187
                                </div>
                                <div className="idcard-content-email">
                                    Email: doe.3@iitj.ac.in
                                </div>
                            </div>
                            <div className='idcard-content-right'>
                                <div className="idcard-content-photo">
                                    <img src="https://www.w3schools.com/howto/img_avatar.png" />
                                </div>
                            </div>
                        </div>
                        <div className="idcard-footer">
                            <div className="idcard-footer-text">
                                This is a dummy ID card.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;