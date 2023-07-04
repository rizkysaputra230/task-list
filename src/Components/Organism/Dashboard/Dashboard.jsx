import ButtonCard from "@/Components/Atoms/Button/ButtonCard";
import InputDate from "@/Components/Atoms/Input/InputDate";
import CardCollapse from "@/Components/Molecules/Card/CardCollapse";
import Chart from "@/Components/Molecules/Chart/Chart";
import { Layout } from "@/Components/Molecules/Layouts/Layout";
import ItemTaskList from "@/Components/Molecules/Task/ItemTaskList";
import TimeCard from '@/Components/Molecules/TimeCard/TimeCard';
import { PostAPIFile } from "@/Helpers/Api";
import { Clock } from "@/Helpers/Clock";
import Colors from '@/Plugins/Tailwind/Colors';
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
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
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

const cardList = [
  {
    label: 'Open',
    key: 'open',
    textColor: 'text-primary',
    borderColor: 'border-primary',
    hoverColor: 'hover:bg-primary hover:text-white',
  },
  {
    label: 'On Progress',
    key: 'on_progress',
    textColor: 'text-accent1',
    borderColor: 'border-accent1',
    hoverColor: 'hover:bg-accent1 hover:text-white',
    headerClassName: '!bg-accent1 active:bg-accent1/90 hover:bg-accent1/95',
    content: <p></p>,
  },
  {
    label: 'Done',
    key: 'done',
    textColor: 'text-secondary',
    borderColor: 'border-secondary',
    hoverColor: 'hover:bg-secondary hover:text-white',
    headerClassName:
      '!bg-secondary active:bg-secondary/90 hover:bg-secondary/95',
  },
  {
    label: 'Cancelled',
    key: 'cancelled',
    textColor: 'text-accent2',
    borderColor: 'border-accent2',
    hoverColor: 'hover:bg-accent2 hover:text-white',
    headerClassName: '!bg-accent2 !active:bg-accent2/90 !hover:bg-accent2/95',
  },
];


export const Dashboard = () => {
  const { register, setError, setValue, resetField, handleSubmit, formState: { errors }, control } = useForm({
    ...formOptions, defaultValues: {
      task_name: '',
      due_date: ''
    }
  })
  const [selectedCards, setSelectedCards] = useState([])
  const [worshipData, setWorshipData] = useState([])
  const [taskData, setTaskData] = useState([])
  const [isLoading, setIsLoading] = useState(null)
  const [dueDate, setDueDate] = useState(null)
  const [username, setUsername] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [timestamp, setTimestamp] = useState(null)
  const [labels, setLabels] = useState([])
  const [datasets, setDatasets] = useState([])
  const [filterChartType, setFilterChartType] = useState([])

  const clock = Clock()
  const router = useRouter()

  useEffect(() => {
    const username = localStorage.getItem('user')
    setUsername(username)
  }, [username])

  useEffect(() => {
    const photo = localStorage.getItem('photo')
    setPhoto(photo)
  }, [photo])

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
  }, [timestamp])

  useEffect(() => {
    const getChart = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/chart?type=${filterChartType}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then(response => {
          setLabels(response.data.labels)
          setDatasets([
            {
              label: 'Open',
              data: response.data.open,
              backgroundColor: Colors.primary,
            },
            {
              label: 'On Progress',
              data: response.data.on_progress,
              backgroundColor: Colors.accent1,
            },
            {
              label: 'Done',
              data: response.data.done,
              backgroundColor: Colors.secondary,
            },
            {
              label: 'Cancelled',
              data: response.data.cancelled,
              backgroundColor: Colors.accent2,
            },
          ])
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    getChart()
  }, [filterChartType, timestamp])

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
      resetField('task_name')
      resetField('due_date')
      setTimestamp(new Date().getTime())
    }
    if (errors) {
      toast.error('Cant Create Task')
    }

    setIsLoading(false)
  }

  const onDeleted = () => {
    setTimestamp(new Date().getTime())
  }

  return (
    <Layout
      useHeader
      user={username}
      photo={photo}
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
                      { value: 'year', label: 'Year' },
                      { value: 'month', label: 'Month' },
                      { value: 'day', label: 'Day' }
                    ]}
                    onChange={(value) => {
                      setFilterChartType(value)
                    }}
                  />
                </div>
              </div>
              <Chart
                labels={labels}
                datasets={datasets}
              />
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
                        <Controller
                          control={control}
                          name="due_date"
                          render={({ field }) => (
                            <InputDate
                              fieldName={'due_date'}
                              placeholder={'dd/mm/yy'}
                              style={{ width: '100%', borderRadius: '12px', border: '2px solid #D8D8D8', padding: '14px 10px' }}
                              registerUseForm={register}
                              {...field}
                              onChange={(date) => {
                                console.log(date)
                                field.onChange(date)
                                setDueDate(date ? new Date(date).getTime() : null)
                              }}
                            />
                          )}
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
                count={
                  taskData.count ? taskData.count[card.key] : 0
                }
                initial={"open"}
                buttonAction
                headerClassName={card.headerClassName || undefined}
              >
                <div className="grid grid-cols-1 gap-y-3 relative w-full">
                  {taskData.task ? taskData.task[card.key].map((task) => {
                    return (
                      <ItemTaskList
                        task={task}
                        onUpdated={onDeleted}
                      />
                    )
                  }) : []}
                </div>
              </CardCollapse>))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default React.memo(Dashboard)