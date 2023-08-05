'use client'

import { useParams } from 'next/navigation'
import { get } from '@/services/api'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface PredictionResponse {
  album: string
  image: string
  song: string
}
export const Prediction = () => {
  const { id } = useParams()

  const [prediction, setPrediction] = useState<PredictionResponse>({
    album: '',
    image: '',
    song: '',
  })
  const getPrediction = async () => {
    const response = await get<PredictionResponse>(`/prediction/${id}`)
    setPrediction((prevState) => ({
      ...prevState,
      album: response.album,
      image: response.image,
      song: response.song,
    }))
  }

  useEffect(() => {
    getPrediction()
  }, [])

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-md text-center">We think you will like this song</h2>
      {prediction.image && (
        <Image
          src={prediction.image}
          className="rounded"
          alt="Album"
          width={300}
          height={300}
          priority
        />
      )}
      <div className="flex flex-col items-center gap-5">
        <p className="text-indigo-700 text-center text-md">{prediction.song}</p>
        <p className="text-indigo-700 text-center font-bold text-md">
          {prediction.album}
        </p>
      </div>
    </div>
  )
}
