import { createContext, useContext, useState } from 'react'

const PointsContext = createContext({ points: 1240, earnPoints: () => {} })

export function PointsProvider({ children }) {
  const [points, setPoints] = useState(1240)
  const earnPoints = (amount) => setPoints((prev) => prev + amount)
  return (
    <PointsContext.Provider value={{ points, earnPoints }}>
      {children}
    </PointsContext.Provider>
  )
}

export function usePoints() {
  return useContext(PointsContext)
}
