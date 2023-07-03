import React from 'react';
import TimeCardHeader from "./TimeCardHeader";

export const TimeCard = (props = {}) => {
  const {
    time,
    data
  } = props
  return (
    <>
      <TimeCardHeader
        time={time}
        dateTime={data.tanggal}
      />
      <div className="flex flex-col rounded-b-xl">
        <table>
          <tbody>
            <tr>
              <td
                className="flex justify-between px-3 py-2 odd:bg-primary/20 even:bg-accent1/30 text-base font-medium last:rounded-b-xl">
                <span>Subuh</span>
                <span>{data.subuh}</span>
              </td>
              <td
                className="flex justify-between px-3 py-2 odd:bg-primary/20 even:bg-accent1/30 text-base font-medium last:rounded-b-xl">
                <span>Dzuhur</span>
                <span>{data.dzuhur}</span>
              </td>
              <td
                className="flex justify-between px-3 py-2 odd:bg-primary/20 even:bg-accent1/30 text-base font-medium last:rounded-b-xl">
                <span>Ashar</span>
                <span>{data.ashar}</span>
              </td>
              <td
                className="flex justify-between px-3 py-2 odd:bg-primary/20 even:bg-accent1/30 text-base font-medium last:rounded-b-xl">
                <span>Maghrib</span>
                <span>{data.maghrib}</span>
              </td>
              <td
                className="flex justify-between px-3 py-2 odd:bg-primary/20 even:bg-accent1/30 text-base font-medium last:rounded-b-xl">
                <span>Isya</span>
                <span>{data.isya}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default React.memo(TimeCard)