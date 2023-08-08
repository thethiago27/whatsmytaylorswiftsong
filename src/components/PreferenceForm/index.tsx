'use client'

import { ShuffleAngular } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { PreferenceFormQuestion } from '@/components/PreferenceForm/PreferenceFormQuestion'
import { FormEvent, useState } from 'react'
import { post } from '@/services/api'
import { identify, track } from '@/services/mixpanel'

interface Answer {
  data: Array<number>
}

interface PredictionResponse {
  prediction_id: string
}

interface Question {
  label: string
  options: Array<string>
  id: string
}

export const PreferenceForm = () => {
  const router = useRouter()

  const questions: Question[] = [
    {
      label: 'How are you feeling now?',
      options: ['Sad', 'Happy'],
      id: '234',
    },
    {
      label: 'What kind of music do you want to hear right now?',
      options: ['Calm', 'agitated'],
      id: '237',
    },
    {
      label: 'How much do you want to dance?',
      options: ['Little', 'Very'],
      id: '236',
    },
    {
      label: 'Do you want to listen to acoustic music',
      options: ['No', 'Yes'],
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

    track('User answered a question', {
      question: questions[index].label,
      answer: value[0],
    })
  }

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()

    try {
      const response = await post<PredictionResponse, Answer>(
        '/prediction',
        answers,
      )

      track('User submitted the form', {
        prediction_id: response.prediction_id,
      })

      identify(response.prediction_id)

      router.push(`/result/${response.prediction_id}`)
    } catch (e) {
      console.log(e)
      track('Error on submit form', {
        error: e,
      })
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
        Result
      </button>
    </form>
  )
}
