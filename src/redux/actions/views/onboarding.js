import {
  ONBOARDING_SET_STATUS,
  ONBOARDING_SET_MESSAGE,
  ONBOARDING_SET_DATA,
} from '../../reducers/views/onboarding';
import {
  ONBOARDING__FETCH_STATE,
  ONBOARDING__REQUEST_NEW,
} from '../../sagas/views/onboarding';

export const setStatus = status => {
  return {
    type: ONBOARDING_SET_STATUS,
    payload: {
      status,
    },
  };
};

export const setMessage = message => {
  return {
    type: ONBOARDING_SET_MESSAGE,
    payload: {
      message,
    },
  };
};

export const setOnboardingData = ({onboarded = false}) => {
  return {
    type: ONBOARDING_SET_DATA,
    payload: {
      data: {
        onboarded,
      },
    },
  };
};

export const setSocietyData = ({data = [], status, selectedSociety}) => {
  return {
    type: ONBOARDING_SET_DATA,
    payload: {
      data: {
        societies: {
          data,
          status,
          selectedSociety,
        },
      },
    },
  };
};

/** Sagas */

export const fetchUserOnboardingState = () => {
  return {
    type: ONBOARDING__FETCH_STATE,
    payload: {},
  };
};

export const requestOnboarding = societyId => {
  return {
    type: ONBOARDING__REQUEST_NEW,
    payload: {
      societyId,
    },
  };
};

export const cancelAllOnboardingSagas = () => {
  return {
    type: '',
    payload: {},
  };
};
