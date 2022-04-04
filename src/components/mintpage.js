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
const contractABI = require("../kangaroo.json");
const contractAddress = "0xC4dDc55DDA525Abb97B7A09667Ed11577A374824";
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
    const _amountOfEther = web3.utils.toWei(web3.utils.toBN(price), 'ether') * web3.utils.toBN(amount) / web3.utils.toBN(100);
    if (state === true) {
      contract.methods.presaleKangaroo(amount).send({ from: address, gas: 150000 * amount, value: _amountOfEther })
        .on("confirmation", function () {
        })
        .on('error', async function (error, receipt) {
          console.log(error);
        });
    } else {
      contract.methods.publicsaleKangaroo(amount).send({ from: address, gas: 150000 * amount, value: _amountOfEther })
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
  const presaleState = false;
  const tokenPrice1 = 3;
  const tokenPrice2 = 4;
  const tokenPrice3 = 5;

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

  // let year = new Date().getFullYear();
  // const difference = +new Date(`5 January ${year} 09:00:00 UTC`) - +new Date(); 

  // let initialDays = 0;
  // let initialHours = 0; 
  // let initialMinutes = 0;
  // let initialSeconds = 0;

  // if (difference > 0) {
  //   initialDays = Math.floor(difference / (1000 * 60 * 60 * 24));              
  //   initialHours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  //   initialMinutes = Math.floor((difference / 1000 / 60) % 60);
  //   initialSeconds = Math.floor((difference / 1000) % 60);      
  // } 

  // const [ day, setDays ] = useState(initialDays);
  // const [ hour, setHours ] = useState(initialHours);
  // const [ minute, setMinutes ] = useState(initialMinutes);
  // const [ second, setSeconds ] =  useState(initialSeconds); 

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

  // useEffect(() => {    
  //   let myInterval = setInterval(() => {
  //     if (second > 0) {
  //       setSeconds(second - 1);
  //     }

  //     if (second === 0) {
  //       if (minute === 0) {
  //         if(hour === 0) {
  //           if(day === 0) {    
  //             setPresaleState(false);              
  //             clearInterval(myInterval);              
  //           } else {
  //             setDays(day - 1);
  //             setHours(23);
  //             setMinutes(59);
  //             setSeconds(59);
  //           }            
  //         } else {
  //           setHours(hour - 1);
  //           setMinutes(59);
  //           setSeconds(59);
  //         }
  //       } else {
  //         setMinutes(minute - 1);
  //         setSeconds(59);
  //       }
  //     } 
  //   }, 1000)

  //   return ()=> {
  //     clearInterval(myInterval);
  //   };
  // });

  return (
    <div id='/home' className="homepage position-relative" style={{ height: '100vh' }}>
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
                    <Nav.Link className='navselected navmr' href="/home">HOME</Nav.Link>
                    <Nav.Link className='navsunelected navml' href="/about">ABOUT</Nav.Link>
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
          {presaleState ? <h4 className="pb-4">Total {tokenPrice1 * tokenNumber / 100} ETH</h4> : [tokenNumber <= 5 ?
            <h4 className="pb-4">Total {tokenPrice3 * tokenNumber / 100} ETH</h4> : [tokenNumber <= 10 ?
              <h4 className="pb-4">Total {tokenPrice2 * tokenNumber / 100} ETH</h4> : <h4 className="pb-4">Total {tokenPrice1 * tokenNumber / 100} ETH</h4>]]
          }
          {
            presaleState ? <button className="opensea-btn" onClick={() => { mintNFT(tokenNumber, tokenPrice1, presaleState) }}>Mint</button> : [
              tokenNumber <= 5 ? <button className="opensea-btn" onClick={() => { mintNFT(tokenNumber, tokenPrice3, presaleState) }}>Mint</button> : [
                tokenNumber <= 10 ? <button className="opensea-btn" onClick={() => { mintNFT(tokenNumber, tokenPrice2, presaleState) }}>Mint</button> :
                  <button className="opensea-btn" onClick={() => { mintNFT(tokenNumber, tokenPrice1, presaleState) }}>Mint</button>
              ]
            ]
          }
          <div className='scrollbar'>
            <img src={scrollimg}  className='tubby-scroll' alt=''/>
            </div>
          
          {/* <button className="btn-mint" disabled onClick={() => {mintNFT(tokenNumber, tokenPrice1)}}>Mint</button>            */}
        </div>
      </div>
    </div>
  );
};

export default Mintpage;