import React, { useState, useEffect } from 'react';
import WebFont from 'webfontloader';
import { connectWallet, getCurrentWalletConnected } from "../utils/interact.js";

import {
  Navbar,
  Container,
  Nav,
  Row,
  Col,
} from "react-bootstrap";

import '../styles/navbar.scss';

import background from '../img/bgd.f7687446.png';
import logoimg from '../img/logo192.png';
import discord from '../img/discord.svg';
import twitter from '../img/twitter.svg';
import turbigif from '../img/bgd.f7687446.png';

const Mintpage = () => {
  const [walletAddress, setWallet] = useState("");

  const handleConnect = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
        }
      });
    } else {

    }
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Days One']
      }
    });
    async function fetchData() {
      const { address } = await getCurrentWalletConnected();
      setWallet(address);
      addWalletListener();
    }
    fetchData();
  }, []);

  return (
    <div id='/' className="homepage position-relative" style={{ height: '100vh' }}>
      <img className="bg-image" src={background} alt="" />
      <div className="content">
        <div className="mask">
          <div className="home-navbar container">
            <Navbar expand="lg" className='w-100'>
              <Container fluid>
                <Navbar.Brand href="/home">
                  <img className="logo" src={logoimg} alt='' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                  >
                    <Nav.Link className='navsunelected navmr' href="/">HOME</Nav.Link>
                    <Nav.Link className='navselected navml' href="/about">ABOUT</Nav.Link>
                  </Nav>
                  <button className='btn' onClick={handleConnect}>
                    {walletAddress.length > 0 ? (
                      "" +
                      String(walletAddress).substring(0, 6) +
                      "..." +
                      String(walletAddress).substring(38)
                    ) : (
                      <span>CONNECT</span>
                    )
                    }
                  </button>
                  <a href='https://discord.com/invite/tubbycatsnft'>
                    <img className='link-icon mx-2' src={discord} alt='icon' />
                  </a>
                  <a href='https://twitter.com/tubbycatsnft'>
                    <img className='link-icon mx-2' src={twitter} alt='icon' />
                  </a>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>
        <div className='container text-black'>
          <h1 className='text-center font-80'>ABOUT THE <br/>NONA</h1>
          <Row>
            <Col lg={6} sm={12}>
              <h2 className='font-42'>The Collection</h2>
              <p className='font-22'>tubby cats is a collection of 20000 algorithmically</p>
              <p className='font-22'>generated and hand-created nfts on etherium.</p>
              <p className='font-22'>art: <a className='text-black' href='https://twitter.com/tubbyCollective'>@tubbyCollective</a></p>
              <p className='font-22'>code: <a className='text-black' href='https://twitter.com/trolldart'>@trolldart</a></p>
              <p className='font-22'>smart contract: <a className='text-black' href='https://twitter.com/0xngmi'>@0xngmi</a></p>
            </Col>
            <Col lg={6} sm={12}>
              <img className='w-100' src={turbigif} alt=''/>
            </Col>
          </Row>
          <h2 className='font-42'>creating tubby cats</h2>
          <p className='font-22'>rather than generating the collection completely randomly, each tubby cat is created from one of 120 various themed palettes.</p>
          <p className='font-22'>tubby cats are not generated with individual trait rarity in mind. rarity is based on the themed gen palettes.</p>
          <p className='font-22'>the collection also contains 69 one-of-ones, which are created by different artists on our team. each one-of-one has an attribute that displays the artist of each.</p>

          <h1 className='text-center font-80'>THE TEAM</h1>
          <Row className='img-link'>
            <Col lg={4} md={12}>
              <a className='atxt text-center' href='https://twitter.com/ratwell0x'>
                <div className='pinkbox'>
                  <div className='whitebox'>
                    <img className='innerimg' src={discord} alt='img' />
                    <div className='underbox text-white'>
                      <p>ARTIST & PROJECT LEAD</p>
                      <h3 className='card-title'>@40M</h3>
                      <p>HELLO BASED DEPARTMENT. CALLING TO MODIFY YOU THAT WE ARE IMPRESSED WITH YOUR WORK</p>
                    </div>
                  </div>
                </div>
              </a>
            </Col>
            <Col lg={4} md={12}>
              <a className='atxt text-center' href='https://twitter.com/trolldart'>
                <div className='pinkbox'>
                  <div className='whitebox'>
                    <img className='innerimg' src={discord} alt='img' />
                    <div className='underbox text-white'>
                      <p>DEV</p>
                      <h3 className='card-title'>@AXELSEGA</h3>
                      <p>(RECENTLY DECREASED) LEAD WILLY WORKER AND HEAD OF INHUMAN RESOURCES</p>
                    </div>
                  </div>
                </div>
              </a>
            </Col>
            <Col lg={4} md={12}>
              <a className='atxt text-center' href='https://twitter.com/sugoiNFT'>
                <div className='pinkbox'>
                  <div className='whitebox'>
                    <img className='innerimg' src={discord} alt='img' />
                    <div className='underbox text-white'>
                      <p>ARTIST</p>
                      <h3 className='card-title'>@KOPLOSEUS</h3>
                      <p>MEOWMEOWMEOWMEOWMEOW</p>
                    </div>
                  </div>
                </div>
              </a>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Mintpage;