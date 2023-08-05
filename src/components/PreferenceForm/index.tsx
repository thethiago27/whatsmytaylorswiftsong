'use client'

import { ShuffleAngular } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { PreferenceFormQuestion } from '@/components/PreferenceForm/PreferenceFormQuestion'
import { FormEvent, useState } from 'react'
import { post } from '@/services/api'

interface Answer {
  data: Array<number>
}

interface PredictionResponse {
  prediction_id: string
}

export const PreferenceForm = () => {
  const router = useRouter()

  const questions = [
    {
      label: 'Como está se sentindo agora?',
      options: ['Triste', 'Feliz'],
      id: '234',
    },
    {
      label: 'Qual tipo de musica você você quer ouvir agora?',
      options: ['Calmas', 'Agitadas'],
      id: '237',
    },
    {
      label: 'O quanto você quer dançar?',
      options: ['Pouco', 'Muito'],
      id: '236',
    },
    {
      label: 'Você quer ouvir musicas acusticas?',
      options: ['Não', 'Sim'],
      id: '235',
    },
  ]

  const [answers, setAnswers] = useState<Answer>({
    data: [0.5, 0.5, 0.5, 0.5],
  })

  const handleAnswer = (value: number[], index: number) => {
    const newAnswers = [...answers.data]
    newAnswers[index] = value[0]
    setAnswers({ data: newAnswers })
  }

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()

    try {
      const response = await post<PredictionResponse, Answer>(
        '/prediction',
        answers,
      )

      router.push(`/result/${response.prediction_id}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form className="flex flex-col gap-20" onSubmit={handleSubmit}>
      {questions.map((question, index) => (
        <PreferenceFormQuestion
          key={question.id}
          question={question.label}
          options={question.options}
          onChange={(value) => handleAnswer(value, index)}
        />
      ))}
      <button className="bg-indigo-950 flex align-center gap-4 justify-center items-center font-bold text-zinc-100 rounded py-2 px-4">
        <ShuffleAngular size={24} weight="bold" />
        Resultado
      </button>
    </form>
  )
}
