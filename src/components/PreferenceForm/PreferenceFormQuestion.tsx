'use client'
import * as Slider from '@radix-ui/react-slider'

interface PreferenceFormQuestionProps {
  question: string
  options: string[]
  onChange: (value: number[]) => void
}

export const PreferenceFormQuestion = ({
  question,
  options,
  onChange,
}: PreferenceFormQuestionProps) => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-slate-950 text-md">{question}</p>
      <Slider.Root
        className="relative flex items-center select-none touch-none h-5"
        defaultValue={[0.5]}
        max={1}
        step={0.01}
        onValueChange={(value: number[]) => onChange(value)}
      >
        <Slider.Track className="flex flex-col gap-5 bg-yellow-500 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-yellow-500 rounded-full h-full" />
          <div className="flex py-4 text-slate-700 justify-between">
            <p>{options[0]}</p>
            <p>{options[1]}</p>
          </div>
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-yellow-500 border-2 border-purple-900 shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
          aria-label="Volume"
        />
      </Slider.Root>
    </div>
  )
}
