import ButtonCard from "@/Components/Atoms/Button/ButtonCard";
import InputDate from "@/Components/Atoms/Input/InputDate";
import CardCollapse from "@/Components/Molecules/Card/CardCollapse";
import { Layout } from "@/Components/Molecules/Layouts/Layout";
import TimeCard from '@/Components/Molecules/TimeCard/TimeCard';
import { PostAPIFile } from "@/Helpers/Api";
import { Clock } from "@/Helpers/Clock";
import { formOptions } from "@/Utils/Validation";
import { Select } from 'antd';
import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Colors from '../../../Plugins/Tailwind/Colors';
import InputText from '../../Atoms/Input/InputText';

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

const cardList = [
  {
    label: 'Open',
    textColor: 'text-primary',
    borderColor: 'border-primary',
    hoverColor: 'hover:bg-primary hover:text-white',
    content: (
      <div className="flex flex-col gap-y-1">
        <span className="text-sm font-bold"></span>
        <p className="text-xs font-light">Due Date: Tuesday 12 Maret 2023</p>
      </div>
    ),
    renderAction: (
      <div className="flex flex-col gap-y-4">
        <button className="flex items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.3103 6.87845L17.1216 2.68876C16.9823 2.54943 16.8169 2.43892 16.6349 2.36351C16.4529 2.28811 16.2578 2.2493 16.0608 2.2493C15.8638 2.2493 15.6687 2.28811 15.4867 2.36351C15.3047 2.43892 15.1393 2.54943 15 2.68876L3.43969 14.25C3.2998 14.3888 3.18889 14.554 3.11341 14.736C3.03792 14.9181 2.99938 15.1133 3.00001 15.3103V19.5C3.00001 19.8978 3.15804 20.2794 3.43935 20.5607C3.72065 20.842 4.10218 21 4.50001 21H8.6897C8.88675 21.0006 9.08197 20.9621 9.26399 20.8866C9.44602 20.8111 9.61122 20.7002 9.75001 20.5603L21.3103 9.00001C21.4496 8.86072 21.5602 8.69534 21.6356 8.51333C21.711 8.33132 21.7498 8.13624 21.7498 7.93923C21.7498 7.74222 21.711 7.54713 21.6356 7.36512C21.5602 7.18311 21.4496 7.01774 21.3103 6.87845ZM18 10.1888L13.8103 6.00001L16.0603 3.75001L20.25 7.93876L18 10.1888Z"
              fill="#2E5DD6"
            />
          </svg>
          <span className="px-2">Edit</span>
        </button>
        <button className="flex items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.25 4.5H16.5V3.75C16.5 3.15326 16.2629 2.58097 15.841 2.15901C15.419 1.73705 14.8467 1.5 14.25 1.5H9.75C9.15326 1.5 8.58097 1.73705 8.15901 2.15901C7.73705 2.58097 7.5 3.15326 7.5 3.75V4.5H3.75C3.55109 4.5 3.36032 4.57902 3.21967 4.71967C3.07902 4.86032 3 5.05109 3 5.25C3 5.44891 3.07902 5.63968 3.21967 5.78033C3.36032 5.92098 3.55109 6 3.75 6H4.5V19.5C4.5 19.8978 4.65804 20.2794 4.93934 20.5607C5.22064 20.842 5.60218 21 6 21H18C18.3978 21 18.7794 20.842 19.0607 20.5607C19.342 20.2794 19.5 19.8978 19.5 19.5V6H20.25C20.4489 6 20.6397 5.92098 20.7803 5.78033C20.921 5.63968 21 5.44891 21 5.25C21 5.05109 20.921 4.86032 20.7803 4.71967C20.6397 4.57902 20.4489 4.5 20.25 4.5ZM10.5 15.75C10.5 15.9489 10.421 16.1397 10.2803 16.2803C10.1397 16.421 9.94891 16.5 9.75 16.5C9.55109 16.5 9.36032 16.421 9.21967 16.2803C9.07902 16.1397 9 15.9489 9 15.75V9.75C9 9.55109 9.07902 9.36032 9.21967 9.21967C9.36032 9.07902 9.55109 9 9.75 9C9.94891 9 10.1397 9.07902 10.2803 9.21967C10.421 9.36032 10.5 9.55109 10.5 9.75V15.75ZM15 15.75C15 15.9489 14.921 16.1397 14.7803 16.2803C14.6397 16.421 14.4489 16.5 14.25 16.5C14.0511 16.5 13.8603 16.421 13.7197 16.2803C13.579 16.1397 13.5 15.9489 13.5 15.75V9.75C13.5 9.55109 13.579 9.36032 13.7197 9.21967C13.8603 9.07902 14.0511 9 14.25 9C14.4489 9 14.6397 9.07902 14.7803 9.21967C14.921 9.36032 15 9.55109 15 9.75V15.75ZM15 4.5H9V3.75C9 3.55109 9.07902 3.36032 9.21967 3.21967C9.36032 3.07902 9.55109 3 9.75 3H14.25C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75V4.5Z"
              fill="#FF4040"
            />
          </svg>
          <span className="px-2">Delete</span>
        </button>
      </div>
    ),
  },
  {
    label: 'On Progress',
    textColor: 'text-accent1',
    borderColor: 'border-accent1',
    hoverColor: 'hover:bg-accent1 hover:text-white',
    headerClassName: '!bg-accent1 active:bg-accent1/90 hover:bg-accent1/95',
    content: <p></p>,
  },
  {
    label: 'Done',
    textColor: 'text-secondary',
    borderColor: 'border-secondary',
    hoverColor: 'hover:bg-secondary hover:text-white',
    headerClassName:
      '!bg-secondary active:bg-secondary/90 hover:bg-secondary/95',
    content: <p></p>,
  },
  {
    label: 'Cancelled',
    textColor: 'text-accent2',
    borderColor: 'border-accent2',
    hoverColor: 'hover:bg-accent2 hover:text-white',
    headerClassName: '!bg-accent2 !active:bg-accent2/90 !hover:bg-accent2/95',
    content: <p></p>,
  },
];


