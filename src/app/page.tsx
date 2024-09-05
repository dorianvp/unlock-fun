'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useEnsName } from 'wagmi'

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 20, hours: 10, minutes: 57 })
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address })


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1 }
        } else if (prevTime.hours > 0) {
          return { ...prevTime, hours: prevTime.hours - 1, minutes: 59 }
        } else if (prevTime.days > 0) {
          return { ...prevTime, days: prevTime.days - 1, hours: 23, minutes: 59 }
        } else {
          clearInterval(timer)
          return prevTime
        }
      })
    }, 1000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background text-white p-6">
      <div className="flex justify-end items-center mb-20">
        {
          openConnectModal && (
            <Button variant="outline" className="text-white" onClick={openConnectModal}>
              Connect Wallet
            </Button>

          )
        }
        {openAccountModal && (
          <Button variant="default" onClick={openAccountModal}>
            {address && ensName ? `${ensName} (${address})` : address}

          </Button>
        )}
      </div>
      <div className="flex justify-end items-center max-w-6xl mx-auto">

        <div className="w-2/3 text-right">
          <h1 className="text-9xl font-bold mb-4">
            {String(timeLeft.days).padStart(2, '0')}:
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}
          </h1>
          <div className="flex justify-end text-sm mb-16">
            <span className="mx-4">Days</span>
            <span className="mx-4">Hours</span>
            <span className="mx-4">Minutes</span>
          </div>
          <h2 className="text-2xl mb-16">AIRDROP COUNTDOWN</h2>
        </div>
      </div>
      <div className="w-1/3">
        <h3 className="text-5xl font-bold mb-2">Burn tokens</h3>
        <h3 className="text-5xl mb-8">Unlock Rewards</h3>
        <div className="flex flex-col items-start space-y-4">
          <Input
            type="email"
            placeholder="Enter Email"
            className="bg-blue-800 border-none text-white placeholder-gray-400 w-full"
          />
          <Button className="bg-teal-400 text-blue-900 hover:bg-teal-300 w-full">
            sign me up
          </Button>
        </div>
      </div>
    </div>
  )
}