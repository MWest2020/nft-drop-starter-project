import React, { useEffect, useState} from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected  = async () => {

    try {
      const { solana } = window;
      
      if(solana) {
        if(solana.isPhantom){
          console.log('Phantom wallet is found');

          const response  = await solana.connect({ onlyIfTrusted: true});
          console.log(
            'connected with Public Key:', 
            response.publicKey.toString()
          );
        }
      } else {
        alert('Solana object not found! Get a phantom wallet at phantom.app. ');
      }
    } 
    catch(error){
      console.log(error)
    }
  };
  
  const connectWallet =  async () => {};

  //ok, buildspace calls a function that return JSX html, instead of making  component. RESEARCH this
  const renderNotConnectedContainer = () => 
    (
      <button
        className="cta-button connect-wallet-button"
        onclick={connectWallet}
      >
        Connect to Wallet
      </button>
    )
  
  // Components mount, checks if wallet is connected
  useEffect(() => {
    const onLoad = async () =>{
      await checkIfWalletIsConnected();
    };
   
    window.addEventListener('load', onLoad);
    return () => { window.removeEventListener('load', onLoad)}
  }, []);




  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