export const Dashboard = () => {
  const { register, setError, setValue, handleSubmit, formState: { errors } } = useForm({
    ...formOptions, defaultValues: {
      task_name: ''
    }
  })
  const [selectedCards, setSelectedCards] = useState([])
  const [worshipData, setWorshipData] = useState([])
  const [taskData, setTaskData] = useState([])
  const [isLoading, setIsLoading] = useState(null)
  const [dueDate, setDueDate] = useState(null)
  const [username, setUsername] = useState(null)

  const clock = Clock()
  const router = useRouter()

  useEffect(() => {
    const username = localStorage.getItem('user')
    setUsername(username)
  }, [username])

  useEffect(() => {
    const getWorship = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/worship`)
        .then((response) => {
          setWorshipData(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    getWorship()
  }, [])

  useEffect(() => {
    const getTask = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/task`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then(response => {
          setTaskData(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    getTask()
  }, [])

  const toggleFilterCard = useCallback((card) => {
    const findIndex = selectedCards.findIndex(value => value === card)

    if (findIndex < 0) {
      const newSelectedCards = [
        ...selectedCards,
        card
      ]
      setSelectedCards(newSelectedCards)
    } else {
      const newSelectedCards = selectedCards.filter(value => value !== card)
      setSelectedCards(newSelectedCards)
    }
  }, [selectedCards])

  const cards = useMemo(() => {
    if (selectedCards.length > 0) {
      return cardList.filter(card => selectedCards.includes(card.label))
    }
    return cardList
  }, [selectedCards])

  const onSubmit = async (data) => {
    setIsLoading(true)

    let payload = new FormData()
    payload.append('task_name', data.task_name)
    payload.append('due_date', dueDate)

    const response = await PostAPIFile({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/task`,
      payload: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      message: {
        success: 'Task Created',
      },
      setError: setError,
    })

    const { errors } = response
    if (!errors) {
      router.replace('/dashboard')
    }
    if (errors) {
      toast.error('Cant Create Task')
    }

    setIsLoading(false)
  }

  return (
    <Layout
      useHeader
      user={username}
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
            <TimeCard
              time={clock}
              data={worshipData}
            />
          </div>
          <div className="lg:col-span-3 border bg-white p-5 rounded-xl">
            <div className="flex flex-col gap-y-4">
              <form
                className="flex flex-col gap-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <InputText
                  fieldName={'task_name'}
                  label={'Tasking'}
                  placeholder={'Input your tasking'}
                  type={'text'}
                  registerUseForm={register}
                />
                <div>
                  <label
                    htmlFor="due-date"
                    className="block text-medium font-normal leading-6 text-label"
                  >
                    Due Date
                    <div className='flex justify-between mt-1 gap-x-3'>
                      <div className="w-full max-lg:w-2/3">
                        <InputDate
                          fieldName={'due_date'}
                          placeholder={'dd/mm/yy'}
                          style={{ width: '100%', borderRadius: '12px', border: '2px solid #D8D8D8', padding: '16px 12px' }}
                          registerUseForm={register}
                          onChange={(date) => {
                            setDueDate(date ? new Date(date).getTime() : null)
                          }}
                        />
                      </div>
                      <button
                        className="md:w-1/2 lg:w-1/4 border-2 rounded-xl px-4 py-3 bg-primary text-white text-center"
                        type="submit"
                      >
                        {isLoading ? 'Loading...' : 'Add Tasking'}
                      </button>
                    </div>
                  </label>
                </div>
              </form>
              <div className="flex flex-row gap-x-5">
                {cardList.map((card, index) => (<ButtonCard key={index}
                  {...card}
                  onClick={() => {
                    toggleFilterCard(card.label)
                  }}
                />))}
              </div>
              {cards.map((card, index) => (<CardCollapse key={index}
                title={card.label}
                initial={"open"}
                buttonAction
                headerClassName={card.headerClassName || undefined}
                renderAction={card.renderAction || undefined}
              >
                {card.content}
              </CardCollapse>))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default React.memo(Dashboard)