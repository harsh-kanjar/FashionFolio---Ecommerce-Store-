import React from 'react'
import { Categories, ProductsSection, DisplayBanner, FlashSale, BestSeller } from '../components'
function Home() {
    return (
        <>
            <div className='px-10 pt-10 bg-gray-100'>
                <DisplayBanner />
                <FlashSale/>
                <Categories />
                <BestSeller/>
                <ProductsSection />
                <DisplayBanner />
            </div>
        </>
    )
}

export default Home
