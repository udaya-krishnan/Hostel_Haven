import React from 'react'
import Header from '../../../Layout/HostLayout/Header'
import Wallet from '../../../Components/Host/Wallet'

function HostWallet() {
  return (
    <>
      <Header />
      {/* Adding margin-top to give space between header and wallet */}
      <div className="pt-20 px-6"> {/* This gives top padding and left-right padding */}
        <Wallet />
      </div>
    </>
  )
}

export default HostWallet
