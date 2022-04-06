import React, { useState, useEffect } from 'react';
import WebFont from 'webfontloader';
import { connectWallet, getCurrentWalletConnected } from "../utils/interact.js";

import {
  Navbar,
  Container,
  Nav,
} from "react-bootstrap";

import '../styles/navbar.scss';

import background from '../img/bgd.f7687446.png';
import minus from '../img/icons/icon-minus.svg';
import plus from '../img/icons/icon-plus.svg';
import logoimg from '../img/logo192.png';
import discord from '../img/discord.svg';
import twitter from '../img/twitter.svg';
import novalogo from '../img/logo.png';
import scrollimg from '../img/alltubbies.dac0edcd.png';

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const contractABI = require("../nona.json");
const contractAddress = "0x0bf0B05ABc79a19Bb06512eb046450D42e35656d";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const contract = new web3.eth.Contract(contractABI, contractAddress);

const mintNFT = async (amount, price, state) => {
  const { address } = await getCurrentWalletConnected();
  if (address === "") {
    return {
      success: false,
      status: "Please make sure wallet connected!",
    }
  }
  else {
    const _amountOfEther = web3.utils.toWei(web3.utils.toBN(price), 'ether') * web3.utils.toBN(amount) / web3.utils.toBN(1000);
    if (state === true) {
      contract.methods.presaleNona(amount).send({ from: address, gas: 150000 * amount, value: _amountOfEther })
        .on("confirmation", function () {
        })
        .on('error', async function (error, receipt) {
          console.log(error);
        });
    } else {
      contract.methods.publicsaleNona(amount).send({ from: address, gas: 150000 * amount, value: _amountOfEther })
        .on("confirmation", function () {
        })
        .on('error', async function (error, receipt) {
          console.log(error);
        });
    }

    return {
      status: "",
    }
  }
}


const Mintpage = () => {
  const [walletAddress, setWallet] = useState("");
  // const [status, setStatus] = useState(""); 
  const [tokenNumber, setTokenNumber] = useState(1);
  const [supply, setSupply] = useState(0);
  // const [presaleState, setPresaleState] = useState(false);
  const presaleState = true;
  const tokenPrice1 = 123;
  const tokenPrice2 = 123;
  const tokenPrice3 = 123;

  const decreaseTokenNumber = () => {
    if (tokenNumber === 1) {
      return;
    }
    setTokenNumber(tokenNumber - 1);
  }

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
      contract.methods.totalSupply().call().then((_supply) => {
        setSupply(_supply);
      }).catch((err) => console.log(err))
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
                <Navbar.Brand href="/">
                  <img className="logo" src={logoimg} alt='' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                  >
                    <Nav.Link className='navselected navmr' href="/">HOME</Nav.Link>
                    <Nav.Link className='navsunelected navml' href="/#/about">ABOUT</Nav.Link>
                  </Nav>
                  {/* <Form> */}
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
                  {/* </Form> */}
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>

        </div>

        <div className="mint-banner">
          <div className="d-flex justify-content-center pt-3">
            <img className='novalogo' src={novalogo} alt="" />
          </div>
          <h3 className='mt-4 mb-3'>300 NFTS ON THE ETHEREUM BLOCKCHAIN.</h3>
          <div className='d-flex justify-content-center'>
            <a href='https://opensea.io/collection/tubby-cats'>
              <button className='opensea-btn mx-4'>OPENSEA</button>
            </a>
            <a href='https://looksrare.org/collections/0xCa7cA7BcC765F77339bE2d648BA53ce9c8a262bD'>
              <button className='opensea-btn mx-4'>LOOKSHARE</button>
            </a>
          </div>
          <div className="nft-panel">
            <div className="supply">{supply} / 380 Sold Out</div>
            {/* <div className="title">Amount</div> */}
            <div className="nft-counter">
              <img src={minus} alt="" onClick={decreaseTokenNumber} />
              <div className="amount">{tokenNumber}</div>
              {
                presaleState ? [tokenNumber < 3 ? <img src={plus} alt="" onClick={() => setTokenNumber(tokenNumber + 1)} /> :
                  <img src={plus} alt="" onClick={() => setTokenNumber(tokenNumber)} />] :
                  [tokenNumber < 3 ? <img src={plus} alt="" onClick={() => setTokenNumber(tokenNumber + 1)} /> :
                    <img src={plus} alt="" onClick={() => setTokenNumber(tokenNumber)} />
                  ]}
            </div>
          </div>
          {presaleState ? <h4 className="pb-4">Total {tokenPrice1 * tokenNumber / 1000} ETH</h4> : [tokenNumber <= 3 ?
            <h4 className="pb-4">Total {tokenPrice3 * tokenNumber / 1000} ETH</h4> : [tokenNumber <= 3 ?
              <h4 className="pb-4">Total {tokenPrice2 * tokenNumber / 1000} ETH</h4> : <h4 className="pb-4">Total {tokenPrice1 * tokenNumber / 1000} ETH</h4>]]
          }
          {
            presaleState ? <button className="opensea-btn" onClick={() => { mintNFT(tokenNumber, tokenPrice1, presaleState) }}>Mint</button> : [
              tokenNumber <= 3 ? <button className="opensea-btn" onClick={() => { mintNFT(tokenNumber, tokenPrice3, presaleState) }}>Mint</button> : [
                tokenNumber <= 3 ? <button className="opensea-btn" onClick={() => { mintNFT(tokenNumber, tokenPrice2, presaleState) }}>Mint</button> :
                  <button className="opensea-btn" onClick={() => { mintNFT(tokenNumber, tokenPrice1, presaleState) }}>Mint</button>
              ]
            ]
          }
          <div className='scrollbar'>
            <img src={scrollimg} className='tubby-scroll' alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mintpage;