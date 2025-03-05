'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Data dummy untuk statistik
const statsData = [
  { title: 'Total User', value: 1200 },
  { title: 'Total Room', value: 50 },
  { title: 'Total Booking', value: 350 },
  { title: 'Total Transaction' },
];

// Data dummy untuk chart
const bookingByRoomData = [
  { name: 'Room A', bookings: 40 },
  { name: 'Room B', bookings: 30 },
  { name: 'Room C', bookings: 20 },
  { name: 'Room D', bookings: 10 },
];

const bookingByMonthData = [
  { name: 'Jan', bookings: 10 },
  { name: 'Feb', bookings: 20 },
  { name: 'Mar', bookings: 30 },
  { name: 'Apr', bookings: 40 },
  { name: 'May', bookings: 50 },
  { name: 'Jun', bookings: 60 },
];

const bookingByYearData = [
  { name: '2021', bookings: 100 },
  { name: '2022', bookings: 200 },
  { name: '2023', bookings: 300 },
];

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      {/* Grid untuk statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">{stat.title}</h2>
            <p className="text-2xl font-bold text-gray-900">{stat?.value ?? '-'}</p>
          </div>
        ))}
      </div>

      {/* Grid untuk chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart: Booking by Room */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Booking by Room</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingByRoomData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart: Booking by Month */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Booking by Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingByMonthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart: Booking by Year */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Booking by Year</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingByYearData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}