'use client'

import { useEffect, useState } from "react";

export default function User() {
    const [total, setTotal] = useState(0)

    const count = () => {
        setTotal(total+1)
    }

    useEffect(() => {
        count()
    }, [])

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1>{total}</h1>
            <button onClick={count} className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none" >
                Click Button
            </button>
        </div>
    );
}