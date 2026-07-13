import React from 'react';
import { useHistory } from 'react-router-dom';
import '../views/about-us.css';

function Footer(){
  const history = useHistory();

  return (
     <div className="contacts-thq-footer-elm">
          <div className="contacts-thq-group2-elm">
            <span className="contacts-thq-text-elm40">Navigācija</span>
            <span className="contacts-thq-text-elm41">Par mums</span>
            <span className="contacts-thq-text-elm42">Par mums</span>
            <span className="contacts-thq-text-elm43">Par mums</span>
          </div>
          <div className="contacts-thq-group1-elm">
            <span className="contacts-thq-text-elm44">Navigācija</span>
            <span className="contacts-thq-text-elm45">Par mums</span>
            <span className="contacts-thq-text-elm46">Par mums</span>
            <span className="contacts-thq-text-elm47">Par mums</span>
          </div>
          <div className="contacts-thq-group3-elm2">
            <span className="contacts-thq-text-elm48">Kontakti</span>
            <span className="contacts-thq-text-elm49">Par mums</span>
            <span className="contacts-thq-text-elm50">Par mums</span>
            <span className="contacts-thq-text-elm51">Par mums</span>
            <img
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              alt="Mappin1166"
              className="contacts-thq-mappin-elm2"
            />
            <img
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              alt="Mail1166"
              className="contacts-thq-mail-elm2"
            />
            <img
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              alt="Phone1166"
              className="contacts-thq-phone-elm2"
            />
          </div>
          <span className="contacts-thq-text-elm52">
            Latvijas Ugunsdrošības asociācija — profesionāls atbalsts, izglītība
            un pārstāvniecība kopš 1994. gada.
          </span>
          <img
            src="https://play.teleporthq.io/static/svg/default-img.svg"
            alt="LUAlogofullwhite111167"
            className="contacts-thq-lu-alogofullwhite11-elm"
          />
          <span className="contacts-thq-text-elm53">
            © 2026 Latvijas Ugunsdrošības asociācija. Visas tiesības
            aizsargātas.
          </span>
          <img
            src="https://play.teleporthq.io/static/svg/default-img.svg"
            alt="Line31167"
            className="contacts-thq-line3-elm"
          />
    </div>
  );
}
export default Footer;