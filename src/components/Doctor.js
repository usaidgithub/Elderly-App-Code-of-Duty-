import React from 'react'

export default function Doctor() {
  return (
    <>
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
                        <i className="fas fa-user-circle text-2xl"></i>
                        <h1 className="text-xl font-bold">CareMate</h1>
                        <i className="fas fa-bell text-2xl"></i>
                    </header>
                    <div className="flex justify-around bg-gray-200 p-2">
                        <button className="w-1/2 text-center py-2 bg-white text-black font-medium border-r-2 border-gray-300">Doctor</button>
                        <button className="w-1/2 text-center py-2 text-gray-500">Caretaker</button>
                    </div>
                    <div className="p-4">
                        <div className="relative mb-4">
                            <input type="text" placeholder="Search here" className="w-full p-2 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
                            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                        </div>
                        {[1, 2, 3, 4].map((item, index) => (
                            <div key={index} className="bg-white p-4 mb-4 rounded-lg shadow">
                                <div className="flex items-center mb-4">
                                    <img src="https://placehold.co/50x50" alt="Doctor's profile" className="w-12 h-12 rounded-full mr-4" />
                                    <div>
                                        <h2 className="text-lg font-bold">Dr. Ravishankar Reddy</h2>
                                        <p className="text-gray-600">General Physician</p>
                                        <p className="text-gray-600">31 yrs of exp. overall</p>
                                        <p className="text-green-600 flex items-center"><i className="fas fa-book mr-1"></i> 200 patient stories</p>
                                    </div>
                                </div>
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded mr-2">
                                        <span className="font-bold">87%</span>
                                        <span className="ml-1">Patient Recommendation</span>
                                    </div>
                                    <div className="flex items-center bg-blue-600 text-white px-2 py-1 rounded">
                                        <span className="font-bold">4.4</span>
                                        <span className="ml-1">Hospital Excellence Rating</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4">NEXT AVAILABLE AT</p>
                                <div className="flex justify-between">
                                    <button className="w-1/2 bg-white text-blue-600 border border-blue-600 py-2 rounded mr-2">Contact Hospital</button>
                                    <button className="w-1/2 bg-blue-600 text-white py-2 rounded">Book Clinic visit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <footer className="bg-blue-600 text-white p-4 flex justify-around">
                        <i className="fas fa-home text-2xl"></i>
                        <i className="fas fa-pills text-2xl"></i>
                        <i className="fas fa-map-marker-alt text-2xl"></i>
                        <i className="fas fa-users text-2xl"></i>
                    </footer>
                </div>
    </>
  )
}
