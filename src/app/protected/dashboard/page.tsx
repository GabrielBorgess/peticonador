import { Button } from '@/components/ui/button'
import { DoorOpen, LayoutDashboardIcon, PlusIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const DashboardPage = () => {
  return (
    <>
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Peticionador</h1>
        </div>
        <nav className="mt-6">
          <Link href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
            <LayoutDashboardIcon className="inline-block w-5 h-5 mr-2" />
            Overview
          </Link>
          <Link href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
            <UsersIcon className="inline-block w-5 h-5 mr-2" />
            Users
          </Link>
          <Link href="/auth/signOut" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
            <DoorOpen className="inline-block w-5 h-5 mr-2" />
            Log Out
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Petições:</h2>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <PlusIcon className="w-5 h-5 mr-2" />
              Create
            </Button>
          </div>
        </header>

        {/* Empty space for future content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
              <p className="text-gray-500 text-xl">Empty space for future content</p>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}

export default DashboardPage