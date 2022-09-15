import { Button } from '@nextui-org/react'

const Prev = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
    </svg>
  )
}
const Next = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
    </svg>
  )
}

function ButtonPrevEnable() {
  return (
    <Button icon={<Prev fill="currentColor"/>} rounded auto shadow className='bg-[#0072F5]'>
        Prev
    </Button>
  )
}
function ButtonNextEnable() {
  return (
    <Button iconRight={<Next fill="currentColor"/>} rounded auto shadow className='bg-[#0072F5]'>
        Next
    </Button>
  )
}

function ButtonPrevDisable() {
  return (
    <Button icon={<Prev />} disabled bordered rounded auto>
      Prev
    </Button>
  )
}
function ButtonNextDisable() {
  return (
    <Button iconRight={<Next />} disabled bordered rounded auto>
      Next
    </Button>
  )
}

export {ButtonPrevEnable, ButtonNextEnable, ButtonPrevDisable, ButtonNextDisable}