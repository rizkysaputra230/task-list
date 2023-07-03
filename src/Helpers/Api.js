import axios from 'axios';
import { toast } from 'react-toastify';

export const PostAPIFile = async (props = {}) => {
  const { method, url, payload, headers, message } = props;
  const response = await axios[method || 'post'](url, payload, {
    headers: headers,
  })
    .then((res) => {
      if (res.data && !res.data.status) {
        return {
          errors: res.data,
        };
      }
      return res.data;
    })
    .catch((err) => {
      return {
        ...(err.response ? { ...err.response } : {}),
        errors: (err.response && err.response && err.response) || {},
      };
    });

  if (response && response.status) {
    toast.success(message.success || '');
  } else {
    const errors = response.errors || {};

    if (props.setError) {
      Object.keys(errors).map((key) => {
        const value = Object.values(errors[key][0] || '');
        props.setError(key, {
          type: 'custom',
          message: value,
        });
      });
    }
    console.log({ response });

    toast.error(response.errors || response.message || '');
  }

  return response;
};
