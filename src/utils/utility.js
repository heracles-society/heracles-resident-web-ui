export const validatePhoneNumber = phone => {
  const phoneRegex = /^[6-9]\d{9}$/;
  if (phone.match(phoneRegex)) {
    return true;
  } else {
    return false;
  }
};

const setMinute = min => {
  if (min < 10) {
    min = '0' + min;
  }
  return min;
};

const setHour = hour => {
  if (hour === 24) {
    return '00';
  }
  if (hour > 12 && hour < 24) {
    const hr = hour - 12;
    if (hr < 10) {
      return `0${hr}`;
    }
    return hr;
  }
  return hour;
};

export const getCurrentTimeStamp = () => {
  const today = new Date();
  let hour = today.getHours();
  const med = hour > 12 && hour < 24 ? 'P.M' : 'A.M';
  hour = setHour(hour);
  let min = today.getMinutes();
  min = setMinute(min);
  return `${hour}:${min} ${med}`;
};

// export default {
//   getCurrentTimeStamp,
//   validatePhoneNumber,
// };
