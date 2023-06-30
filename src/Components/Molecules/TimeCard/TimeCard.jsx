import React from 'react';
import TimeCardHeader from "./TimeCardHeader";

export const TimeCard = () => {
  const schedules =
    [
      {
        jadwal: 'Subuh',
        time: '04.30'
      },
      {
        jadwal: 'Dzuhur',
        time: '12.10'
      },
      {
        jadwal: 'Ashar',
        time: '15.30'
      },
      {
        jadwal: 'Maghrib',
        time: '18.10'
      },
      {
        jadwal: 'Isya',
        time: '19.15'
      }
    ]
  return (
    <>
      <TimeCardHeader />
      <div className="flex flex-col rounded-b-xl">
        <table>
          <tbody>
            <tr>
              {schedules.map((row, index) => (
                <td
                  key={index}
                  className="flex justify-between px-3 py-2 odd:bg-primary/20 even:bg-accent1/30 text-base font-medium last:rounded-b-xl">
                  <span>{row.jadwal}</span>
                  <span>{row.time}</span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default React.memo(TimeCard)