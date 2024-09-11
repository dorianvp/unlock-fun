'use client'
import { Button } from "@/components/ui/button"
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useEnsName } from 'wagmi'
import Link from 'next/link'
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from '@/lib/utils'
import { CustomForm } from '@/components/ui/CustomForm/custom-form'

export default function Home() {
  // const [timeLeft, setTimeLeft] = useState({ days: 20, hours: 10, minutes: 57 })
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address })


  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft(prevTime => {
  //       if (prevTime.minutes > 0) {
  //         return { ...prevTime, minutes: prevTime.minutes - 1 }
  //       } else if (prevTime.hours > 0) {
  //         return { ...prevTime, hours: prevTime.hours - 1, minutes: 59 }
  //       } else if (prevTime.days > 0) {
  //         return { ...prevTime, days: prevTime.days - 1, hours: 23, minutes: 59 }
  //       } else {
  //         clearInterval(timer)
  //         return prevTime
  //       }
  //     })
  //   }, 1000) // Update every minute

  //   return () => clearInterval(timer)
  // }, [])

  function formatAddress(addr: `0x${string}`) {
    if (addr.length < 10) return addr
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <div className="min-h-screen text-white bg-background">
      <nav className="flex z-20 gap-3 justify-end items-center p-6 mb-20 border-b shadow-md border-foreground/20 bg-background">

        <Button variant={'link'} asChild className='font-sans text-white lg:text-lg'>
          <Link href="#">
            Docs
          </Link>
        </Button>
        {
          openConnectModal && (
            <Button
              variant="default"
              className="font-sans lg:text-lg transition-transform duration-100 hover:scale-105"
              onClick={openConnectModal}
            >
              Connect Wallet
            </Button>
          )
        }
        {openAccountModal && (
          <Button variant="outline" onClick={openAccountModal}>
            {address && ensName ? ensName : formatAddress(address as `0x${string}`)}

          </Button>
        )}
      </nav>
      <div className="flex justify-end items-center p-10 mx-auto lg:px-60">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.2}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0  h-[100%] skew-y-0 z-0",
          )}
        />
        <div className="md:text-right">
          <h1 className="flex justify-start items-start mb-4 w-full text-6xl font-light md:text-9xl md:min-w-52">
            Coming Soon
            {/* {String(timeLeft.days).padStart(2, '0')}:
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')} */}
          </h1>
          {/* <div className="flex justify-end mb-8 text-sm">
            <span className="mx-4">Days</span>
            <span className="mx-4">Hours</span>
            <span className="mx-4">Minutes</span>
          </div> */}
          <h2 className="mb-6 text-2xl">AIRDROP COUNTDOWN</h2>
        </div>
      </div>
      <div className="p-10 lg:px-60">
        <h3 className="mb-2 font-sans text-5xl font-bold">Burn tokens</h3>
        <h3 className="mb-8 font-sans text-5xl">Unlock Rewards</h3>
        <CustomForm />
      </div>
    </div>
  )
}