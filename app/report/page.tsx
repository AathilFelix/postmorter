import Navbar from '@/components/Navbar'
import IncidentBody from '@/components/report/IncidentBody'
import IncidentHeader from '@/components/report/IncidentHeader'
import React from 'react'

const ReportPage = () => {
  return (
    <main>
        <Navbar />
        <div className='min-h-screen max-w-212 mx-auto flex flex-col gap-25 mt-15'>
            <IncidentHeader />
            <IncidentBody />
        </div>
    </main>
  )
}

export default ReportPage