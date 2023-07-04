import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import axios from 'axios';
import React, { useState } from "react";
import OutsideWrapperElement from "react-click-outside-element";
import { toast } from 'react-toastify';

const { confirm } = Modal;

export const ItemTaskList = ({ task, onUpdated }) => {
  const [showAction, setShowAction] = useState(false);

  const toggleShowAction = () => {
    setShowAction((prev) => !prev);
  };

  const showOnProgressConfirm = () => {
    confirm({
      title: 'Do you want to move it to on progress?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      centered: true,
      confirmLoading: true,
      okButtonProps: {
        type: 'default'
      },
      onOk() {
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/task/${task.id}/update-status`, {
          task_status: 'progress'
        },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }).then(res => {
            if (onUpdated) {
              onUpdated(task)
            }
            toast.success('Update to On Progress Success')
          }).catch(e => {
            toast.error('Update to On Progress Failed')
            console.log(e)
          })
      }
    });
  };

  const showDeleteConfirm = () => {
    confirm({
      title: 'Do you want to delete task?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      centered: true,
      confirmLoading: true,
      okButtonProps: {
        type: 'default'
      },
      onOk() {
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/task/${task.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then(res => {
          if (onUpdated) {
            onUpdated(task)
          }
          toast.success('Delete Task Successfull')
        }).catch(e => {
          toast.error('Failed delete task')
          console.log(e)
        })
      }
    });
  };

  const showDoneConfirm = () => {
    confirm({
      title: 'Do you want to move it to on progress?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      centered: true,
      confirmLoading: true,
      okButtonProps: {
        type: 'default'
      },
      onOk() {
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/task/${task.id}/update-status`, {
          task_status: 'done'
        },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }).then(res => {
            if (onUpdated) {
              onUpdated(task)
            }
            toast.success('Update to On Progress Success')
          }).catch(e => {
            toast.error('Update to On Progress Failed')
            console.log(e)
          })
      }
    });
  };

  const showCancelledConfirm = () => {
    confirm({
      title: 'Do you want to move it to on progress?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      centered: true,
      confirmLoading: true,
      okButtonProps: {
        type: 'default'
      },
      onOk() {
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/task/${task.id}/update-status`, {
          task_status: 'cancelled'
        },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }).then(res => {
            if (onUpdated) {
              onUpdated(task)
            }
            toast.success('Update to On Progress Success')
          }).catch(e => {
            toast.error('Update to On Progress Failed')
            console.log(e)
          })
      }
    });
  };

  return (
    <>

      <OutsideWrapperElement
        onClickOutside={(e) => {
          toggleShowAction()
        }}
      >
        <div className="w-full relative flex justify-between items-center">
          <div className="flex flex-col gap-y-1">
            <span className="text-sm font-bold">{task.task_name}</span>
            <p className="text-xs font-light"><span className='text-[#BFBFBF]'>Due Date: </span>{task.due_date}</p>
          </div>
          {task.task_status === 'done' ? (
            <div>
              <span className='text-xs font-light'><span className='text-[#BFBFBF]'>Done Date: </span>{task.done_date ? task.done_date : ''}</span>
            </div>
          ) : null}

          {task.task_status === 'cancelled' ? (
            <div>
              <span className='text-xs font-light'><span className='text-[#BFBFBF]'>Cancelled Date: </span>{task.cancelled_date ? task.cancelled_date : ''}</span>
            </div>
          ) : null}

          {task.task_status === 'open' || task.task_status === 'progress' ? (
            <button type="button" onClick={toggleShowAction}>
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M15.125 12C15.125 12.5192 14.971 13.0267 14.6826 13.4584C14.3942 13.8901 13.9842 14.2265 13.5045 14.4252C13.0249 14.6239 12.4971 14.6758 11.9879 14.5746C11.4787 14.4733 11.011 14.2233 10.6438 13.8562C10.2767 13.489 10.0267 13.0213 9.92544 12.5121C9.82415 12.0029 9.87614 11.4751 10.0748 10.9955C10.2735 10.5158 10.61 10.1058 11.0416 9.81739C11.4733 9.52895 11.9808 9.375 12.5 9.375C13.1954 9.37747 13.8617 9.65483 14.3534 10.1466C14.8452 10.6383 15.1225 11.3046 15.125 12ZM5 9.375C4.48083 9.375 3.97331 9.52895 3.54163 9.81739C3.10995 10.1058 2.7735 10.5158 2.57482 10.9955C2.37614 11.4751 2.32415 12.0029 2.42544 12.5121C2.52673 13.0213 2.77673 13.489 3.14385 13.8562C3.51096 14.2233 3.97869 14.4733 4.48789 14.5746C4.99709 14.6758 5.52489 14.6239 6.00455 14.4252C6.4842 14.2265 6.89417 13.8901 7.18261 13.4584C7.47105 13.0267 7.625 12.5192 7.625 12C7.62253 11.3046 7.34518 10.6383 6.85343 10.1466C6.36168 9.65483 5.69543 9.37747 5 9.375ZM20 9.375C19.4808 9.375 18.9733 9.52895 18.5416 9.81739C18.11 10.1058 17.7735 10.5158 17.5748 10.9955C17.3761 11.4751 17.3242 12.0029 17.4254 12.5121C17.5267 13.0213 17.7767 13.489 18.1438 13.8562C18.511 14.2233 18.9787 14.4733 19.4879 14.5746C19.9971 14.6758 20.5249 14.6239 21.0045 14.4252C21.4842 14.2265 21.8942 13.8901 22.1826 13.4584C22.471 13.0267 22.625 12.5192 22.625 12C22.6225 11.3046 22.3452 10.6383 21.8534 10.1466C21.3617 9.65483 20.6954 9.37747 20 9.375Z" fill="#737373" />
                </g>
                <defs>
                  <clipPath id="clip0_163_1338">
                    <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          ) : null}
          {showAction && task.task_status === 'open' ? (
            <div className="absolute -right-52 bg-white border rounded-lg p-3 w-[170px]">
              <div className="flex flex-col gap-y-4">
                <button
                  className="flex items-center hover:bg-primary/20 rounded-xl p-1"
                  onClick={showOnProgressConfirm}
                >
                  <svg height="22" width="22" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 235.319 235.319">
                    <path
                      d="m201.094,29.997c2.649-0.623 4.623-2.996 4.623-5.835v-18.162c0-3.313-2.687-6-6-6h-164.114c-3.313,0-6,2.687-6,6v18.163c0,2.839 1.974,5.212 4.623,5.835 1.812,32.314 18.594,61.928 45.682,80.076l11.324,7.586-11.324,7.586c-27.089,18.147-43.871,47.762-45.682,80.076-2.649,0.623-4.623,2.996-4.623,5.835v18.163c0,3.313 2.687,6 6,6h164.114c3.313,0 6-2.687 6-6v-18.163c0-2.839-1.974-5.212-4.623-5.835-1.812-32.314-18.594-61.928-45.683-80.076l-11.324-7.586 11.324-7.586c27.089-18.148 43.871-47.763 45.683-80.077zm-159.491-17.997h152.114v6.163h-152.114v-6.163zm152.114,211.319h-152.114v-6.163h152.114v6.163zm-63.749-110.644c-1.663,1.114-2.661,2.983-2.661,4.985s0.998,3.871 2.661,4.985l18.765,12.571c23.71,15.883 38.49,41.705 40.333,69.941h-142.812c1.843-28.235 16.623-54.057 40.333-69.941l18.765-12.571c1.663-1.114 2.661-2.983 2.661-4.985s-0.998-3.871-2.661-4.985l-18.765-12.571c-23.71-15.884-38.49-41.706-40.333-69.941h142.812c-1.843,28.236-16.623,54.057-40.333,69.941l-18.765,12.571z"
                      fill="#dea921"
                    />
                  </svg>
                  <span className="px-2">On Progress</span>
                </button>
                <button
                  className="flex items-center hover:bg-primary/20 rounded-xl p-1"
                  onClick={showDeleteConfirm}
                >
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
            </div>) : null}
          {showAction && task.task_status === 'progress' ? (
            <div className="absolute -right-52 bg-white border rounded-lg p-3 w-[170px]">
              <div className="flex flex-col gap-y-4">
                <button
                  className="flex items-center hover:bg-primary/20 rounded-xl p-1"
                  onClick={showDoneConfirm}
                >
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 0C10.4288 0 7.91543 0.762437 5.77759 2.1909C3.63975 3.61935 1.97351 5.64968 0.989572 8.02512C0.0056327 10.4006 -0.251811 13.0144 0.249797 15.5362C0.751405 18.0579 1.98953 20.3743 3.80762 22.1924C5.6257 24.0105 7.94208 25.2486 10.4638 25.7502C12.9856 26.2518 15.5995 25.9944 17.9749 25.0104C20.3503 24.0265 22.3807 22.3603 23.8091 20.2224C25.2376 18.0846 26 15.5712 26 13C25.9964 9.5533 24.6256 6.24882 22.1884 3.81163C19.7512 1.37445 16.4467 0.00363977 13 0ZM18.7075 10.7075L11.7075 17.7075C11.6146 17.8005 11.5043 17.8742 11.3829 17.9246C11.2615 17.9749 11.1314 18.0008 11 18.0008C10.8686 18.0008 10.7385 17.9749 10.6171 17.9246C10.4957 17.8742 10.3854 17.8005 10.2925 17.7075L7.29251 14.7075C7.10486 14.5199 6.99945 14.2654 6.99945 14C6.99945 13.7346 7.10486 13.4801 7.29251 13.2925C7.48015 13.1049 7.73464 12.9994 8.00001 12.9994C8.26537 12.9994 8.51987 13.1049 8.70751 13.2925L11 15.5863L17.2925 9.2925C17.3854 9.19959 17.4957 9.12589 17.6171 9.07561C17.7385 9.02532 17.8686 8.99944 18 8.99944C18.1314 8.99944 18.2615 9.02532 18.3829 9.07561C18.5043 9.12589 18.6146 9.19959 18.7075 9.2925C18.8004 9.38541 18.8741 9.49571 18.9244 9.6171C18.9747 9.7385 19.0006 9.8686 19.0006 10C19.0006 10.1314 18.9747 10.2615 18.9244 10.3829C18.8741 10.5043 18.8004 10.6146 18.7075 10.7075Z" fill="#43D68F" />
                  </svg>
                  <span className="px-2">Done</span>
                </button>
                <button
                  className="flex items-center hover:bg-primary/20 rounded-xl p-1"
                  onClick={showCancelledConfirm}
                >
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 0C10.4288 0 7.91543 0.762437 5.77759 2.1909C3.63975 3.61935 1.97351 5.64968 0.989572 8.02512C0.0056327 10.4006 -0.251811 13.0144 0.249797 15.5362C0.751405 18.0579 1.98953 20.3743 3.80762 22.1924C5.6257 24.0105 7.94208 25.2486 10.4638 25.7502C12.9856 26.2518 15.5995 25.9944 17.9749 25.0104C20.3503 24.0265 22.3807 22.3603 23.8091 20.2224C25.2376 18.0846 26 15.5712 26 13C25.9964 9.5533 24.6256 6.24882 22.1884 3.81163C19.7512 1.37445 16.4467 0.00363977 13 0ZM17.7075 16.2925C17.8004 16.3854 17.8741 16.4957 17.9244 16.6171C17.9747 16.7385 18.0006 16.8686 18.0006 17C18.0006 17.1314 17.9747 17.2615 17.9244 17.3829C17.8741 17.5043 17.8004 17.6146 17.7075 17.7075C17.6146 17.8004 17.5043 17.8741 17.3829 17.9244C17.2615 17.9747 17.1314 18.0006 17 18.0006C16.8686 18.0006 16.7385 17.9747 16.6171 17.9244C16.4957 17.8741 16.3854 17.8004 16.2925 17.7075L13 14.4137L9.70751 17.7075C9.6146 17.8004 9.5043 17.8741 9.3829 17.9244C9.26151 17.9747 9.1314 18.0006 9.00001 18.0006C8.86861 18.0006 8.7385 17.9747 8.61711 17.9244C8.49572 17.8741 8.38542 17.8004 8.29251 17.7075C8.1996 17.6146 8.12589 17.5043 8.07561 17.3829C8.02533 17.2615 7.99945 17.1314 7.99945 17C7.99945 16.8686 8.02533 16.7385 8.07561 16.6171C8.12589 16.4957 8.1996 16.3854 8.29251 16.2925L11.5863 13L8.29251 9.7075C8.10486 9.51986 7.99945 9.26536 7.99945 9C7.99945 8.73464 8.10486 8.48014 8.29251 8.2925C8.48015 8.10486 8.73464 7.99944 9.00001 7.99944C9.26537 7.99944 9.51987 8.10486 9.70751 8.2925L13 11.5863L16.2925 8.2925C16.3854 8.19959 16.4957 8.12589 16.6171 8.07561C16.7385 8.02532 16.8686 7.99944 17 7.99944C17.1314 7.99944 17.2615 8.02532 17.3829 8.07561C17.5043 8.12589 17.6146 8.19959 17.7075 8.2925C17.8004 8.38541 17.8741 8.49571 17.9244 8.6171C17.9747 8.7385 18.0006 8.8686 18.0006 9C18.0006 9.1314 17.9747 9.2615 17.9244 9.3829C17.8741 9.50429 17.8004 9.61459 17.7075 9.7075L14.4138 13L17.7075 16.2925Z" fill="#FF4040" />
                  </svg>
                  <span className="px-2">Cancelled</span>
                </button>
              </div>
            </div>) : null}
        </div>


      </OutsideWrapperElement >
    </>
  )
}

export default React.memo(ItemTaskList)