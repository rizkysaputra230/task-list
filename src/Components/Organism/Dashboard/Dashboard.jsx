import ButtonCard from "@/Components/Atoms/Button/ButtonCard";
import { Layout } from "@/Components/Molecules/Layouts/Layout";
import TimeCard from '@/Components/Molecules/TimeCard/TimeCard';
import { Select } from 'antd';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import OutsideWrapperElement from "react-click-outside-element";
import Colors from '../../../Plugins/Tailwind/Colors';
import InputText from '../../Atoms/Input/InputText';
import CardCollapse from "../../Molecules/Card/CardCollapse";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Open',
      data: labels.map((data, index) => 15 * (index < 1 ? 1 : index)),
      backgroundColor: Colors.primary,
    },
    {
      label: 'On Progress',
      data: labels.map((data, index) => 10 * (index < 1 ? 1 : index)),
      backgroundColor: Colors.accent1,
    },
    {
      label: 'Done',
      data: labels.map((data, index) => 20 * (index < 1 ? 1 : index)),
      backgroundColor: Colors.secondary,
    },
    {
      label: 'Cancelled',
      data: labels.map((data, index) => 20 * (index < 1 ? 1 : index)),
      backgroundColor: Colors.accent2,
    },
  ],
};
export const Dashboard = () => {
  return (
    <Layout
      useHeader
    >
      <div className="flex container mx-auto px-4">
        <div className="grid lg:grid-cols-4 w-full gap-x-4 gap-y-5">
          <div className="lg:col-span-3 border bg-white p-5 rounded-xl">
            <div className="flex flex-col gap-y-5 ">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Total Tasking</h3>
                <div>
                  <Select
                    defaultValue="Year"
                    size="large"
                    style={{ width: 200 }}
                    bordered={false}
                    className="!border-2 !border-slate-300 !rounded-xl !text-base"
                    suffixIcon={
                      <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.807089 0.712987C0.923175 0.432732 1.19665 0.25 1.5 0.25H16.5C16.8033 0.25 17.0768 0.432732 17.1929 0.712987C17.309 0.993243 17.2448 1.31583 17.0303 1.53033L9.53033 9.03033C9.23744 9.32322 8.76256 9.32322 8.46967 9.03033L0.969669 1.53033C0.75517 1.31583 0.691004 0.993243 0.807089 0.712987ZM3.31066 1.75L9 7.43934L14.6893 1.75H3.31066Z" fill="#2E5DD6" />
                      </svg>
                    }
                    options={[
                      { value: 'Year', label: 'Year' },
                      { value: 'Month', label: 'Month' },
                      { value: 'Day', label: 'Day' }
                    ]}
                  />
                </div>
              </div>
              <Bar options={options} data={data} />
            </div>
          </div>
          <div className="lg:col-span-1 border bg-white h-fit rounded-xl max-lg:order-first">
            <TimeCard />
          </div>
          <div className="lg:col-span-3 border bg-white p-5 rounded-xl">
            <div className="flex flex-col gap-y-4">
              <InputText
                fieldName={'task'}
                label={'Tasking'}
                placeholder={'Input your tasking'}
                type={'text'}
              />
              <div>
                <label
                  htmlFor="due-date"
                  className="block text-medium font-normal leading-6 text-label"
                >
                  Due Date
                  <div className='flex justify-between mt-1 gap-x-3'>
                    <input
                      id="due-date"
                      name="due-date"
                      className="md:w-1/2 lg:w-4/5 rounded-xl px-4 py-3 shadow-sm bg-transparent border-2 ring-0 outline-none focus:ring-0 border-[#D8D8D8] focus:border-primary placeholder:!text-[#90909090]"
                      type="date"
                      placeholder="dd/mm/yy"
                    />
                    <button
                      className="md:w-1/2 lg:w-1/4 border-2 rounded-xl px-4 py-3 bg-primary text-white text-center"
                      type="button"
                    >
                      Add Tasking
                    </button>
                  </div>
                </label>
              </div>
              <div className="flex flex-row gap-x-5">
                <ButtonCard
                  textColor={'text-primary'}
                  borderColor={'border-primary'}
                  label={'Open'}
                />
                <ButtonCard
                  textColor={'text-accent1'}
                  borderColor={'border-accent1'}
                  label={'On Progress'}
                />
                <ButtonCard
                  textColor={'text-secondary'}
                  borderColor={'border-secondary'}
                  label={'Done'}
                />
                <ButtonCard
                  textColor={'text-accent2'}
                  borderColor={'border-accent2'}
                  label={'Cancelled'}
                />
              </div>
              <CardCollapse
                title={"Open"}
                initial={"open"}
                buttonAction
                renderAction={
                  <span>edit</span>
                }
              >
                <div className="flex flex-col gap-y-1">
                  <span className="text-sm font-bold">Membuat Aplikasi Mobile</span>
                  <p className="text-xs font-light">Due Date: Tuesday 12 Maret 2023</p>
                </div>
              </CardCollapse>
              <CardCollapse
                title={"On Progress"}
                initial={"progress"}
                headerClassName="!bg-accent1 active:bg-accent1/90 hover:bg-accent1/95"
              >
                <OutsideWrapperElement
                  onClickOutside={(e) => {
                    console.log('test')
                  }}
                >
                </OutsideWrapperElement>
              </CardCollapse>
              <CardCollapse
                title={"Done"}
                initial={"done"}
                headerClassName="!bg-secondary active:bg-secondary/90 hover:bg-secondary/95"
              >
                <div className="relative">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-y-1">
                      <span className="text-sm font-bold">Membuat Aplikasi Mobile</span>
                      <p className="text-xs font-light">Due Date: Tuesday 12 Maret 2023</p>
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <span className="text-sm font-bold">Membuat Aplikasi Mobile</span>
                      <p className="text-xs font-light">Due Date: Tuesday 12 Maret 2023</p>
                    </div>
                  </div>
                </div>
              </CardCollapse>
              <CardCollapse
                title={"Cancelled"}
                initial={"cancelled"}
                headerClassName="!bg-accent2 !active:bg-accent2/90 !hover:bg-accent2/95"
              >
                <div className="relative">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-y-1">
                      <span className="text-sm font-bold">Membuat Aplikasi Mobile</span>
                      <p className="text-xs font-light">Due Date: Tuesday 12 Maret 2023</p>
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <span className="text-sm font-bold">Membuat Aplikasi Mobile</span>
                      <p className="text-xs font-light">Due Date: Tuesday 12 Maret 2023</p>
                    </div>
                  </div>
                </div>
              </CardCollapse>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default React.memo(Dashboard)