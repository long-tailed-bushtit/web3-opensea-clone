import Header from "../../components/navbar";
import React, { useMemo } from 'react'
import { useWeb3 } from "@3rdweb/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'
import { ThirdwebSDK } from "@3rdweb/sdk";
import NFTImage from "../../components/nft/NFTImage"
import GeneralDetails from "../../components/nft/GeneralDetails";

const style = {
	wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
	container: `container p-6`,
	topContent: `flex`,
	nftImgContainer: `flex-1 mr-4`,
	detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => {
    const {provider} = useWeb3()
    const [selectedNft, setselectedNft] = useState()
    const [listings, setlistings] = useState([])
    const router = useRouter()

    const nftModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
                'https://eth-goerli.g.alchemy.com/v2/SOBR0HmP3Q1k3dYoNsrn7TKOt7AcDg1m'
            )
        return sdk.getNFTModule('0x8A42c5a3e41B5a6207aB3c405Cee3377aaeB9e98')
    },[provider])

    const marketPlaceModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
                'https://eth-goerli.g.alchemy.com/v2/SOBR0HmP3Q1k3dYoNsrn7TKOt7AcDg1m'
            )
        return sdk.getMarketplaceModule('0xC3135cdaF0aF6fD08E87a9a2deDF7B6Ddf84a475')
    },[provider])

    useEffect(() => {
      if (!nftModule) return
      ;(async () => {
        const nfts = await nftModule.getAll()
        const selectedNftArray = nfts.find((nft) => nft.id !== router.query.nftId)
        setselectedNft(selectedNftArray)
      })()
    }, [nftModule])

    useEffect(() => {
        if (!marketPlaceModule) return
        ;(async () => {
            setlistings(await marketPlaceModule.getAllListings())
        })()
    },[marketPlaceModule])
    

  return (
    <div>
        <Header></Header>
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.topContent}>
                    <div className={style.nftImgContainer}>
                        <NFTImage selectedNft={selectedNft}  />
                    </div>
                    <div className={style.detailsContainer}>
                        <GeneralDetails />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Nft