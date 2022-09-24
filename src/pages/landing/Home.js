import { Carousel, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Styles } from './common/header';

const contentStyle = {
  height: '600px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Home = () => {
  
  return (
    <>
    <div>
    <Styles>
    <section className="top-bar">
            <Row>
              <Col lg="6" md="5">
                <div className="bar-left">
                  <ul className="list-unstyled list-inline">
                    <li className="list-inline-item">
                      <a href="https://www.google.com/maps/place/Texnomart+%D0%9E%D0%A0%D0%97%D0%A3/@41.3385756,69.2058878,19.08z/data=!4m6!3m5!1s0x38ae8dc82a58fb2d:0x4337c818607b8d45!4b1!8m2!3d41.3386104!4d69.2060158">
                        <i className="las la-map-marker"></i>Shayxontohur tuman
                        G.Uzoqov 2A
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <Link to={process.env.PUBLIC_URL + "/faq"}>
                        Savollaringiz bormi?
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg="6" md="7">
                <div className="bar-right d-flex justify-content-end">
                  <ul className="list-unstyled list-inline bar-social">
                    <li className="list-inline-item">
                      <a href="https://www.facebook.com/qorakol.ilm.ziyo.official">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="https:/t.me/qorakol_ilmziyo">
                        <i className="fab fa-telegram"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="https://www.instagram.com/qorakol_ilm_ziyo">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                  <ul className="list-unstyled list-inline bar-lang">
                    <li className="list-inline-item">
                      {/* <Dropdown>
                        <Dropdown.Toggle as="a">
                          <img
                            src={
                              process.env.PUBLIC_URL + "/assets/images/uzb.png"
                            }
                            alt=""
                          />
                          Uzbek<i className="las la-angle-down"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu as="ul">
                          <Dropdown.Item as="li">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/uzb.png"
                              }
                              alt=""
                            />{" "}
                            Uzbek
                          </Dropdown.Item>
                          <Dropdown.Item as="li">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/rus.png"
                              }
                              alt=""
                            />{" "}
                            Russian
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown> */}
                    </li>
                  </ul>
                  <ul className="list-unstyled list-inline bar-login">
                    <li className="list-inline-item">
                      <Link to={process.env.PUBLIC_URL + "/login"}>
                        <i className="las la-user"></i>Kirish
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to={process.env.PUBLIC_URL + "/registration"}>
                        <i className="las la-user-edit"></i>Ro'yxatdan o'tish
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            </section>
          </Styles>
    </div>
    <div>
    <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
  </div>
    </>
  );
};

export default Home;
