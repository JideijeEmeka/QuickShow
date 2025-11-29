import React from 'react'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import { dummyBookingData } from '../assets/assets'
import { useState, useEffect } from 'react'
import timeFormat from '../lib/timeFormat'
import dateFormat from '../lib/dateFormat'

const MyBookings = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [bookings, setBookings] = useState([])
  const currency = import.meta.env.VITE_CURRENCY

  const getBookings = async () => {
    setBookings(dummyBookingData)
    setIsLoading(false)
  }

  useEffect(() => {
    getBookings()
  }, [])

  return !isLoading ? (
    <div className='relative px-6 md:px-16 lg:px-30 py-30 md:pt-40 min-h-[80vh]'>
      <BlurCircle top='100px' left='100px'/>
      <div>
        <BlurCircle bottom='0px' left='600px'/>
      </div>
      <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>

        {bookings.map((item, index) => (
            <div key={index} className='flex flex-col md:flex-row justify-between
                bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'>
                  <div className='flex flex-col md:flex-row'>
                    <img src={item.show.movie.poster_path} alt='' 
                      className='md:max-w-45 h-auto aspect-video object-bottom object-cover rounded'/>
                  <div className='flex flex-col p-4'>
                    <p className='text-lg font-semibold'>{item.show.movie.title}</p>
                    <p className='text-sm text-gray-400'>{timeFormat(item.show.movie.runtime)}</p>
                    <p className='text-sm text-gray-400 mt-auto'>{dateFormat(item.show.showDateTime)}</p>
                  </div>
                  </div>

                  <div className='flex flex-col md:items-end md:text-right p-4 justify-between'>
                    <div className='flex items-center gap-4'>
                      <p className='text-2xl font-semibold mb-3'>{currency}{item.amount}</p>
                      {!item.isPaid && (
                        <button className='px-4 bg-primary py-1.5 mb-3 text-sm 
                         rounded-full font-medium cursor-pointer'>
                          Pay Now
                        </button>
                      )}
                    </div>
                    <div className='text-sm'>
                      <p><span className='text-gray-400'>Total Tickets:</span> {item.bookedSeats.length}</p>
                      <p><span className='text-gray-400'>Seat Number:</span> {item.bookedSeats.join(', ')}</p>
                    </div>
                  </div>
            </div>
        ))}
    </div>
  ) : (
    <Loading />
  )
}

export default MyBookings