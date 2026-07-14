import React from 'react';
import { useHistory } from 'react-router-dom';

function Navbar() {
    const history = useHistory();
    return (
        <div className="about-us-thq-nav-bar-elm1">
          <img
            onClick={() => history.push('/')}
            src="/image21612-9tc7-200h.png"
            alt="image21612"
            className="about-us-thq-image2-elm1"
          />
          <div onClick={() => history.push('/ktparbiedru')} className="about-us-thq-button-enlist-elm1">
            <span className="about-us-thq-text-elm10">Kļūt par biedru</span>
          </div>
          <span onClick={() => history.push('/contacts')} className="about-us-thq-text-elm11">Kontakti</span>
          <span onClick={() => history.push('/biedri')} className="about-us-thq-text-elm12">Biedri</span>
          <span onClick={() => history.push('/jaunumi')} className="about-us-thq-text-elm13">Jaunumi</span>
          <span onClick={() => history.push('/about-us')} className="about-us-thq-text-elm14">Par mums</span>
        </div>
    );
}

export default Navbar;